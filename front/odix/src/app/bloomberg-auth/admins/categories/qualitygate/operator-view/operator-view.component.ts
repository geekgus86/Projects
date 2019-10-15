import { Component, OnInit, Inject } from '@angular/core';
import {DOCUMENT} from "@angular/common";
import 'leader-line';
import { style } from '@angular/animations';
import Swal from 'sweetalert2';
import { AlertHelper } from '../alerts-helper';
import { OperatorViewService } from './operator-view.service';
import { TranslateService } from '@ngx-translate/core';
declare let LeaderLine: any;

@Component({
  selector: 'app-operator-view',
  templateUrl: './operator-view.component.html',
  styleUrls: ['./operator-view.component.scss']
})
export class OperatorViewComponent implements OnInit {
  defects: any = [];
  filteredDefects: any = [];
  inspectionPointTypes: any = [];
  repairs: any = [];
  isReprocesosListosButtonSelected: boolean = true;
  isEnviarACarpaButtonSelected: boolean = false;
  isButtonSelected : boolean = false;
  buttonSelected: any = {};
  selectedModule: any;
  selectedImage: any = '';
  Buttons: any = [];
  Lines: any = [];
  Points: any = [];
  moduleJSON: any;
  loggedIn: boolean = false;
  successAlert = false;
  editSuccessAlert = false;
  errorAlert = false;
  inspectionDone = false;
  newPartArrived = false;
  serialJSN = "1";
  errorLoginValue: any;
  i: any = 0;
  userBadge: any;

  constructor(@Inject(DOCUMENT) private document:any, private alertHelper: AlertHelper, private operatorViewService: OperatorViewService, private translateService: TranslateService) {

  }

  readBadge(){
    this.login(this.userBadge);
  }

  ngOnInit() {
    
  }

  changeJSN(){
    let newSerial = parseInt(this.serialJSN) + 1;
    this.serialJSN = String(newSerial);
    //console.log('CAMBIO JSN')
    this.resetPageValues();
    this.login(this.userBadge);
    this.newPartArrived = true;
    setTimeout(() => {
      this.newPartArrived = false;
    }, 3000);
  }

  login(badge:any){
    //para probar
    //this.getModulesByUserTest(badge)

    //para prod
    this.getModulesByUser(badge);
  }

