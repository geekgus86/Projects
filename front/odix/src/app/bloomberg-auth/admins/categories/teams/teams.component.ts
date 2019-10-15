import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TeamsService } from './teams.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import Swal from 'sweetalert2';
import { I18nService} from '@app/core';
import { TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  dataEscalation:any;
  dataArea:any;
  dataRegla:any;
  dataAsset:any;
  dataIssue:any;

 //parametros servicio
  id:number
  userId:number
  escalationRuleId:number;
  escalationTypeId:number;
  idAsset:number;

  /*Autocomplete */
  acHidden = true;
  acNotFound = true;
  listCombo: any= [];
  stationListData: any=[];
  // searchParam = 0;

  action:string;
  plantName:string;

  objectEdit: any;


  //new
  newAssets: any[];



  //delete all
  arrDelete: Set<number>;
  assetSelected: number;
  checkedAll: boolean;

//autocomplete
 resultUserVisible = false;
 timeReference: any;
 filter: any;
 resultUserList:any;
 disabledName = false;
 succ:boolean=true
 
//  file: any;
  disabledA:boolean;
  searchText: string;

  isLoading = false;
  p: number = 1;

 //Ocultar Menu 
  isFormHidden = true;

  currentLanguage: string;
  deletes: string;
  actexist: string;
  addexist: string;
  seus: string; 
  reesc: string;
  esarea: string;
  esissue: string;
  selpress: string;
  numtadi: string;
  regcar: string;
  actexi: string;
  eliexi: string;
  operexi: string;
  reallyreg: string;
  acept: string;


  constructor(private service:TeamsService,private route: ActivatedRoute, private confirmationDialogService: ConfirmationDialogService, public translateService: TranslateService, private i18nService: I18nService) { 
    this.plantName = this.route.snapshot.paramMap.get('plantName'); 
    this.filter = {"name": '', "nameRegistered": ''};
    this.dataRegla = [],
    this.dataArea = []

    var object = new Object();
    object['name'] = '';
    object['email'] = '';
    object['tadi'] = '';
    object['issueTypeId'] = '';
    object['escalationTypeId'] = '';
    object['escalationRuleId'] = '';
    this.objectEdit = object


    // this.file.name ="adap";

    this.currentLanguage = this.i18nService.language;
    this.translateService.use(this.currentLanguage);
    this.translateService.get('Eliminar').subscribe((text:string) => {this.deletes = text;});
    this.translateService.get('Activación exitosa.').subscribe((text:string) => {this.actexist = text;});
    this.translateService.get('Se agrego exitosamente').subscribe((text:string) => {this.addexist = text;});
    this.translateService.get('Seleccione un usuario').subscribe((text:string) => {this.seus = text;});
    this.translateService.get('Especifique la Regla de escalamiento').subscribe((text:string) => {this.reesc = text;});
    this.translateService.get('Especifique el Area').subscribe((text:string) => {this.esarea = text;});
    this.translateService.get('Especifique el Issue').subscribe((text:string) => {this.esissue = text;});
    this.translateService.get('Seleccione una prensa').subscribe((text:string) => {this.selpress = text;});
    this.translateService.get('Necesita tener un número de Tadi').subscribe((text:string) => {this.numtadi = text;});
    this.translateService.get('Ya existe un registro con esas características').subscribe((text:string) => {this.regcar = text;});
    this.translateService.get('Actualizacion exitosa.').subscribe((text:string) => {this.actexi = text;});
    this.translateService.get('Eliminacion exitosa.').subscribe((text:string) => {this.eliexi = text;});
    this.translateService.get('Operacion exitosa.').subscribe((text:string) => {this.operexi = text;});
    this.translateService.get('Realmente desea eliminar los registros seleccionados?').subscribe((text:string) => {this.reallyreg = text;});
    this.translateService.get('Aceptar').subscribe((text:string) => {this.acept = text;});
 

  }

  setSearchText(event:any){
    this.searchText = event.target.value;
  }

  ngOnInit() {
    this.assetSelected = -1;
    this.getTeams( this.assetSelected );
    this.getAsset();
    this.getIssue(1);
    this.getArea();
    this.checkedAll = false;
    this.arrDelete = new Set();

  }



  getAsset(){
    this.service.getAsset(this.plantName) .subscribe(res => {
      this.dataAsset = new Array();
      this.dataAsset = res;
      console.log("***** load Asset *****");
      console.log(res)
    });
  }


  comboSearch(id: number){
    this.getTeams(id);
  }

  activate(itemId:any){
    this.service.activate(itemId).subscribe(res => {
      this.dialogAlert(this.actexist);
      this.getTeams(this.assetSelected);
    });
  }


  getTeams(idAsset:number){
    this.isLoading = true;
    this.service.getTeams(idAsset,this.plantName) .subscribe(res => {
      this.dataEscalation= new Array();
      this.dataEscalation =res;
      console.log("***** load Teams *****");
      console.log(res)
      this.isLoading = false;
    });
  }


  getIssue(idAsset:number){
    this.service.getIssue(idAsset) .subscribe(res => {
      this.dataIssue = new Array();
      this.dataIssue = res;
      this.objectEdit.issueTypeId = res[0].id;
      console.log("***** load Issue *****");
      console.log(res)
    });

  }


  
  getArea(){
    this.service.getArea() .subscribe(res => {
      console.log("***** load Area *****");
      console.log(res);
      this.dataArea = new Array();
      this.dataArea = res;
      this.objectEdit.escalationTypeId = res[0].id;
      this.getRegla( this.dataArea[0].id ) 
    });

  }




  getRegla(idArea:number){
    this.escalationTypeId =idArea;
    this.service.getRegla(idArea) .subscribe(res => {
      this.dataRegla = new Array();
      this.dataRegla = res;
      this.objectEdit.escalationRuleId = res[0].id;
      console.log("***** load Regla *****");
      console.log(res)
    });
  }


  new_(action:string){
    this.action = action;
    this.disabledName = false;

    this.objectEdit = {};
    this.filter.name = "";
    this.objectEdit.email = "";
    this.objectEdit.tadi = null;



    this.filterAsset(-1);
    this.getIssue(1);
    this.getArea();
    //$('.formsContainer').show();
    this.isFormHidden = false;
  }


  filterAsset(AssetId:number){
    this.newAssets = this.dataAsset.slice();
    this.disabledA = false;

    let check = true;
    if(AssetId<=0){
      check =false;
    }

    this.newAssets.forEach(asset => {
      asset.checked = check;
    });



    if (this.assetSelected > 0) {
      this.newAssets.forEach(asset => {
        asset.checked = true;
      });
      this.newAssets = this.newAssets.filter(asset => asset.id == this.assetSelected);
      this.disabledA = true;
    }
  }


  edit_(obj: any,Action:string){
    this.action = Action;
    this.disabledName = true;
    this.isFormHidden = false;

      this.service.getRegla(obj.escalationTypeId) .subscribe(res => {
        let dataReglaAux = new Array();
        this.dataRegla = new Array();

        this.objectEdit = obj;
        this.filter.name = obj.name;
        this.objectEdit.escalationRuleId = obj.escalationRuleId;
        this.objectEdit.assetID = obj.assetID;

        res.forEach((element: any) => {
          element.escalationRuleId = element.id;
          dataReglaAux.push(element);
        });

        this.dataRegla =dataReglaAux;
 
      });
     //$('.formsContainer').show();

    
  }

  cancel(){
    this.action = 'new';
    // $('.formsContainer').hide();
    this.isFormHidden = true;
  }

  save() {

    if( this.action == 'new'){

        this.objectEdit.assets = this.newAssets.filter(opt => opt.checked).map(opt => opt.id);
        this.objectEdit.location = this.plantName;

        let message = this.validar(this.objectEdit, true);



        if (message == "") {
            this.service.save(this.objectEdit).subscribe(res => {
              if (res.code == 0) {
                this.getTeams(this.assetSelected);
                this.cancel();
                this.dialogAlert(this.addexist);
              } else {
                // alert("Error: " + res.message)
                this.dialogInfo(res.message);
              }
            });

      } else {
        this.dialogInfo(message);
      }




    }else if( this.action == 'edit'){
      this.update(this.objectEdit);

    }


  }



  validar(object: any, isNew: boolean) {
    let message = "";
    if (this.objectEdit.userId == null || object.userId.trim == "") {
      message = this.seus;
    } else if (object.escalationRuleId == null || Number.isNaN(object.escalationRuleId)) {
      message = this.reesc;
    } else if (object.escalationTypeId == null || Number.isNaN(object.escalationTypeId)) {
      message = this.esarea;
    } else if (object.issueTypeId == null || Number.isNaN(object.issueTypeId)) {
      message = this.esissue;
    } else if (object.assets.length == 0 ) {
      message = this.selpress;
    } else if (this.objectEdit.tadi == null || object.tadi.trim == "") {
      message = this.numtadi;
    } 
    return message;
  }



    
  update(obj: any){
    this.service.update(obj) 
    .subscribe(res => {
      console.log("***** Update Escalation *****");
      this.getTeams(this.assetSelected);
      this.cancel();
      if(res.error.message.includes('ConstraintViolationException')){
        this.dialogInfo(this.regcar);
      }else{
        this.dialogAlert(this.actexi);
      }
      
    });
  }



  delete(id: number) {


    Swal.fire({
      title: this.deletes,
      text: this.reallyreg,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.acept
    }).then((result) => {
      if (result.value) {

          this.service.delete(id) .subscribe(res => {
            console.log("***** Delete Teams *****");
            console.log(res);
            this.getTeams(this.assetSelected);
            this.dialogAlert(this.eliexi);
          });
      
        }
    });
    


  
  }




  closeOptions(){
    setTimeout(() => {
      this.acHidden = true;
      this.acNotFound = true;
    }, 200);
  }


//Delete all
checkAll() {
  //let textsearsh = this.searchText.nativeElement.value;
  
  this.checkedAll = !this.checkedAll;
  this.arrDelete = new Set();
  for (var i = 0, item; item = this.dataEscalation[i++];) {
    let searsh = this.existeSearsg(item.email) || this.existeSearsg(item.name) || this.existeSearsg(item.username) || this.existeSearsg(item.tadi) || this.existeSearsg(item.issueTypeDesc);
    //console.log(this.searchText, searsh)
    if (this.checkedAll && searsh) {
      this.arrDelete.add(item.id);
    }
    if(searsh || this.checkedAll == false){
      item.checked = this.checkedAll;
    }
  }
}

existeSearsg(value:string){
  if(value == null || value == undefined || this.searchText == undefined){
    return true
  }
  return value.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0
}

selectCheckMultiple(id: number) {
  if (this.arrDelete.has(id)) {
    this.arrDelete.delete(id);
  } else {
    this.arrDelete.add(id);
  }
  this.checkedAll = (this.arrDelete.size == this.dataEscalation.length);
}



//change select option  
  changeIssue(idIssue: number){
    this.objectEdit.issueTypeId = idIssue;
  }

  changeArea(idArea: number){
    this.objectEdit.escalationTypeId = idArea;
    this.getRegla(idArea);
  }

  changeRegla(idRegla: number){
    this.objectEdit.escalationRuleId = idRegla;
  }

  changeAsset(idAsset:any){
    //$('.formsContainer').hide();
    this.isFormHidden = true;
    this.getIssue(1);
    this.getArea();

    this.filterAsset(idAsset);
    this.getTeamByAsset(idAsset);
  }


  //autocomple
  closeSearch(){
    setTimeout(() => {
      this.resultUserVisible = false;
    }, 500);
  }
  

  performSearch(){
    clearTimeout(this.timeReference);
    this.timeReference = setTimeout(() => {
      let param = this.filter['name'];
      this.resultUserVisible = true;
      if(param.length < 3) {return;}
      this.service.getUser(param).
      subscribe((res:any[]) => {
        console.log("RESPUESTA DE SERVICIO GET USUARIO: ");
        let es = res.filter(e => e.enabled == '1');
        console.log(es);
        this.resultUserList = es;
        // this.setDataGrid(res);
      });
    }, 1000);
    
  }


  selectUser(user: any, index: any){
    this.filter.name = user.fullName;
    this.objectEdit.userId = user.id;
    this.objectEdit.email = user.email;
    this.objectEdit.tadi = user.tadi;
    this.objectEdit.fullName = user.fullName;
  }


  //Filter for Asset
  getTeamByAsset(idAsset: number) {
    this.getTeams(idAsset);
    this.arrDelete = new Set();
    this.checkedAll = false;
    this.arrDelete.clear;
  }


  //Eliminar todo
  deleteSelected() {
    Swal.fire({
      title:  this.deletes,
      text: this.reallyreg,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.acept
    }).then((result) => {
      if (result.value) {

          this.service.deleteMultiple(this.arrDelete).subscribe(res => {
            this.changeAsset(this.assetSelected);
            this.getTeams(this.assetSelected);
            this.dialogAlert(this.eliexi);

          });
      
        }
    });
  }


  
dialogAlert(msg:string){
  Swal.fire(this.operexi, msg, 'success');
}

dialogInfo(msg:string){
  Swal.fire(msg, '', 'info');
}






}
