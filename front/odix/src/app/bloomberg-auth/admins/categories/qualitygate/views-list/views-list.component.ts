import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertHelper } from '../alerts-helper';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ViewsListService } from './views-list.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-views-list',
  templateUrl: './views-list.component.html',
  styleUrls: ['./views-list.component.scss']
})
export class ViewsListComponent implements OnInit {

  selectedAdmin = '';
  plantName:string = ""
  typeReport: string = ""
  viewsList: any;
  viewsListFiltered: any;
  filter: any;
  isFormHidden: boolean = true;
  isLoading: boolean = false;
  lineCombo: any = [];
  ennCombo: any = [];
  stationCombo: any = [];
  idToDuplicate: any;
  selectedLineOnCombo: any;
  selectedEnnOnCombo: any;
  selectedStationOnCombo: any;
  selectedOperatorPosition: any;
  p: number = 1;
  @Output() typeReportEvent = new EventEmitter<string>();
  @Output() idViewEvent = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private alertHelper: AlertHelper, private router: Router, private viewsListService: ViewsListService, private translateService: TranslateService) {
    this.selectedAdmin = this.route.snapshot.paramMap.get('typeadmin');  
    this.plantName = this.route.snapshot.paramMap.get('plantName'); 
    this.typeReport = this.route.snapshot.paramMap.get('typereport'); 
    this.filter = {"name": '', "nameRegistered": ''};
  }

  ngOnInit() {
    this.getAssets();
    this.getViews();
  }

  getAssets(){
    this.viewsListService.getStations()
      .subscribe(data => {
        this.processAssetsJson(data);
      });
  }

  getViews(){
    this.viewsListService.getAllModules()
      .subscribe((res:any) => {
        this.viewsList = res;
        this.viewsListFiltered = res;
      });
  }

  processAssetsJson(json: any){
    //console.log("json")
    //console.log(json)
    this.lineCombo = [];
    this.ennCombo = [];
    this.stationCombo = [];

    json.lines.forEach((element:any) => {

      let refLine = this.lineCombo.find((x:any) => x.ID == element.id);

      //fill line combo box
      if(refLine == undefined){
        let line = {
          ID: element.id,
          Text: element.name
        };
        this.lineCombo.push(line); 
      }

      //fill enn combo
      element.enns.forEach((x:any) => {
        let refEnn = this.ennCombo.find((x:any) => x.ID == element.id);

        if(refEnn == undefined){
          let enn = {
            ID: x.id,
            Text: x.name,
            LineID: element.id
          };
          this.ennCombo.push(enn);
        }

        //fill station combo
        x.stations.forEach((y:any) => {
          let refStation = this.stationCombo.find((a:any) => a.ID == element.id);

          if(refStation == undefined){
            let station = {
              ID: y.id,
              Text: y.name,
              ENNID: x.id
            };
            this.stationCombo.push(station);
          }
        });

      });
    });
  }

  filterViews(){
    let param = this.filter['nameRegistered'];
    if(param.length < 1) {
      this.viewsListFiltered = this.viewsList; 
    }else{
      this.viewsListFiltered = this.viewsList.filter((u:any) => u.name.toUpperCase().includes(param.toUpperCase()) 
                                                             || u.lineName.toUpperCase().includes(param.toUpperCase()) 
                                                             || u.ennName.toUpperCase().includes(param.toUpperCase()) 
                                                             || u.stationName.toUpperCase().includes(param.toUpperCase()) );
    }
  }

  filterEnnsByLine(): any[] {
    if(this.selectedLineOnCombo == undefined)
      return [];
    else
      return this.ennCombo.filter((x:any) => x.LineID == this.selectedLineOnCombo.ID);
  }

  filterStationsByEnn(): any[] {
    if(this.selectedEnnOnCombo == undefined)
      return [];
    else
      return this.stationCombo.filter((x:any) => x.ENNID == this.selectedEnnOnCombo.ID);
  }

  lineComboSelectionChange(){
    this.selectedEnnOnCombo = undefined;
    this.selectedStationOnCombo = undefined;
  }

  ennComboSelectionChange(){
    this.selectedStationOnCombo = undefined;
  }

  open(viewId:any) {
    this.resetFormVariables();
    this.idToDuplicate = viewId;
    this.isFormHidden = false;
  }

  closeForm(){
    this.isFormHidden = true;
    this.resetFormVariables();
  }

  resetFormVariables(){
    this.idToDuplicate = undefined;
    this.selectedLineOnCombo = undefined;
    this.selectedEnnOnCombo = undefined;
    this.selectedStationOnCombo = undefined;
    this.selectedOperatorPosition = undefined;
  }

  deleteView(view:any){
    Swal.fire({
      title: this.translateService.instant("INACTIVATE"),
      text: this.translateService.instant("Are you sure you want to inactivate the selected record?"),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant("Accept")
    }).then((result) => {
      if (result.value) {
        //llamar servicio de update y volver a llamar el servicio que me traiga los modules apra refreshear info
        //this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record inactivated correctly"))
        
        
        this.viewsListService.editModuleStatus(view.id,0)
          .subscribe(res => {
            if(res.error == 'false'){
              this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record inactivated correctly"))
              this.refreshView();
              this.closeForm();
            }
            else{
              this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while inactivating the record"))
            }  
          });
      }
    });
  }

  refreshView(){
    this.getAssets();
    this.getViews();
 }

  activateView(view:any){
    //this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"),this.translateService.instant("Record activated correctly"))
    this.viewsListService.editModuleStatus(view.id,1)
      .subscribe(res => {
        if(res.error == 'false'){
          this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record activated correctly"))
          this.refreshView();
          this.closeForm();
        }
        else{
          this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while activating the record"))
        }  
      });
  }

  editView(view:any){
    console.log('view')
    console.log(view)
    console.log(`admin/${this.selectedAdmin}/editview/${this.plantName}/${view.id}`)
    this.typeReportEvent.emit("editview");
    this.idViewEvent.emit(view.id);
    //this.router.navigate([`admin/${this.selectedAdmin}/editview/${this.plantName}/${view.id}`]);
  }

  duplicateView(){
    if(this.selectedLineOnCombo == undefined || this.selectedEnnOnCombo == undefined || this.selectedStationOnCombo == undefined || this.selectedOperatorPosition == undefined || this.idToDuplicate == undefined){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
    }
    else{
      let postJSON = {};
      postJSON = {
        "id": this.idToDuplicate,
        "lineID": this.selectedLineOnCombo.ID,
        "ennID": this.selectedEnnOnCombo.ID,
        "stationID": this.selectedStationOnCombo.ID,
        "opPosition": this.selectedOperatorPosition
      };

      this.viewsListService.duplicateModule(postJSON)
        .subscribe(res => {
          if(res.error == 'false'){
            this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), res.message + this.translateService.instant("Record created correctly"))
            this.refreshView();
            this.closeForm();
          }
          else{
            this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while creating the record"))
          }  
        });
    }
  }

}