  getModulesByUserTest(badge:any){
    this.moduleJSON = {
      "userID": 10,
      "userName": "Martinez, Rodrigo",
      "badge": "3725480051",
      "roleID": 2,
      "roleDescription": "Operator",
      "lineID": 3,
      "lineName": "DTL1",
      "ennID": 4,
      "ennName": "ENN8",
      "stationID": 5,
      "stationName": "I780",
      "opPosition": 1,
      "error": 0,
      "modules": [{
        "name": "DTL1-ENN8-I780-Op1-01",
        "imageID": 62,
        "imagePath": "https://i40storagedev.blob.core.windows.net/rework/Apodaca/DTL1-ENN8-I780-Op1-01",
        "imageName": "DTL1-ENN8-I780-Op1-01",
        "buttons": [{
          "id": 124,
          "inspectionPointID": 13,
          "name": "ItemA2",
          "description": "Item 2 Atornillado",
          "backgroundColor": "#b8b8b8",
          "foreColor": "#000000",
          "inspectionTypeID": 10,
          "inspectionTypeDescription": "Atornillado",
          "startCoordX": 25,
          "startCoordY": 165,
          "endCoordX": 242,
          "endCoordY": 276
        }, {
          "id": 125,
          "inspectionPointID": 16,
          "name": "ItemE",
          "description": "Item Ensamble 1",
          "backgroundColor": "#95c9ed",
          "foreColor": "#000000",
          "inspectionTypeID": 6,
          "inspectionTypeDescription": "Ensamble",
          "startCoordX": 489,
          "startCoordY": 31,
          "endCoordX": 677,
          "endCoordY": 146
        }, {
          "id": 126,
          "inspectionPointID": 18,
          "name": "ItemPT",
          "description": "Item PT 1",
          "backgroundColor": "#e77ff5",
          "foreColor": "#000000",
          "inspectionTypeID": 15,
          "inspectionTypeDescription": "Proyección Tornillo Stud",
          "startCoordX": 229,
          "startCoordY": 388,
          "endCoordX": 200,
          "endCoordY": 342
        }, {
          "id": 127,
          "inspectionPointID": 25,
          "name": "ItemR2",
          "description": "Item River Nut 2",
          "backgroundColor": "#4bdedb",
          "foreColor": "#000000",
          "inspectionTypeID": 13,
          "inspectionTypeDescription": "Rivet Nut",
          "startCoordX": 509,
          "startCoordY": 396,
          "endCoordX": 715,
          "endCoordY": 320
        }, {
          "id": 128,
          "inspectionPointID": 27,
          "name": "ItemS2",
          "description": "Item Soldadura 2",
          "backgroundColor": "#FF9900",
          "foreColor": "#000000",
          "inspectionTypeID": 8,
          "inspectionTypeDescription": "Soldadura",
          "startCoordX": 32,
          "startCoordY": 27,
          "endCoordX": 231,
          "endCoordY": 102
        }, {
          "id": 129,
          "inspectionPointID": 21,
          "name": "ItemTU2",
          "description": "Item TU 2",
          "backgroundColor": "#e77ff5",
          "foreColor": "#000000",
          "inspectionTypeID": 18,
          "inspectionTypeDescription": "Proyección Tuerca",
          "startCoordX": 825,
          "startCoordY": 95,
          "endCoordX": 695,
          "endCoordY": 118
        }, {
          "id": 130,
          "inspectionPointID": 22,
          "name": "ItemP",
          "description": "Item Punzonado 1",
          "backgroundColor": "#eb9a44",
          "foreColor": "#000000",
          "inspectionTypeID": 9,
          "inspectionTypeDescription": "Punzonado",
          "startCoordX": 818,
          "startCoordY": 202,
          "endCoordX": 678,
          "endCoordY": 277
        }],
        "id": 71
      }

      , {
        "name": "DTL1-ENN8-I780-Op1-02",
        "imageID": 63,
        "imagePath": "https://i40storagedev.blob.core.windows.net/rework/Apodaca/DTL1-ENN8-I780-Op1-02",
        "imageName": "DTL1-ENN8-I780-Op1-02",
        "buttons": [{
          "id": 116,
          "inspectionPointID": 20,
          "name": "ItemTU",
          "description": "Item TU 1",
          "backgroundColor": "#e77ff5",
          "foreColor": "#000000",
          "inspectionTypeID": 18,
          "inspectionTypeDescription": "Proyección Tuerca",
          "startCoordX": 449,
          "startCoordY": 41,
          "endCoordX": 792,
          "endCoordY": 135
        }, {
          "id": 117,
          "inspectionPointID": 16,
          "name": "ItemE",
          "description": "Item Ensamble 1",
          "backgroundColor": "#95c9ed",
          "foreColor": "#000000",
          "inspectionTypeID": 6,
          "inspectionTypeDescription": "Ensamble",
          "startCoordX": 399,
          "startCoordY": 395,
          "endCoordX": 183,
          "endCoordY": 244
        }],
        "id": 72,
      }
      
      ,{
        "name": "DTL1-ENN8-I780-Op1-03",
        "imageID": 63,
        "imagePath": "https://i40storagedev.blob.core.windows.net/rework/Apodaca/DTL1-ENN8-I780-Op1-02",
        "imageName": "DTL1-ENN8-I780-Op1-02",
        "buttons": [{
          "id": 116,
          "inspectionPointID": 20,
          "name": "ItemTU",
          "description": "Item TU 1",
          "backgroundColor": "#e77ff5",
          "foreColor": "#000000",
          "inspectionTypeID": 18,
          "inspectionTypeDescription": "Proyección Tuerca",
          "startCoordX": 449,
          "startCoordY": 41,
          "endCoordX": 792,
          "endCoordY": 135
        }, {
          "id": 117,
          "inspectionPointID": 16,
          "name": "ItemE",
          "description": "Item Ensamble 1",
          "backgroundColor": "#95c9ed",
          "foreColor": "#000000",
          "inspectionTypeID": 6,
          "inspectionTypeDescription": "Ensamble",
          "startCoordX": 399,
          "startCoordY": 395,
          "endCoordX": 183,
          "endCoordY": 244
        }],
        "id": 74,
      }

      ,{
        "name": "DTL1-ENN8-I780-Op1-04",
        "imageID": 63,
        "imagePath": "https://i40storagedev.blob.core.windows.net/rework/Apodaca/DTL1-ENN8-I780-Op1-02",
        "imageName": "DTL1-ENN8-I780-Op1-02",
        "buttons": [{
          "id": 116,
          "inspectionPointID": 20,
          "name": "ItemTU",
          "description": "Item TU 1",
          "backgroundColor": "#e77ff5",
          "foreColor": "#000000",
          "inspectionTypeID": 18,
          "inspectionTypeDescription": "Proyección Tuerca",
          "startCoordX": 449,
          "startCoordY": 41,
          "endCoordX": 792,
          "endCoordY": 135
        }, {
          "id": 117,
          "inspectionPointID": 16,
          "name": "ItemE",
          "description": "Item Ensamble 1",
          "backgroundColor": "#95c9ed",
          "foreColor": "#000000",
          "inspectionTypeID": 6,
          "inspectionTypeDescription": "Ensamble",
          "startCoordX": 399,
          "startCoordY": 395,
          "endCoordX": 183,
          "endCoordY": 244
        }],
        "id": 77
      }
    ]
    };

    this.loggedIn = true;
    this.selectedModule = this.moduleJSON.modules[0]; 
    this.selectedImage = this.selectedModule.imagePath;

    this.addButtonsToCanvas();
  }

