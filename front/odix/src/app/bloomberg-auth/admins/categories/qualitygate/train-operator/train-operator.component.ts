import { Component, OnInit } from '@angular/core';
import { TrainOperatorService } from './train-operator.service';
import Swal from 'sweetalert2';
import { AlertHelper } from '../alerts-helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-train-operator',
  templateUrl: './train-operator.component.html',
  styleUrls: ['./train-operator.component.scss']
})
export class TrainOperatorComponent implements OnInit {
  filter: any;
  isFormHidden: boolean = true;
  isEditing: boolean = false;
  isLoading: boolean = false;
  trainedUsersList: any;
  trainedUsersListFiltered: any;
  lineCombo: any = [];
  ennCombo: any = [];
  stationCombo: any = [];
  selectedLineOnCombo: any;
  selectedEnnOnCombo: any;
  selectedStationOnCombo: any;
  selectedOperatorPosition: any;
  timeReference: any;
  resultUserVisible: boolean = false;
  resultUserList: any;
  selectedUser: any;
  oldLineID: any;
  oldEnnID: any;
  oldStationID: any;
  oldOpPosition: any;
  p: number = 1;

  constructor(private trainOperatorService: TrainOperatorService, private alertHelper: AlertHelper, private translateService: TranslateService) {
    this.filter = {"name": '', "nameRegistered": ''};
  }

  ngOnInit() {
    this.getTrainedUsers();
    this.getAssets();
  }

  getTrainedUsers(){
    this.trainOperatorService.getTrainedUsers()
      .subscribe(res => {
        this.trainedUsersList = res;
        this.trainedUsersListFiltered = res;
      });
  }


  getAssets(){
    this.trainOperatorService.getStations()
      .subscribe(data => {
        this.processAssetsJson(data);
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

  editTraining(user: any){
    //console.log('user')
    //console.log(user)

    let refLine = this.lineCombo.find((x:any) => x.ID == user.lineID);
    let refEnn = this.ennCombo.find((x:any) => x.ID == user.ennID);
    let refStation = this.stationCombo.find((x:any) => x.ID == user.stationID);

    this.selectedLineOnCombo = refLine;
    this.selectedEnnOnCombo = refEnn;
    this.selectedStationOnCombo = refStation;
    this.selectedOperatorPosition = user.opPosition;

    this.isFormHidden = false;
    this.isEditing = true;
    this.selectedUser = user;
    this.filter.name = user.userName;

    this.oldLineID = user.lineID;
    this.oldEnnID = user.ennID;
    this.oldStationID = user.stationID;
    this.oldOpPosition = user.opPosition;
  }

  open() {
    this.resetFormVariables(1);
    this.isFormHidden = false;
  }

  closeForm(){
    this.isFormHidden = true;
    this.resetFormVariables(1);
    this.isEditing = false;
  }

  resetFormVariables(allVariables:any){
    this.selectedUser = undefined;
    if(allVariables == 1)
      this.filter.name = '';
    this.selectedLineOnCombo = undefined;
    this.selectedEnnOnCombo = undefined;
    this.selectedStationOnCombo = undefined;
    this.selectedOperatorPosition = undefined;

    this.oldLineID = undefined;
    this.oldEnnID = undefined;
    this.oldStationID = undefined;
    this.oldOpPosition = undefined;
  }

  filterTrainings(){
    let param = this.filter['nameRegistered'];
    if(param.length < 1) {
      this.trainedUsersListFiltered = this.trainedUsersList; 
    }else{
      this.trainedUsersListFiltered = this.trainedUsersList.filter((u:any) => u.userName.toUpperCase().includes(param.toUpperCase()) 
                                                                           || u.roleDescription.toUpperCase().includes(param.toUpperCase()) 
                                                                           || u.lineName.toUpperCase().includes(param.toUpperCase()) 
                                                                           || u.ennName.toUpperCase().includes(param.toUpperCase())
                                                                           || u.stationName.toUpperCase().includes(param.toUpperCase()) );
    }
  }

  performSearch(){
    clearTimeout(this.timeReference);
    this.timeReference = setTimeout(() => {
      let param = this.filter['name'];
      this.resultUserVisible = true;
      if(param.length < 3) {return;}
      this.isLoading = true;
      this.resetFormVariables(0);

        this.trainOperatorService.getUsers()
          .subscribe(res => {
            let allUsers = res;
            this.resultUserList = [];
            this.resultUserList = allUsers.filter((x:any) => x.status == 1 && x.roleID == 2 && x.name.toUpperCase().includes(param.toUpperCase()));
          });

      this.isLoading = false;
    
    }, 1000);
  }

  save(){
    //console.log(this.selectedUser)
    if(this.filter.name == '' || this.selectedLineOnCombo == undefined || this.selectedEnnOnCombo == undefined || this.selectedStationOnCombo == undefined || this.selectedOperatorPosition == undefined || this.selectedUser == undefined){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
    }
    else{
      //console.log('voy a insertar')
      //console.log('sel user')
      //console.log(this.selectedUser)
      //console.log('sel station')
      //console.log(this.selectedStationOnCombo)
      //console.log('sel op position')
      //console.log(this.selectedOperatorPosition)
      //llamar al servicio de save training y luego el de get para actualizar info

      this.trainOperatorService.createTrainedUser(this.selectedUser.id, this.selectedStationOnCombo.ID, this.selectedOperatorPosition)
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

  refreshView(){
    this.getTrainedUsers();
  }

  edit(){
    //console.log(this.selectedUser)
    if(this.selectedLineOnCombo.ID == this.oldLineID && this.selectedEnnOnCombo.ID == this.oldEnnID && this.selectedStationOnCombo.ID == this.oldStationID && this.selectedOperatorPosition == this.oldOpPosition){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("No changes detected"));
    }
    else{

      if(this.filter.name == '' || this.selectedLineOnCombo == undefined || this.selectedEnnOnCombo == undefined || this.selectedStationOnCombo == undefined || this.selectedOperatorPosition == undefined || this.selectedUser == undefined){
        this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
      }
      else{
        //console.log('voy a updatear')
        //console.log('sel user')
        //console.log(this.selectedUser)
        //console.log('sel station')
        //console.log(this.selectedStationOnCombo)
        //console.log('sel op position')
        //console.log(this.selectedOperatorPosition)
        //llamar servicio de update y luego el de get para actualizar info
  
        this.trainOperatorService.editTrainedUser(this.selectedUser.id, this.selectedStationOnCombo.ID, this.selectedOperatorPosition)
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

  closeSearch(){
    setTimeout(() => {
      this.resultUserVisible = false;
    }, 500);
  }

  selectUserCombo(user: any, index: any){
    this.selectedUser = user;
    this.filter.name = user.name;
    //console.log('selected user: ')
    //console.log(this.selectedUser)
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

  deleteTraining(training:any) {
    Swal.fire({
      title: this.translateService.instant("DELETE"),
      text: this.translateService.instant("Are you sure you want to delete the selected record?"),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant("Accept")
    }).then((result) => {
      if (result.value) {
        //llamar servicio de delete y volver a llamar el servicio que me traiga los trainings apra refreshear info
        //console.log('voy a borrar')
        //console.log('training')
        //console.log(training)
      
        this.trainOperatorService.deleteTrainedUser(training.id)
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
  
}
