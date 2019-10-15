import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminUserService } from './admin-user.service';
import { TippyService } from 'ng-tippy';
import { Subject } from 'rxjs/Subject';
import * as Rx from 'rxjs/Rx';
import Swal from 'sweetalert2';
import { I18nService} from '@app/core';
import { TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit, OnDestroy {
  filter: any;
  resultUserList:any;
  registeredUsersList:any;
  registeredUsersListOriginal: any;
  timeReference: any;
  selectedUser: any;
  selectedUserTbl: any;
  isFormHidden = true;
  resultUserVisible = false;
  userName = '';
  generatedPassword = '';
  locationId = 1;
  localeList: any;
  plantList: any; //[{id: "1", name: "Apodaca"}, {id: "2", name: "Etown"}];
  isLoading = false;
  formPasswordVisible = false;
  tadi = '';
  isEditing= false;
  formDeleteVisible = false;
  deleteUser_:any;
  p: number = 1;
  password_input = '';
  new_password_input = '';
  currentLanguage: string;
  
  opexi: string;
  userexi: string;
  userreg: string;
  opernexit: string;
  contexi: string;
  cuatrochar: string;
  contbad: string;
  passemp: string;
  passbad: string;
  userdes: string;

  constructor( private route: ActivatedRoute, private userService: AdminUserService,public translateService: TranslateService, private i18nService: I18nService) { 
    this.filter = {"name": '', "nameRegistered": ''};

    this.currentLanguage = this.i18nService.language;
    this.translateService.use(this.currentLanguage);

    this.translateService.get('Operacion exitosa.').subscribe((text:string) => {this.opexi = text;});
    this.translateService.get('Usuario ya existe.').subscribe((text:string) => {this.userexi = text;});
    this.translateService.get('Usuario registrado.').subscribe((text:string) => {this.userreg = text;});
    this.translateService.get('Operacion no exitosa.').subscribe((text:string) => {this.opernexit = text;});
    this.translateService.get('Contraseña actualizada correctamente.').subscribe((text:string) => {this.contexi = text;});
    this.translateService.get('La contraseña debe contener 4 caracteres como mínimo.').subscribe((text:string) => {this.cuatrochar = text;});
    this.translateService.get('La contraseña no pudo ser actualizada.').subscribe((text:string) => {this.contbad = text;});
    this.translateService.get('Password Vacio').subscribe((text:string) => {this.passemp = text;});
    this.translateService.get('Password Erróneo').subscribe((text:string) => {this.passbad = text;});
    this.translateService.get('Usuario desactivado exitosamente.').subscribe((text:string) => {this.userdes = text;});
  
  }

  ngOnInit() {
    console.log('entro a user')
    this.randomPassword();
    this.fetchRegisteredUsers();
    this.fetchPlantList();
    this.fetchLocationList();
  }

  open()
  {
    this.isFormHidden = false;
    this.randomPassword();
  }

  fetchPlantList(){
    this.userService.getPlants().subscribe(res => {
      console.log("PLANTS",res);
      this.plantList = res;

    });
  }

  fetchLocationList(){
    this.userService.getLocations().subscribe(res => {
      console.log("LOCATIONS",res);
      this.localeList = res;
    });
  }

  fetchRegisteredUsers(){
    this.filter.nameRegistered = '';
    this.userService.getRegistered().subscribe(res => {
      console.log("RESPUESTA DE SERVICIO GET REGISTRADOS: ");
      console.log(res);
      this.registeredUsersListOriginal = res;
      this.registeredUsersList = res;
    });
  }

  randomPassword() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < 8; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    this.generatedPassword = pass;
}

copyMessage(val: string){
  let selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}

saveUser(password:any){
  if(password!='N/A'){
    this.generatedPassword = password;
  }
    var doSave = true;
    if(this.userName && ( this.userName.length >= 5 )){
      let us = this.selectedUser;
      let userToSave = {
        id: us.id, name: us.fullName, email:us.email, username: this.userName, tadi: this.tadi,
        password_digest: this.isEditing ? null : this.generatedPassword, location: this.locationId, appId: 1, appUserId: 0
      };
      if(!this.isEditing){
        this.registeredUsersList.forEach((el:any) => {
          if(el.username==this.userName){
            Swal.fire(this.opernexit, this.userexi, 'error');
            doSave = false;
          }
        });
      }else{
        var tmpUs = this.registeredUsersList.slice();
        tmpUs.forEach( (item:any, index:any) => {
          if(item.id == us.id) tmpUs.splice(index,1);
        });
        tmpUs.forEach((el:any) => {
          if(el.username==this.userName){
            Swal.fire(this.opernexit, this.userexi, 'error');
            doSave = false;
          }
        });
      }
      if(doSave){
        this.isLoading = true;
        this.userService.saveAppUser(userToSave).subscribe(res => {
          this.isLoading = false;
          this.closeForm();
          this.fetchRegisteredUsers();
          Swal.fire(this.opexi, this.userreg, 'success');
        });
      }
      
    }
  }

  performSearch(){
    clearTimeout(this.timeReference);
    this.timeReference = setTimeout(() => {
      let param = this.filter['name'];
      this.resultUserVisible = true;
      if(param.length < 3) {return;}
      this.isLoading = true;
      this.userService.getUser(param).
      subscribe(res => {
        console.log("RESPUESTA DE SERVICIO GET USUARIO: ");
        this.isLoading = false;
        console.log(res);
        this.resultUserList = res;
      });
    }, 1000);
    
  }

  filterRegisteredUsers(){
      let param = this.filter['nameRegistered'];
      if(param.length < 1) {
        this.registeredUsersList = this.registeredUsersListOriginal; 
      }else{
        this.registeredUsersList = this.registeredUsersListOriginal.filter((u:any) => u.fullName.toUpperCase().includes(param.toUpperCase()));
      }
  }

  closeSearch(){
    setTimeout(() => {
      this.resultUserVisible = false;
    }, 500);
  }

  closeForm(){
    this.isFormHidden = true;
    this.userName = '';
    this.isEditing = false;
    this.filter.name = '';
    this.selectedUser = null;
    this.tadi='';
  }

  selectUserCombo(user: any, index: any){
    this.selectedUser = user;
    this.filter.name = user.fullName;

    // this.isLoading = true;
    // this.userService.validateAD(user.email).subscribe(res => {
    //   this.isLoading = false;
    //   console.log("RESPUESTA DE SERVICIO VALIDAR AD: ");
    //   console.log(res);
    //   if(res){
    //     Swal.fire('Usuario cuenta con AD.', 'El usuario está registrado en AD.', 'warning');
    //   }else{
    //     this.selectedUser = user;
    //     this.filter.name = user.fullName;
    //   }
    // });
  }

  editUser(user: any, index: any){
    console.log(user);
    this.userName = user.username;
    this.locationId = user.location;
    this.isFormHidden = false;
    this.isEditing = true;
    this.selectedUser = user;
    this.tadi = user.tadi;
    this.filter.name = user.fullName;
  }

  changePasswordModal(user: any, index: any){
    //this.randomPassword();
    this.selectedUserTbl = user;
    console.log(this.selectedUserTbl);
    this.formPasswordVisible = true;
  }

  savePassword(password: any){
    this.generatedPassword = password
    this.formPasswordVisible = false;
    this.isLoading = true;
    let us = this.selectedUserTbl;
    let userToSave = {id: us.id, tadi: us.tadi, username: us.username,
      name: us.fullName, email:us.email,
      password_digest: this.generatedPassword, localeID: us.location, appId: 1, appUserId: 0
    };
    if(password){
      if(password.length >= 4){
        this.userService.saveAppUser(userToSave).subscribe(res => {
          this.isLoading = false;
          this.fetchRegisteredUsers();
          Swal.fire(this.opexi,this.contexi, 'success');
        });
        this.password_input = '';
      }else{
        this.isLoading = false;
        Swal.fire(this.passbad, this.cuatrochar, 'error');
      }
    }else{
        this.isLoading = false;
        Swal.fire(this.passemp, this.contbad, 'error');
    }
  }

  deleteUser(){
    this.formDeleteVisible = false;
    this.isLoading = true;
    let userToSave = {
      id: this.deleteUser_.id, username: this.deleteUser_.username
    };
    this.userService.deleteUser(userToSave).subscribe(res => {
      this.isLoading = false;
      this.selectedUser = null;
      this.fetchRegisteredUsers();
      Swal.fire(this.opexi, this.userdes, 'success');
    });
  }

  openDeleteForm(user: any, index: any){
    this.formDeleteVisible = true;
    this.deleteUser_ = user;
  }

  getPlantName(id:any){
    let plantObj = this.plantList.filter((plant:any) => plant.id == id)[0];
    let pName = plantObj ? plantObj.name : 'N/A';
    return pName;
  }

  getLocaleName(id:any){
    let localeObj = this.localeList.filter((locale:any) => locale.id == id)[0];
    let pName = localeObj ? localeObj.language : 'N/A';
    return pName;
  }


  ngOnDestroy(){
  }

  

}
