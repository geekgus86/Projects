import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertHelper } from '../alerts-helper';
import { CreateOperatorService } from './create-operator.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-operator',
  templateUrl: './create-operator.component.html',
  styleUrls: ['./create-operator.component.scss']
})
export class CreateOperatorComponent implements OnInit {
  filter: any;
  usersList: any;
  roleList: any;
  usersListFiltered: any;
  isFormHidden: boolean = true;
  isEditing: boolean = false;
  timeReference: any;
  resultUserVisible: boolean = false;
  isLoading: boolean = false;
  resultUserList: any;
  plantList: any;
  selectedUser: any;
  createOperatorSelectedRole: any;
  userTadi: any;
  userRole: any;
  oldRoleID: any;
  p: number = 1;
  
  constructor(private createOperatorService: CreateOperatorService, private alertHelper: AlertHelper, private translateService: TranslateService) { 
    this.filter = {"name": '', "nameRegistered": ''};
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
    this.getPlants();
  }

  open() {
    this.resetFormVariables(1);
    this.isFormHidden = false; 
  }

  editUser(user: any){
    //console.log('user')
    //console.log(user)

    let refRole = this.roleList.find((x:any) => x.id == user.roleID);

    //console.log('refrole')
    //console.log(refRole)

    this.isFormHidden = false;
    this.isEditing = true;
    this.selectedUser = user;
    this.filter.name = user.name;
    this.userTadi = user.badge;
    this.userRole = refRole;
    this.oldRoleID = user.roleID;

  }

  closeForm(){
    this.isFormHidden = true;
    this.resetFormVariables(1);
    this.isEditing = false;
  }

  getUsers(){
    this.createOperatorService.getUsers()
      .subscribe(res => {
        this.usersList = res;
        this.usersListFiltered = res;
      });
  }

  getRoles(){
    this.createOperatorService.getRoles()
      .subscribe(res => {
        this.roleList = res;
      });
  }

  getPlants(){
    this.createOperatorService.getPlants().subscribe((res:any) => {
      //console.log(res);
      this.plantList = res;
    });
  }

  getPlantName(id:any){
    let plantObj = this.plantList.filter((plant:any) => plant.id == id)[0];
    let pName = plantObj ? plantObj.name : 'N/A';
    return pName;
  }

  filterUsers(){
    let param = this.filter['nameRegistered'];
    if(param.length < 1) {
      this.usersListFiltered = this.usersList; 
    }else{
      this.usersListFiltered = this.usersList.filter((u:any) => (u.name.toUpperCase().includes(param.toUpperCase())) 
                                                                || (u.badge.toUpperCase().includes(param.toUpperCase()))
                                                                || (u.roleDescription.toUpperCase().includes(param.toUpperCase())) );
    }
  }

  performSearch(){
    //console.log('rodrigo')
    clearTimeout(this.timeReference);
    this.timeReference = setTimeout(() => {
      let param = this.filter['name'];
      this.resultUserVisible = true;
      if(param.length < 2) {return;}
      this.isLoading = true;
      this.resetFormVariables(0);
      //console.log('rodrigo 2')
      this.createOperatorService.getUser(param).
      subscribe((res:any) => {
        //console.log("RESPUESTA DE SERVICIO GET USUARIO: ");
        this.isLoading = false;
        //console.log(res);
        this.resultUserList = res;
      });
    }, 1000);
  }

  closeSearch(){
    setTimeout(() => {
      this.resultUserVisible = false;
    }, 500);
  }

  selectUserCombo(user: any, index: any){
    this.selectedUser = user;
    this.filter.name = user.fullName;
    this.userTadi = user.tadi;
    //console.log('selected user: ')
    //console.log(this.selectedUser)
  }

  radioButtonSelectionChanged(role:any){
    this.createOperatorSelectedRole = role;
  }

  resetFormVariables(allVariables:any){
    this.selectedUser = undefined;
    if(allVariables == 1)
      this.filter.name = '';
    this.userTadi = undefined;
    this.userRole = undefined;
  }

  activateUser(user:any){
    this.createOperatorService.updateUser(user.id, 1, user.roleID)
      .subscribe(res => {
        if(res.error == 'false'){
          this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"),this.translateService.instant("Record activated correctly"))
          this.refreshView();
          this.closeForm();
        }
        else{
          this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while activating the record"))
        }  
      });  
  }

  save(){
    if(this.filter.name == '' || this.userRole == undefined){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
    }
    else{
      if(this.userTadi == undefined){
        this.alertHelper.showInfoMessage(this.translateService.instant("ERROR"), this.translateService.instant("User without badge, please update badge number in ODIX database"))
      }
      else{
        //llamar servicio de create y luego llamar servicio de get para actualizar info

        let postJSON = {};
        
        postJSON = {
          "odixUserID": this.selectedUser.id,
          "name": this.selectedUser.fullName,
          "badge": this.selectedUser.tadi,
          "roleID": this.createOperatorSelectedRole.id
        };

        //console.log('post json')
        //console.log(postJSON)

        this.createOperatorService.createUser(postJSON)
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
    if(this.oldRoleID == this.userRole.id){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("No changes detected"));
    }
    else{
      //llamar servicio de update y luego el de get para actualizar info

      //console.log('sel user')
      //console.log(this.selectedUser)

      //console.log('sel rol')
      //console.log(this.createOperatorSelectedRole)

      this.createOperatorService.updateUser(this.selectedUser.id, this.selectedUser.status, this.createOperatorSelectedRole.id)
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

  refreshView(){
     this.getUsers();
     this.getRoles();
  }

  deleteUser(user:any) {
    Swal.fire({
      title: this.translateService.instant("INACTIVATE"),
      text: this.translateService.instant("Are you sure you want to inactivate the selected record?"),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant("Accept")
    }).then((result) => {
      if (result.value) {
        //llamar servicio de delete y volver a llamar el servicio que me traiga los operadores apra refreshear info
        
        this.createOperatorService.updateUser(user.id, 0, user.roleID)
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
}
