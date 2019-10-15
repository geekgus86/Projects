import { Component, OnInit } from '@angular/core';
import { IpAssignmentService } from './ip-assignment.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertHelper } from '../alerts-helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ip-assignment',
  templateUrl: './ip-assignment.component.html',
  styleUrls: ['./ip-assignment.component.scss']
})
export class IpAssignmentComponent implements OnInit {
  isFormHidden: boolean = true;
  isEditing: boolean = false;
  isLoading: boolean = false;
  ipList: any;
  ipListFiltered: any;
  filter: any;
  lineCombo: any = [];
  ennCombo: any = [];
  stationCombo: any = [];
  ipFormControl = new FormControl(); 
  ipNumber: any;
  idToUpdate: any;
  selectedLineOnCombo: any;
  selectedEnnOnCombo: any;
  selectedStationOnCombo: any;
  selectedOperatorPosition: any;
  oldIpNumber: any;
  oldLineID: any;
  oldEnnID: any;
  oldStationID: any;
  oldOpPosition: any;
  p: number = 1;

  constructor(private ipAssignmentService: IpAssignmentService, private alertHelper: AlertHelper, private translateService: TranslateService) {
    this.filter = {"name": '', "nameRegistered": ''}
   }

  ngOnInit() {
    this.getAssets();
    this.getIpAssignments();
  }

  getAssets(){
    this.ipAssignmentService.getStations()
      .subscribe((data:any) => {
        this.processAssetsJson(data);
      });
  }

  getIpAssignments(){
    this.ipAssignmentService.getIpAssignments()
      .subscribe((data:any) => {
        this.ipList = data;
        this.ipListFiltered = data;
      });
  }

  processAssetsJson(json: any){
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

  editIp(element: any){
    //console.log('ip')
    //console.log(element)

    let refLine = this.lineCombo.find((x:any) => x.ID == element.lineID);
    let refEnn = this.ennCombo.find((x:any) => x.ID == element.ennID);
    let refStation = this.stationCombo.find((x:any) => x.ID == element.stationID);
    
    this.idToUpdate = element.id;
    this.ipNumber = element.ipAddress; 
    this.selectedLineOnCombo = refLine;
    this.selectedEnnOnCombo = refEnn;
    this.selectedStationOnCombo = refStation;
    this.selectedOperatorPosition = element.opPosition;

    this.isFormHidden = false;
    this.isEditing = true;

    this.oldIpNumber = element.ipAddress;
    this.oldLineID = element.lineID;
    this.oldEnnID = element.ennID;
    this.oldStationID = element.stationID;
    this.oldOpPosition = element.opPosition;
  }

  deleteIp(element:any) {
    Swal.fire({
      title: this.translateService.instant("DELETE"),
      text: this.translateService.instant("Are you sure you want to delete the selected record?"),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant("Accept")
    }).then((result) => {
      if (result.value) {
        //llamar servicio de delete y volver a llamar el servicio que me traiga los ips apra refreshear info

        this.ipAssignmentService.deleteIpAddressAssignment(element.id)
          .subscribe(res => {
            if(res.error == 'false'){
              this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record deleted correctly"))
              this.refreshView();
              this.closeForm();
            }
            else{
              this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while deleting the record"))
            }  
          });
      }
    });
  }

  open() {
    this.resetFormVariables();
    this.isFormHidden = false;
  }

  closeForm(){
    this.isFormHidden = true;
    this.resetFormVariables();
    this.isEditing = false;
  }

  resetFormVariables(){
    this.idToUpdate = undefined;
    this.ipNumber = undefined; 
    this.selectedLineOnCombo = undefined; 
    this.selectedEnnOnCombo = undefined; 
    this.selectedStationOnCombo = undefined; 
    this.selectedOperatorPosition = undefined; 

    this.oldIpNumber = undefined; 
    this.oldLineID = undefined; 
    this.oldEnnID = undefined; 
    this.oldStationID = undefined; 
    this.oldOpPosition = undefined; 
  }

  filterIps(){
    let param = this.filter['nameRegistered'];
    if(param.length < 1) {
      this.ipListFiltered = this.ipList; 
    }else{
      //console.log('lista')
      //console.log(this.ipListFiltered)
      this.ipListFiltered = this.ipList.filter((u:any) => u.ipAddress.toUpperCase().includes(param.toUpperCase()) 
                                                       || u.lineName.toUpperCase().includes(param.toUpperCase()) 
                                                       || u.ennName.toUpperCase().includes(param.toUpperCase())
                                                       || u.stationName.toUpperCase().includes(param.toUpperCase()));
    }
  }

  lineComboSelectionChange(){
    this.selectedEnnOnCombo = undefined;
    this.selectedStationOnCombo = undefined;
  }

  ennComboSelectionChange(){
    this.selectedStationOnCombo = undefined;
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

  refreshView(){
    this.getAssets();
    this.getIpAssignments();
  }

  save(){
    //console.log('ip number')
    //console.log(this.ipNumber)

    if(this.ipNumber == undefined || this.ipNumber == '' || this.selectedLineOnCombo == undefined || this.selectedEnnOnCombo == undefined || this.selectedStationOnCombo == undefined || this.selectedOperatorPosition == undefined){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
    }
    else{
      if(this.ipFormControl.errors != null ){
        if(this.ipFormControl.errors.pattern)
        this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("IP Not Valid"));
      }
      else{
        //llamar al servicio de save ip y luego el de get para actualizar info

        //console.log('station')
        //console.log(this.selectedStationOnCombo)
        //console.log('ip')
        //console.log(this.ipNumber)
        //console.log('op station')
        //console.log(this.selectedOperatorPosition)

        let postJSON = {};
        
        postJSON = {
          "assetID": this.selectedStationOnCombo.ID,
          "id": 0,
          "ipAddress": this.ipNumber,
          "opPosition": this.selectedOperatorPosition
        };

        this.ipAssignmentService.createIpAssignment(postJSON)
        .subscribe(res => {
          if(res.error == 'false'){
            this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record created correctly"))
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

  edit(){
    if(this.ipNumber == this.oldIpNumber && this.selectedLineOnCombo.ID == this.oldLineID && this.selectedEnnOnCombo.ID == this.oldEnnID && this.selectedStationOnCombo.ID == this.oldStationID && this.selectedOperatorPosition == this.oldOpPosition){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("No changes detected"));
    }
    else{
      if(this.ipFormControl.errors != null ){
        if(this.ipFormControl.errors.pattern)
        this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("IP Not Valid"));
      }
      else{
        if(this.ipNumber == undefined || this.ipNumber == '' || this.selectedLineOnCombo == undefined || this.selectedEnnOnCombo == undefined || this.selectedStationOnCombo == undefined || this.selectedOperatorPosition == undefined){
          this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
        }
        else{
          //llamar servicio de update y luego el de get para actualizar info

          let postJSON = {};
        
          postJSON = {
            "assetID": this.selectedStationOnCombo.ID,
            "id": this.idToUpdate,
            "ipAddress": this.ipNumber,
            "opPosition": this.selectedOperatorPosition
          };

          //console.log('post json')
          //console.log(postJSON)

          this.ipAssignmentService.editIpAssignment(postJSON)
          .subscribe(res => {
            if(res.error == 'false'){
              this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record updated correctly"))
              this.refreshView();
              this.closeForm();
            }
            else{
              this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while updating the record"))
            }  
          });
        }
      }
    }
  }

}