  getModulesByUser(badge:any){
    this.operatorViewService.getModulesByBadge(badge)
      .subscribe((data:any) => {
        //console.log("JSON de modulos")
        //console.log(data)
        this.errorLoginValue = data.error;

        //console.log('Variable ERROR DE LOGIN: ')
        //console.log(this.errorLoginValue)
        //no hubo ningun error al login
        if(this.errorLoginValue == 0){
          this.loggedIn = true;
          this.moduleJSON = data;
          this.selectedModule = this.moduleJSON.modules[0]; 
          this.selectedImage = this.selectedModule.imagePath;

          this.addButtonsToCanvas();
        }
        //hubo un error al hacer login
        //Tipos:
        // 0 = No hubo error
        // 1 = ip no asignada
        // 2 = user no existe
        // 3 = user no entrenado
        // 4 = no modulos asignados
        else{
          this.userBadge = undefined;
          setTimeout(() => {
            this.errorLoginValue = undefined;
          }, 3000);
        }
        
    });
  }

  getAllActiveDefects(){
    this.operatorViewService.getAllActiveDefects()
      .subscribe(data => {
        //console.log('DEFECTOS')
        //console.log(data)
        this.defects = data;
        this.fillInspectionPointTypes();
      });
  }

  getStartCoordinates(button:any){
    return {x: button.startCoordX, y: button.startCoordY};
  }

  getEndCoordinates(button:any){
    return {x: Number(button.endCoordX), y: Number(button.endCoordY)};
  }

  addButtonsToCanvas(){
    this.Buttons = [];

    if(this.selectedModule.buttons[0].id != undefined && this.selectedModule.buttons[0].id != null){
      for (let i = 0; i < this.selectedModule.buttons.length; i++) {
  
        let ref = this.Buttons.find((x:any) => x.id == this.selectedModule.buttons[i].id);
  
        if(ref == undefined){     
          let button = {
            id : this.selectedModule.buttons[i].id,
            inspectionPointID : this.selectedModule.buttons[i].inspectionPointID,
            name : this.selectedModule.buttons[i].name,
            description : this.selectedModule.buttons[i].description,
            backgroundColor : this.selectedModule.buttons[i].backgroundColor,
            foreColor : this.selectedModule.buttons[i].foreColor,
            inspectionTypeID : this.selectedModule.buttons[i].inspectionTypeID,
            inspectionTypeDescription : this.selectedModule.buttons[i].inspectionTypeDescription,
            coordinates : {x: Number(this.selectedModule.buttons[i].startCoordX), y: Number(this.selectedModule.buttons[i].startCoordY)},
            startCoordX : Number(this.selectedModule.buttons[i].startCoordX),
            startCoordY : Number(this.selectedModule.buttons[i].startCoordY),
            endCoordX : Number(this.selectedModule.buttons[i].endCoordX),
            endCoordY : Number(this.selectedModule.buttons[i].endCoordY)
          };
          this.Buttons.push(button);
        }
      }
    }
    this.drawLines();
  }

