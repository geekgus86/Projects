import { Component, OnInit } from '@angular/core';
import { ToolService } from './tool.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import Swal from 'sweetalert2';
import { I18nService} from '@app/core';
import { TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  dataAsset: any;

  dataTool: any;

  plantName: string

  action: string;
  objEdit: any;
  newAssets: any[];
  assetSelected: number;
  arrDelete: Set<number>;
  checkedAll: boolean;
  searchText: string;
  isLoading = false;
  allTools: any;
  p: number = 1;
  currentLanguage: string;

  //traducciones
  agregado: string;
  agregadodesc: string;
  yaexisth: string;
  alerta: string;
  correinfo: string;
  specname: string;
  veldisspec: string;
  minus50: string;
  jobspec: string;
  jobbig: string;
  spectool: string;
  strokegol: string;
  strokebig: string;
  pressper: string;
  jobexist: string;
  deletes: string;
  acept: string;
  tooldelete: string;
  deletereg: string;
  reallyreg: string;
  deleteregconf: string;
  editreg: string;
  modi: string;
  activar: string;
  actiexi: string;
  toolsuc: string;

  //Ocultar Menu 
  isFormHidden = true;

  constructor(private service: ToolService, private route: ActivatedRoute, private router: Router, private confirmationDialogService: ConfirmationDialogService ,public translateService: TranslateService, private i18nService: I18nService) {
    this.plantName = this.route.snapshot.paramMap.get('plantName');
    this.assetSelected = -1;

    this.currentLanguage = this.i18nService.language;
    this.translateService.use(this.currentLanguage);
    this.translateService.get('Agregado').subscribe((text:string) => {this.agregado = text;});
    this.translateService.get('Se agrego el registro correctamente.').subscribe((text:string) => {this.agregadodesc = text;});
    this.translateService.get('Ya existe esa Herramienta').subscribe((text:string) => {this.yaexisth = text;});
    this.translateService.get('Alerta').subscribe((text:string) => {this.alerta = text;});
    this.translateService.get('Corregir información').subscribe((text:string) => {this.correinfo = text;});
    this.translateService.get('Especifique el nombre').subscribe((text:string) => {this.specname = text;});
    this.translateService.get('Especifique la velocidad de diseño, este campo es requerido y no se permiten negativos').subscribe((text:string) => {this.veldisspec = text;});
    this.translateService.get('La velocidad de diseño tiene un valor muy grande, debe ser menor que 50').subscribe((text:string) => {this.minus50 = text;});
    this.translateService.get('Especifique en número del job, este campo es requerido y no se permiten negativos').subscribe((text:string) => {this.jobspec = text;});
    this.translateService.get('Número de job tiene un valor muy grande, debe ser menor que 1000000').subscribe((text:string) => {this.jobbig = text;});
    this.translateService.get('Especifique el tipo de herramienta').subscribe((text:string) => {this.spectool = text;});
    this.translateService.get('Especifique las piezas por golpe, este campo es requerido y no se permiten negativos').subscribe((text:string) => {this.strokegol = text;});
    this.translateService.get('Piezas por golpe tiene un valor muy grande, debe ser menor que 50').subscribe((text:string) => {this.strokebig = text;});
    this.translateService.get('Especifique la prensa a la que pertenece').subscribe((text:string) => {this.pressper = text;});
    this.translateService.get('Este Job Number ya existe con otra herramienta en esta prensa').subscribe((text:string) => {this.jobexist = text;});
    this.translateService.get('Eliminar').subscribe((text:string) => {this.deletes = text;});
    this.translateService.get('Aceptar').subscribe((text:string) => {this.acept = text;});
    this.translateService.get('Realmente desea eliminar la herramienta: ').subscribe((text:string) => {this.tooldelete = text;});
    this.translateService.get('Se elimino el registro.').subscribe((text:string) => {this.deletereg = text;});
    this.translateService.get('Realmente desea eliminar los registros seleccionados?').subscribe((text:string) => {this.reallyreg = text;});
    this.translateService.get('Se eliminaron los registros seleccionados.').subscribe((text:string) => {this.deleteregconf = text;});
    this.translateService.get('Modificar').subscribe((text:string) => {this.modi = text;});
    this.translateService.get('Realmente desea editar el registro seleccionado?').subscribe((text:string) => {this.editreg = text;});
    this.translateService.get('Activar').subscribe((text:string) => {this.activar = text;});
    this.translateService.get('Se activo Exitosamente.').subscribe((text:string) => {this.actiexi = text;});
    this.translateService.get('Herramienta modificada exitosamente').subscribe((text:string) => {this.toolsuc = text;});   
  }

  setSearchText(event:any){
    this.searchText = event.target.value;
  }

  ngOnInit() {
    this.getAsset();
    this.getToolsByLocation();
    this.objEdit = {};
    this.checkedAll = false;
    this.arrDelete = new Set();
  }

  getAsset() {
    this.isLoading = true;
    this.service.getAsset(this.plantName).subscribe(res => {
      this.dataAsset = new Array();
      this.dataAsset = res;
      this.isLoading = false;
    });
  }

  changeAsset(id: number) {
    this.getToolsByAsset(id);
  }

  changeRadioAsset(id: number) {
    this.objEdit.assetId = id;
  }

  changeRadioType(id: number) {
    this.objEdit.toolType = id;
  }

  checkAll() {
    this.checkedAll = !this.checkedAll;
    this.arrDelete = new Set();
    for (var i = 0, item; item = this.dataTool[i++];) {
      let searsh = this.existeSearsg(item.descTool) || this.existeSearsg(item.jobNumber);
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
    let val = value.toString();
    let srh = this.searchText.toString();
    return val.toLowerCase().indexOf(srh.toLowerCase()) >= 0
  }

  selectCheckMultiple(id: number) {
    if (this.arrDelete.has(id)) {
      this.arrDelete.delete(id);
    } else {
      this.arrDelete.add(id);
    }
    this.checkedAll = (this.arrDelete.size == this.dataTool.length);
  }

  getToolsByAsset(idAsset: number) {
    if (idAsset <= 0) {
      this.getToolsByLocation();
    } else {
      this.service.getTool(idAsset).subscribe(res => {
        this.dataTool = new Array();
        this.dataTool = res;
        this.arrDelete = new Set();
        this.checkedAll = false;
        this.arrDelete.clear;
      });
    }
  }

  getToolsByLocation() {    
    this.isLoading = true;
    this.service.getToolsByLocation(this.plantName).subscribe(res => {
      this.dataTool = new Array();
      this.allTools = new Array();
      this.dataTool = res;
      this.allTools = res;
      this.arrDelete = new Set();
      this.checkedAll = false;
      this.arrDelete.clear;
      this.isLoading = false;
    });
  }

  save() {
    let message = this.validate(this.objEdit, true);
    if (message == "") {
      this.isLoading = true;
      this.objEdit.assets = this.newAssets
        .filter(opt => opt.checked)
        .map(opt => opt.id);
      this.objEdit.location = this.plantName;
      this.service.save(this.objEdit).subscribe(res => {
        this.isLoading = false;

        if (res.code == 0) {
          this.showMessage(this.agregado, this.agregadodesc);
          this.changeAsset(this.assetSelected);
          this.cancel();
        } else if(res.code == 1){
          Swal.fire(this.alerta , res.message, "info");
          this.changeAsset(this.assetSelected);
          this.searchText = this.objEdit.name
          this.cancel();
        } 
        else if(res.code == 2){ // no se agrego
          Swal.fire(this.alerta , this.yaexisth, "info");
          this.searchText = this.objEdit.descTool
          this.cancel();
        } 
        // else if(res.code == 2)
        // {
        //   Swal.fire("Corregir información" , res.message, "info");
        // }
      });
    } else {      
      Swal.fire(this.correinfo , message, "info");
    }
  }

  validate(object: any, isNew: boolean) {
    let message = "";
    if (object.descTool == null || object.descTool.trim == "") {
      message = this.specname;
    } else if (object.designSpeed == null || Number.isNaN(object.designSpeed) || object.designSpeed < 0){
      message = this.veldisspec;
    }else if(object.designSpeed > 50){
      message = this.minus50;
    } else if (object.jobNumber == null || Number.isNaN(object.jobNumber) || object.jobNumber < 0) {
      message = this.jobspec;
    }else if(object.jobNumber > 1000000){
      message = this.jobbig;
    }/*else if (object.toolType == null || Number.isNaN(object.toolType)) {
      message = "Especifique el tipo de herramienta";
    }*/ else if (object.pzPerStroke == null || Number.isNaN(object.pzPerStroke) || object.pzPerStroke < 0) {
      message = this.strokegol;
    } else if(object.pzPerStroke > 50){
        message = this.strokebig;
    } else if (isNew && this.newAssets.filter(opt => opt.checked).map(opt => opt.id).length == 0) {
      message = this.pressper;
    }
    if(isNew){
      let ass = this.newAssets.filter(opt => opt.checked).map(opt => opt.id);
      this.allTools.forEach((el:any) => {
        ass.forEach(as => {
          if((el.jobNumber == object.jobNumber) && (el.assetId == as)){
            message = this.jobexist;
            return;
          }
        });
      });
    }else{
      var tmpTools = this.allTools.slice();
      tmpTools.forEach( (item:any, index:any) => {
        if(item.id == object.id) tmpTools.splice(index,1);
      });
      tmpTools.forEach((el:any) => {
        if((el.jobNumber == object.jobNumber) && (el.assetId == object.assetId)){
          message = this.jobexist;
          return;
        }
      });
    }
    console.log(this.allTools);
    return message;
  }

  delete(id: number, nombre: string) {
    Swal.fire({
      title: this.deletes,
      text: this.tooldelete + nombre + "?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.acept
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.service.update(this.objEdit)
          .subscribe(res => {
            this.service.delete(id).subscribe(res => {
              this.showMessage(this.deletes,this.deletereg);
              this.changeAsset(this.assetSelected);
              this.isLoading = false;
            });
          });
      }
    });
  }

  deleteSelected() {
    Swal.fire({
      title: this.deletes,
      text: this.reallyreg,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.acept
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.service.update(this.objEdit)
          .subscribe(res => {
            this.service.deleteMultiple(this.arrDelete).subscribe(res => {
              this.showMessage(this.deletes, this.deleteregconf);
              this.changeAsset(this.assetSelected);  
              this.isLoading = false;
            });
          });
      }
    });
  }

  edit() {
    let message = this.validate(this.objEdit, false);
    if (message == "") {
      Swal.fire({
        title: this.modi,
        text: this.editreg,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: this.acept
      }).then((result) => {
        if (result.value) {
          this.isLoading = true;
          /*if(this.objEdit.toolType == '2'){
            this.objEdit.noRollo = '';
          }*/
          this.service.update(this.objEdit)
            .subscribe(res => {
              if (res.code == 0) {
                this.showMessage(this.modi, this.toolsuc);
                this.changeAsset(this.assetSelected);
                this.cancel();
                this.isLoading = false;
              } else {
                this.showErrorMessage("Error" , res.message);
              }
            });
        }
      });
    } else {
      Swal.fire(this.correinfo , message, "info");
    }
  }

  show_new() {
    this.action = 'new';
    this.objEdit = {};
    this.changeRadioType(1)
    this.newAssets = this.dataAsset.slice();
    this.newAssets.forEach(asset => {
      asset.checked = false;
    });
    if (this.assetSelected > 0) {
      this.newAssets = this.newAssets.filter(asset => asset.id == this.assetSelected);
      this.newAssets[0].checked = true;
    }
    //$('.formsContainer').show();
    this.isFormHidden = false;
  }

  show_edit(obj: any) {
    this.action = 'edit';
    this.isFormHidden = false;
    this.objEdit = Object.assign({}, obj);
    this.changeRadioType(obj.toolType);
    //$('.formsContainer').show();
  }

  cancel() {
    //$('.formsContainer').hide();
    this.isFormHidden = true;
  }

  showMessage(title: string, message: string) {
    Swal.fire({
      title: title, 
      text: message, 
      type: "success"
    });
  }

  showErrorMessage(title: string, message: string) {
    Swal.fire({
      title: title, 
      text: message, 
      type: "error"
    });
  }
 

  active(id: number, nombre: string) {
        this.isLoading = true;
        this.service.active(id).subscribe(res => {
          this.showMessage(this.activar,this.actiexi);
          this.changeAsset(this.assetSelected);
          this.isLoading = false;
        });


  }



}
