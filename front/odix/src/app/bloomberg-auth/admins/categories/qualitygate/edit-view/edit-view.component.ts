import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {DOCUMENT} from "@angular/common";
import { TranslateService } from '@ngx-translate/core';
import 'leader-line';
import Swal from 'sweetalert2';
import 'anim-event'
import { EditViewService } from './edit-view.service';
import { AlertHelper } from '../alerts-helper';
declare let LeaderLine: any;
declare let AnimEvent: any;

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditViewComponent implements OnInit, OnDestroy {

  moduleJSON: any;
  saveModuleMessage: any = "";
  selectedAdmin = '';
  plantName:string = "";
  typeReport: string = "";
  idView: string = "";
  selectedInspectionType: any;
  selectedLine: any;
  isAddInspectionPointsButtonDisabled: boolean = true;
  inBounds = true;
  allInspectionPointList: any = [];
  inspectionTypes: any = [];
  lines: any = [];
  ButtonsXPoints: any = [];
  Points: any = [];
  Lines: any = [];
  Buttons: any = [];
  pointID: any = 0;
  buttonXPointID: any = 0;
  buttonsToRemoveFromCanvas: any = [];
  isAssignCoordinateButtonDisabled: boolean = true;
  isLineDuplicated : boolean = false;
  isRemoveInspectionPointsButtonDisabled: boolean = true;
  chosenButton: any = undefined;
  isAssignCoordinateEnabled: boolean = false;
  habilitarButton = false;
  tempButtonCoordinates: any = { x: -20, y: -20 };
  searchText: any = "";
  successAlert = false;
  errorAlert = false;
  @Output() typeReportEvent = new EventEmitter<string>();
  @Output() idViewEvent = new EventEmitter<string>();

  constructor(private translateService: TranslateService, private route: ActivatedRoute, private router: Router, @Inject(DOCUMENT) private document:any, private editViewService: EditViewService,private alertHelper: AlertHelper) {
    this.selectedAdmin = this.route.snapshot.paramMap.get('typeadmin');  
    this.plantName = this.route.snapshot.paramMap.get('plantName'); 
    this.typeReport = this.route.snapshot.paramMap.get('typereport'); 
    this.idView = this.route.snapshot.paramMap.get('idView');
  }

  ngOnInit() {
    this.getModuleById();
  }

  ngOnDestroy(){
    this.resetPageValues();
  }

  getInspectionPoints(){
    this.editViewService.getEnabledInspectionPoints()
      .subscribe(data => {
        this.processInspectionPointsJson(data);
      });
  }

  getModuleById(){
    this.editViewService.getModuleByID(this.idView).
    subscribe(data => {
      this.moduleJSON = data;
      this.getInspectionPoints();
    });
  }

  processInspectionPointsJson(json: any){
    //console.log('module json')
    //console.log(this.moduleJSON)
    json.inspectionPoints.forEach((element:any) => {
      let point = 
        {
          ID: element.id,
          Number: element.number,
          Description: element.description,
          BackgroundColor: element.backgroundColor,
          ForeColor: element.foreColor,
          LineID: element.lineID,
          LineText: element.lineText,
          InspectionTypeID: element.inspectionTypeID,
          InspectionTypeText: element.inspectionTypeText,
          CoordinateX: 0,
          CoordinateY: 0,
          Disabled: false,
          Checked: false,
          Active: false 
        };
        this.allInspectionPointList.push(point);
    });

    for (let i = 0; i < this.allInspectionPointList.length; i++) {
      let ref = this.moduleJSON.buttons.find((y:any) => y.inspectionPointID == this.allInspectionPointList[i].ID);
  
      if(ref != undefined){
        this.allInspectionPointList[i].Checked = true;
        this.allInspectionPointList[i].Disabled = true;
      }    
    }
  
    for (let i = 0; i < this.allInspectionPointList.length; i++) {
      let refLine = this.lines.find((x:any) => x.ID == this.allInspectionPointList[i].LineID);
      let refFamily = this.inspectionTypes.find((x:any) => (x.ID == this.allInspectionPointList[i].InspectionTypeID && x.LineID == this.allInspectionPointList[i].LineID));

      if(refLine == undefined){
        let line = {
          ID: this.allInspectionPointList[i].LineID,
          Text: this.allInspectionPointList[i].LineText
        };
        this.lines.push(line); 
      }
      //fill family combo box
      if(refFamily == undefined){
        let inspType = {
          ID: this.allInspectionPointList[i].InspectionTypeID,
          Text: this.allInspectionPointList[i].InspectionTypeText,
          LineID: this.allInspectionPointList[i].LineID
        };
        this.inspectionTypes.push(inspType); 
      }
    }

    //console.log('all inspection point list')
    //console.log(this.allInspectionPointList)

    this.addInitialButtonsToCanvas();
    
  }

  addInitialButtonsToCanvas(){
    let selectedInspectionPoints = this.allInspectionPointList.filter((x:any) => x.Checked == true);

    //console.log('selected inspection points')
    //console.log(selectedInspectionPoints)

    for (let i = 0; i < selectedInspectionPoints.length; i++) {
      let refOriginal = this.moduleJSON.buttons.find((btn:any) => btn.inspectionPointID == selectedInspectionPoints[i].ID)
      //console.log('ref original')
      //console.log(refOriginal)
      let ref = this.Buttons.find((x:any) => x.ID == selectedInspectionPoints[i].ID);

      if(ref == undefined){     
        let button = {
        ID : selectedInspectionPoints[i].ID,
        Number : selectedInspectionPoints[i].Number,
        Description : selectedInspectionPoints[i].Description,
        BackgroundColor : selectedInspectionPoints[i].BackgroundColor,
        ForeColor : selectedInspectionPoints[i].ForeColor,
        InspectionTypeID : selectedInspectionPoints[i].InspectionTypeID,
        InspectionTypeText : selectedInspectionPoints[i].InspectionTypeText,
        Coordinates : {x: Number(refOriginal.startCoordX), y: Number(refOriginal.startCoordY)},
        CoordinateX : Number(refOriginal.startCoordX),
        CoordinateY : Number(refOriginal.startCoordY),
        Disabled : selectedInspectionPoints[i].Disabled,
        Active: selectedInspectionPoints[i].Active
        };
        this.Buttons.push(button);
      }
    }

    this.drawLines();
    //console.log('estos son los buttons')
    //console.log(this.Buttons) 
  }

  drawLines(){
    let i = 0;
    this.Buttons.forEach((btn:any) => {
      i = i+1;
      let ref:any = undefined;
      let timeoutParent = setTimeout(() => {
        ref = this.moduleJSON.buttons.find((x:any) => x.inspectionPointID == btn.ID)

        //console.log("ref")
        //console.log(ref)
        if(ref.endCoordX != undefined && ref.endCoordY != undefined){
          this.pointID = this.pointID + 1;
          let point = {
            ID: this.pointID,
            Coordinates: {x: ref.endCoordX, y: ref.endCoordY}
          };
          this.Points.push(point);
          
          //console.log("POINTS")
          //console.log(this.Points)

          this.buttonXPointID = this.buttonXPointID + 1;
          let buttonXPoint = {
            ID: this.buttonXPointID,
            ButtonID: btn.ID,
            PointID: this.pointID
          };
          this.ButtonsXPoints.push(buttonXPoint);
        }
      }, 100*i);
      

      ////console.log('chosen button 2')
      ////console.log(this.chosenButton)
      let timeoutSon = setTimeout(() => {
        if(ref.endCoordX != undefined && ref.endCoordY != undefined){
          let button = this.document.getElementById('Button_' + btn.ID);
          let punto = this.document.getElementById('Point_' + this.pointID);

          punto.style.position = "absolute";
          punto.style.left = ref.endCoordX + 'px';
          punto.style.top =  ref.endCoordY + 'px';

          let linea = new LeaderLine(
            button,
            punto,
            {
              startPlug: 'behind',
              endPlug: 'disc',
              startPlugColor: '#00B7F1',
              endPlugColor: '#007AFF',
              gradient: true,
              size: 4.5,
              startSocketGravity: 0,
              endSocketGravity: 0,
              dash: {animation: true},
              path: 'fluid',
              hide: true
              // dropShadow: true
              // endPlugOutline: true,
            }
          );
          this.Lines.push(linea);  
          linea.show('draw'); 
        }
      }, 100*i);
       
    });

    //console.log('estos son los points')
    //console.log(this.Points)
    //console.log('estos son los buttonXPoints')
    //console.log(this.ButtonsXPoints)
    //console.log('estos son los lines')
    //console.log(this.Lines)
  }

  onMoving(event:any, btn:any){
    this.tempButtonCoordinates.x = event.x;
    this.tempButtonCoordinates.y = event.y;

    let crossref = this.ButtonsXPoints.find((x:any) => x.ButtonID == btn.ID);

    if(crossref != undefined){
      for (let i = 0; i < this.Lines.length; i++) {
        const element = this.Lines[i];
        if(element.start.id.substring(7) == String(crossref.ButtonID)){
          AnimEvent.add(
            this.Lines[i].position()
          )        
          break;
        } 
      }  
    }
  }

  onMoveEnd(event:any,btn:any) {
    if(this.tempButtonCoordinates.x != -20 && this.tempButtonCoordinates.y != -20)
    {
      this.Buttons.forEach((button:any) => {
        if(button.ID == btn.ID){
          button.Coordinates = {x: this.tempButtonCoordinates.x, y: this.tempButtonCoordinates.y};
          button.CoordinateX = this.tempButtonCoordinates.x;
          button.CoordinateY = this.tempButtonCoordinates.y;
        }
      });

      let crossref = this.ButtonsXPoints.find((x:any) => x.ButtonID == btn.ID);

      if(crossref != undefined){
        for (let i = 0; i < this.Lines.length; i++) {
          const element = this.Lines[i];
          if(element.start.id.substring(7) == String(crossref.ButtonID)){
            this.Lines[i].position();
            break;
          } 
        }  
      }
      this.tempButtonCoordinates = { x: -20, y: -20 };
    }  
  }

  selectItem(button:any){
    ////console.log('se hizo click y se selecciona boton')
    ////console.log('chosen button')
    ////console.log(this.chosenButton)
    if(this.chosenButton == undefined){
      this.chosenButton = button;

      let index = this.Buttons.findIndex((x:any) => x.ID == button.ID);

      ////console.log('button encontrado')
      ////console.log(this.Buttons[index])

      this.Buttons[index].Active = true;


    }
    else if(this.chosenButton.ID == button.ID){
      this.chosenButton = undefined;

      let index = this.Buttons.findIndex((x:any) => x.ID == button.ID);
      this.Buttons[index].Active = false;
    }
    else{
      let index = this.Buttons.findIndex((x:any) => x.ID == this.chosenButton.ID);
      this.Buttons[index].Active = false;

      this.chosenButton = button;

      let index2 = this.Buttons.findIndex((x:any) => x.ID == button.ID);
      this.Buttons[index2].Active = true;
    }
  }

  refreshInspectionPointFamilies(){
    this.selectedInspectionType = undefined;
  }

  filterInspectionTypesByLine(): any[] {
    if(this.selectedLine == undefined)
      return [];
    else
      return this.inspectionTypes.filter((x:any) => (x.LineID == this.selectedLine.ID));  
  }

  filterItemsByLineAndInspectionType(): any[] {
    if(this.selectedLine == undefined || this.selectedInspectionType == undefined)
      return [];
    else
      return this.allInspectionPointList.filter((x:any) => (x.LineID == this.selectedLine.ID && x.InspectionTypeID == this.selectedInspectionType.ID && x.Disabled == false));
  }

  assignCoordinate(event:any){

    if(this.isAssignCoordinateEnabled == true){
      //console.log('holaaa')
      this.pointID = this.pointID + 1;
      let point = {
        ID: this.pointID,
        Coordinates: {x: event.offsetX, y: event.offsetY}
      };
      this.Points.push(point);

      let buttonXPoint = {
        ID: this.buttonXPointID + 1,
        ButtonID: this.chosenButton.ID,
        PointID: this.pointID
      };
      this.ButtonsXPoints.push(buttonXPoint);

      setTimeout(() => {
        ////console.log('chosen button 2')
        ////console.log(this.chosenButton)
        let button = this.document.getElementById('Button_' + this.chosenButton.ID);
        let punto = this.document.getElementById('Point_' + this.pointID);

        punto.style.position = "absolute";
        punto.style.left = event.offsetX + 'px';
        punto.style.top =  event.offsetY + 'px';
        
        let linea = new LeaderLine(
          button,
          punto,
          {
            startPlug: 'behind',
            endPlug: 'disc',
            startPlugColor: '#00B7F1',
            endPlugColor: '#007AFF',
            gradient: true,
            size: 4.5,
            startSocketGravity: 0,
            endSocketGravity: 0,
            dash: {animation: true},
            path: 'fluid',
            hide: true
            // dropShadow: true
            // endPlugOutline: true,
          }
        );
        this.Lines.push(linea);  
        linea.show('draw');
    
        let index = this.Buttons.findIndex((x:any) => x.ID == this.chosenButton.ID);
        this.Buttons[index].Active = false;
        this.chosenButton = undefined;
      },1);
      this.isAssignCoordinateEnabled = false;
      ////console.log('Se dio click en imagen y se asigno coordenada.');
      this.habilitarButton = false;
      
    }
    else{
      ////console.log('Se dio click en imagen, pero no esta habilitado el asignar coordenada.')
    }
  }

  inspectionPointsToBeAddedSelectionChange(){
    ////console.log("INSP POINT SEL CHANGE")
    let selectedInspectionPoints = this.allInspectionPointList.filter((x:any) => (x.Checked == true && x.Disabled == false));

    if(selectedInspectionPoints == null || selectedInspectionPoints.length == 0 || selectedInspectionPoints == undefined){
      this.isAddInspectionPointsButtonDisabled = true;
    }
    else{
      this.isAddInspectionPointsButtonDisabled = false;
    }

    ////console.log("Variable:")
    ////console.log(this.isAddInspectionPointsButtonDisabled)
  }

  addButtonsToCanvas(){
    ////console.log("ENTRO A addButtonsToCanvas")
    let selectedInspectionPoints = this.allInspectionPointList.filter((x:any) => x.Checked == true);

    for (let i = 0; i < selectedInspectionPoints.length; i++) {
      let ref = this.Buttons.find((x:any) => x.ID == selectedInspectionPoints[i].ID);
        
      if(ref == undefined){     
        let button = {
        ID : selectedInspectionPoints[i].ID,
        Number : selectedInspectionPoints[i].Number,
        Description : selectedInspectionPoints[i].Description,
        BackgroundColor : selectedInspectionPoints[i].BackgroundColor,
        ForeColor : selectedInspectionPoints[i].ForeColor,
        InspectionTypeID : selectedInspectionPoints[i].InspectionTypeID,
        InspectionTypeText : selectedInspectionPoints[i].InspectionTypeText,
        Coordinates : {x: selectedInspectionPoints[i].CoordinateX, y: selectedInspectionPoints[i].CoordinateY},
        CoordinateX : selectedInspectionPoints[i].CoordinateX,
        CoordinateY : selectedInspectionPoints[i].CoordinateY,
        Disabled : selectedInspectionPoints[i].Disabled,
        Active: selectedInspectionPoints[i].Active
        };
        this.Buttons.push(button);
      }
    } 

    this.changeButtonProperties();
    this.isAddInspectionPointsButtonDisabled = true;
  }

  changeButtonProperties(){
    for (let i = 0; i < this.allInspectionPointList.length; i++) {
      let button = this.Buttons.find((x:any) => x.ID == this.allInspectionPointList[i].ID);
      if(button != undefined){
        this.allInspectionPointList[i].Checked = true;
        this.allInspectionPointList[i].Disabled = true;
      }
      else{
        this.allInspectionPointList[i].Checked = false;
        this.allInspectionPointList[i].Disabled = false;
      }
    }
  }

  inspectionPointsToBeRemovedSelectionChange(event:any,button:any){
    ////console.log('buttons to remove from canvas')
    ////console.log(this.buttonsToRemoveFromCanvas)
    if(event.checked == true){
      let btn = {
        ID: button.ID,
        Number: button.Number,
        Description: button.Description
      };

      this.buttonsToRemoveFromCanvas.push(btn);
    }
    else{
      this.buttonsToRemoveFromCanvas.splice(this.buttonsToRemoveFromCanvas.findIndex((x:any) => x.ID == button.ID), 1);
    }

    if(this.buttonsToRemoveFromCanvas == null || this.buttonsToRemoveFromCanvas.length == 0 || this.buttonsToRemoveFromCanvas == undefined){
      this.isRemoveInspectionPointsButtonDisabled = true;
    }
    else{
      this.isRemoveInspectionPointsButtonDisabled = false;
    }
  }

  removeButtonsFromCanvas(){  
    for (let i = this.buttonsToRemoveFromCanvas.length - 1; i >= 0; --i) {
      this.Buttons.splice(this.Buttons.findIndex((x:any) => x.ID == this.buttonsToRemoveFromCanvas[i].ID), 1);
      
      let crossref = this.ButtonsXPoints.find((x:any) => x.ButtonID == this.buttonsToRemoveFromCanvas[i].ID);

      if(crossref != undefined){
        let pointID = crossref.PointID;
        let buttonID = crossref.ButtonID;
  
        this.ButtonsXPoints.splice(this.ButtonsXPoints.findIndex((x:any) => x.ButtonID == buttonID), 1);
        this.Points.splice(this.Points.findIndex((x:any) => x.ID == pointID), 1);
        
        let lineIndex = this.Lines.findIndex((x:any) => x.start.id.substring(7) == String(this.buttonsToRemoveFromCanvas[i].ID));

        this.Lines[lineIndex].remove();
        this.Lines.splice(lineIndex, 1);

      }
      this.buttonsToRemoveFromCanvas.splice(i,1);
    }

    this.changeButtonProperties();    
    this.isRemoveInspectionPointsButtonDisabled = true;
  }

  enableCoordinateToButton(){
    //this.chosenButton = this.buttonsToRemoveFromCanvas[0];
    ////console.log('se dio click en habilitar coordenada')
    
    let crossref = this.ButtonsXPoints.find((x:any) => x.ButtonID == this.chosenButton.ID);

    if(crossref == undefined){
      this.isAssignCoordinateEnabled = true;
      this.habilitarButton = true;
      ////console.log('Se habilita el asignado de coordenada.')
    }
    else{
      this.isLineDuplicated = true;
      ////console.log("Boton ya tiene linea asignada.")

      setTimeout(() => {
        this.isLineDuplicated = false;
      }, 3000);
    } 
  }

  saveChanges(){
    Swal.fire({
      title: 'ALERTA',
      text: "Realmente desea sobrescribir la configuración de la base de datos con los cambios actuales?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        //llamar servicio de update o create y mandar a otra url

        let postJSON = {};
        let inspectionPointsJSON = [];
        let ref: any = null;
        let pointID: any = null;
        let point: any = null
        let pointCoordinates: any = null;

        for (let i = 0; i < this.Buttons.length; i++) {
          ref = this.ButtonsXPoints.find((x:any) => x.ButtonID == this.Buttons[i].ID);
          if(ref != undefined && ref != null){
            pointID = ref.PointID;
            point = this.Points.find((x:any) => x.ID == pointID);
            pointCoordinates = point.Coordinates;
          }

          let button = {
            "id": this.Buttons[i].ID,
            "startCoordX": String(this.Buttons[i].CoordinateX),
            "startCoordY": String(this.Buttons[i].CoordinateY),
            "endCoordX": (pointCoordinates != null && pointCoordinates != undefined)? String(pointCoordinates.x): null,
            "endCoordY": (pointCoordinates != null && pointCoordinates != undefined)? String(pointCoordinates.y): null
          };

          inspectionPointsJSON.push(button);

          ref = null;
          pointID = null;
          point = null;
          pointCoordinates = null;
        }

        postJSON = {
          "id": this.idView,
          "buttons": inspectionPointsJSON
        };

        //console.log("POST JSON --------------------------------------------")
        //console.log(postJSON)

        this.editViewService.updateModule(postJSON)
        .subscribe(res => {      
          //////console.log('REPSONSE ES ')
          //////console.log(res)

          this.saveModuleMessage = res.message;
          //console.log('response')
          //console.log(res)
          //si no tiene error mostrar alerta de success y resetear valores de pagina
          if(res.error == 'false'){
            //////console.log('service success')
            this.successAlert = true;
        setTimeout(() => {
          this.successAlert = false;
          this.resetPageValues();
          this.typeReportEvent.emit("viewslist");
          this.idViewEvent.emit("");  
        }, 3000);
          }
          //si si tiene error mostrar alerta de error y no resetear pagina
          else{
            this.errorAlert = true;
            ////console.log('service error')
          }   

        });


      }
    });
  }

  resetPageValues(){
    this.Lines.forEach((line:any) => {
      line.remove();
    });

    this.searchText = "";
    this.selectedInspectionType = undefined;
    this.selectedLine = undefined;
    this.isAddInspectionPointsButtonDisabled = true;
    this.allInspectionPointList= [];
    this.inspectionTypes= [];
    this.lines= [];
    this.ButtonsXPoints= [];
    this.Points= [];
    this.Lines= [];
    this.Buttons= [];
    this.buttonsToRemoveFromCanvas= [];
    this.isAssignCoordinateButtonDisabled= true;
    this.isRemoveInspectionPointsButtonDisabled = true;
    this.chosenButton= undefined;
    this.tempButtonCoordinates= { x: -20, y: -20 };
    this.isLineDuplicated= false;
    this.isAssignCoordinateEnabled = false;
    this.pointID= 0;
    this.buttonXPointID= 0;
    this.habilitarButton = false;
    this.successAlert = false;
    this.errorAlert = false;
  }

  closeErrorAlert(){
    this.errorAlert = false;
  }

}