  changeModule(moduleID:any){

    this.moduleJSON.modules.forEach((element:any) => {
      if(element.id == moduleID){
        this.selectedModule = element;
        return;
      }
    });

    this.selectedImage = this.selectedModule.imagePath;

    this.addButtonsToCanvas();

    this.fillInspectionPointTypes();
  }

  selectDefect(defect:any){
    let styleClass = ''
    let repairTypeID = undefined;
    let repairTypeColor = undefined;
    
    if(this.isReprocesosListosButtonSelected){
      repairTypeID = 2;
      repairTypeColor = '#FFC600';
    }
    else if(this.isEnviarACarpaButtonSelected){
      repairTypeID = 3;
      repairTypeColor = '#FF3D57';
    }

    if(defect.checked == true){
      if(defect.class == "defRepLista"){
        if(this.isReprocesosListosButtonSelected){        
          this.filteredDefects.find((x:any) => x.id == defect.id).checked = false;
          this.filteredDefects.find((x:any) => x.id == defect.id).class = 'def';

          this.repairs.splice(this.repairs.findIndex((x:any) => x.defectID == defect.id), 1);
        }
        else{
          this.filteredDefects.find((x:any) => x.id == defect.id).class = 'defRecuperadoMayor';
          this.repairs.find((x:any) => x.defectID == defect.id).repairTypeID = 3;
          this.repairs.find((x:any) => x.defectID == defect.id).repairTypeColor = "#FF3D57";
        }
      }
      else if(defect.class == "defRecuperadoMayor"){
        if(this.isEnviarACarpaButtonSelected){        
          this.filteredDefects.find((x:any) => x.id == defect.id).checked = false;
          this.filteredDefects.find((x:any) => x.id == defect.id).class = 'def';
  
          this.repairs.splice(this.repairs.findIndex((x:any) => x.defectID == defect.id), 1);
        }
        else{
          this.filteredDefects.find((x:any) => x.id == defect.id).class = 'defRepLista';
          this.repairs.find((x:any) => x.defectID == defect.id).repairTypeID = 2;
          this.repairs.find((x:any) => x.defectID == defect.id).repairTypeColor = "#FFC600";
        }
      }
    }
    else{
      if(this.isReprocesosListosButtonSelected){
        defect.class = 'defRepLista';
        styleClass = 'defRepLista';
      }
      else if(this.isEnviarACarpaButtonSelected){
        defect.class = 'defRecuperadoMayor';
        styleClass = 'defRecuperadoMayor';
      }

      this.filteredDefects.find((x:any) => x.id == defect.id).checked = true;
      this.filteredDefects.find((x:any) => x.id == defect.id).class = styleClass;

      let repair = {
        buttonID: this.buttonSelected.id, 
        buttonName: this.buttonSelected.name,
        inspectionPointID: this.buttonSelected.inspectionPointID,
        inspectionTypeID : this.buttonSelected.inspectionTypeID,
        inspectionTypeDescription : this.buttonSelected.inspectionTypeDescription,
        moduleID: this.selectedModule.id,
        defectID: defect.id,
        defectCode: defect.code,
        defectDescription: defect.description,
        repairTypeID: repairTypeID,
        repairTypeColor: repairTypeColor        
      };

      this.repairs.unshift(repair);
    }
  }

  deleteRepair(repair:any){
    this.repairs.splice(this.repairs.findIndex((x:any) => (x.buttonID == repair.buttonID && x.defectID == repair.defectID)), 1);

    if(this.isButtonSelected == true){
      if(this.buttonSelected.id == repair.buttonID){
        this.filteredDefects.find((x:any) => x.id == repair.defectID).checked = false;
        this.filteredDefects.find((x:any) => x.id == repair.defectID).class = 'def';
      }
    }
  }

  changeRepairType(type:any){
    if(type == 2){
      if(this.isReprocesosListosButtonSelected == false){
        this.isEnviarACarpaButtonSelected = false;
        this.isReprocesosListosButtonSelected = true;
      }
    }
    else{
      if(this.isEnviarACarpaButtonSelected == false){
        this.isReprocesosListosButtonSelected = false;
        this.isEnviarACarpaButtonSelected = true;
      }
    }
  }

  drawLines(){
    let i = 0;

    if(this.Lines.length > 0){
      this.Lines.forEach((line:any) => {
        line.remove();
      });
    }
    this.Lines = [];

    this.Buttons.forEach((btn:any) => {
      i = i+1;

      let timeoutParent = setTimeout(() => {
        if(btn.endCoordX != undefined && btn.endCoordY != undefined){
          let point = {
            id: btn.id,
            coordinates: {x: btn.endCoordX, y: btn.endCoordY}
          };
          this.Points.push(point);
        }
      }, 100*i);

      let timeoutSon = setTimeout(() => {
        if(btn.endCoordX != undefined && btn.endCoordY != undefined){
          let button = this.document.getElementById('Button_' + btn.id);
          let punto = this.document.getElementById('Point_' + btn.id);
        
          punto.style.position = "absolute";
          punto.style.left = btn.endCoordX + 'px';
          punto.style.top =  btn.endCoordY + 'px';
  
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

    this.getAllActiveDefects()
  }

  fillInspectionPointTypes(){
    this.inspectionPointTypes = [];
    this.selectedModule.buttons.forEach((button:any) => {
      let ref = this.inspectionPointTypes.find((x:any) => x.id == button.inspectionTypeID);
        if(ref == undefined){
          let insType = {
            id: button.inspectionTypeID,
            name: button.inspectionTypeDescription,
            color: button.backgroundColor
          };
          this.inspectionPointTypes.push(insType); 
        }
    });
  }

  unselectButton(){
    this.buttonSelected = {};  
    this.isButtonSelected = false;
  }

  captureDefects(button:any){
    
    this.isEnviarACarpaButtonSelected = false;
    this.isReprocesosListosButtonSelected = true;

    this.filteredDefects = [];

    if(this.isButtonSelected == true){
      if(button.id == this.buttonSelected.id){
        this.buttonSelected = {};  
        this.isButtonSelected = false;
      }
      else{
        this.buttonSelected = button;
      }
    }
    else{
      this.isButtonSelected = true;
      this.buttonSelected = button;
    }

    this.defects.forEach((defect:any) => {
      if(defect.inspectionTypeID == this.buttonSelected.inspectionTypeID){

        //console.log('entro 1')

        let styleClass = '';
        let checked = false;
        let ref = this.repairs.find((x:any) => (x.buttonID == this.buttonSelected.id && x.defectID == defect.defectID));       

        if(ref != undefined){
          if(ref.repairTypeID == 2)
            styleClass = 'defRepLista';
          else if(ref.repairTypeID == 3)
            styleClass = 'defRecuperadoMayor';

          checked = true;
        }
        else
          styleClass = 'def';

        let def = {
          id: defect.defectID,
          code: defect.defectCode,
          description: defect.defectDescription,
          inspectionTypeID: defect.inspectionTypeID,
          checked: checked,
          class: styleClass
        };

        this.filteredDefects.push(def);
      }
    });
  }

  closeErrorAlert(){
    this.errorAlert = false;
  }

  saveInspection(){
    //console.log('stationID')
    //console.log(this.moduleJSON.stationID)
    //console.log('opPosition')
    //console.log(this.moduleJSON.opPosition)
    //console.log('userID')
    //console.log(this.moduleJSON.userID)
    //console.log('repairs')
    //console.log(this.repairs)

    //llamar servicio de update o create y mandar a otra url
    let postJSON: any = {};
    let repairsJSON: any = [];

    this.repairs.forEach((rep:any) => {
      let obj = {};
      obj = 
      {
        "inspectionPointID": rep.inspectionPointID,
        "transactionTypeID": rep.repairTypeID,
        "inspectionDefectID": rep.defectID,
        "moduleID": rep.moduleID
      }

      repairsJSON.push(obj);
    });
    

    postJSON = {
      "serial": this.serialJSN,
      "stationID": this.moduleJSON.stationID,
      "opPosition": this.moduleJSON.opPosition,
      "userID": this.moduleJSON.userID,
      "repairs": repairsJSON
    }

    //console.log("POST JSON CREATE --------------------------------------------")
    //console.log(postJSON)

    this.operatorViewService.saveInspection(postJSON)
    .subscribe(res => {      
      if(res.error == 'false'){
        Swal.fire({
          title: this.translateService.instant("INSPECTION FINISHED"), 
          type: "success",
          timer: 3000,
          showConfirmButton: false,
          showCancelButton: false,
          showCloseButton: false
        }).then((result) => {
          
        })
        this.inspectionDone = true;
      }
      else{
        Swal.fire({
          title: this.translateService.instant("ERROR"),
          type: "error",
          timer: 3000,
          showConfirmButton: false,
          showCancelButton: false,
          showCloseButton: false
        }).then((result) => {
          
        })
      }   
    });
      
  }

  updateInspection(){
    //console.log('stationID')
    //console.log(this.moduleJSON.stationID)
    //console.log('opPosition')
    //console.log(this.moduleJSON.opPosition)
    //console.log('userID')
    //console.log(this.moduleJSON.userID)
    //console.log('repairs')
    //console.log(this.repairs)

    //llamar servicio de update o create y mandar a otra url
    let postJSON: any = {};
    let repairsJSON: any = [];

    this.repairs.forEach((rep:any) => {
      let obj = {};
      obj = 
      {
        "inspectionPointID": rep.inspectionPointID,
        "transactionTypeID": rep.repairTypeID,
        "inspectionDefectID": rep.defectID,
        "moduleID": rep.moduleID
      }

      repairsJSON.push(obj);
    });
    

    postJSON = {
      "serial": this.serialJSN,
      "stationID": this.moduleJSON.stationID,
      "opPosition": this.moduleJSON.opPosition,
      "userID": this.moduleJSON.userID,
      "repairs": repairsJSON
    }

    //console.log("POST JSON UPDATE --------------------------------------------")
    //console.log(postJSON)

    this.operatorViewService.saveInspection(postJSON)
    .subscribe(res => {      
      if(res.error == 'false'){
        Swal.fire({
          title: this.translateService.instant("INSPECTION UPDATED"), 
          type: "success",
          timer: 3000,
          showConfirmButton: false,
          showCancelButton: false,
          showCloseButton: false
        }).then((result) => {
          
        })
      }
      else{
        Swal.fire({
          title: this.translateService.instant("ERROR"),
          type: "error",
          timer: 3000,
          showConfirmButton: false,
          showCancelButton: false,
          showCloseButton: false
        }).then((result) => {
          
        })
      }   
    });
  }

  resetPageValues(){
    this.Lines.forEach((line:any) => {
      line.remove();
    });

    this.defects = [];
    this.filteredDefects = [];
    this.inspectionPointTypes = [];
    this.repairs = [];
    this.isReprocesosListosButtonSelected = true;
    this.isEnviarACarpaButtonSelected = false;
    this.isButtonSelected = false;
    this.buttonSelected = {};
    this.selectedModule = undefined;
    this.selectedImage = '';
    this.Buttons = [];
    this.Lines = [];
    this.Points = [];
    this.moduleJSON = undefined;
    this.loggedIn = true;
    this.successAlert = false;
    this.editSuccessAlert = false;
    this.errorAlert = false;
    this.inspectionDone = false;
    this.newPartArrived = false;
    this.i = 0;
  }

}
