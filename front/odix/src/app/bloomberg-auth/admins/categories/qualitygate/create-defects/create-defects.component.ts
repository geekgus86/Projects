import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import Swal from 'sweetalert2';
import { AlertHelper } from '../alerts-helper';
import { CreateDefectsService } from './create-defects.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-defects',
  templateUrl: './create-defects.component.html',
  styleUrls: ['./create-defects.component.scss']
})
export class CreateDefectsComponent implements OnInit {
  defectsList: any;
  defectsListFiltered: any;
  familyList: any;
  isFormHidden: boolean = true;
  isEditing: boolean = false;
  filter: any;
  timeReference: any;
  resultFamilyVisible: boolean = false;
  isLoading: boolean = false;
  resultFamilyList: any;
  selectedFamily: any;
  selectedDefect: any;
  familyName: any;
  color: any = '#ff00b5';
  defectCode: any;
  defectDescription: any;
  oldDefectCode: any
  oldDefectDescription: any;
  defectToEdit: any;
  newFamily: boolean = false;
  p: number = 1;

  constructor(private alertHelper: AlertHelper, private createDefectsService: CreateDefectsService, private translateService: TranslateService) {
    this.filter = {"name": '', "nameRegistered": ''};
   }

  ngOnInit() {
    this.getDefects();
    this.getFamilies();
  }

  getDefects(){
    this.createDefectsService.getDefects()
      .subscribe(res => {
        this.defectsList = res;
        this.defectsListFiltered = res;
      });
  }

  getFamilies(){
    this.createDefectsService.getFamilies()
      .subscribe(res => {
        this.familyList = res;
      });
  }

  open() {
    this.resetFormVariables();
    this.isFormHidden = false; 
  }

  closeForm(){
    this.isFormHidden = true;
    this.isEditing = false;
    this.resetFormVariables();
  }

  filterDefects(){
    let param = this.filter['nameRegistered'];
    if(param.length < 1) {
      this.defectsListFiltered = this.defectsList; 
    }else{
      this.defectsListFiltered = this.defectsList.filter((u:any) => u.defectDescription.toUpperCase().includes(param.toUpperCase()) 
                                                                 || u.defectCode.toUpperCase().includes(param.toUpperCase()) 
                                                                 || u.inspectionTypeDescription.toUpperCase().includes(param.toUpperCase()) );
    }
  }

  resetFormVariables(){
    this.selectedFamily = undefined;
    this.filter.name = '';
    this.familyName = undefined;
    this.defectCode = undefined;
    this.defectDescription = undefined;
    this.newFamily = false; 

    this.defectToEdit = undefined;
    this.oldDefectCode = undefined;
    this.oldDefectDescription = undefined;
  }

  performSearch(){
    //console.log('rodrigo')
    clearTimeout(this.timeReference);
    this.timeReference = setTimeout(() => {
      let param = this.filter['name'];
      this.resultFamilyVisible = true;
      if(param.length < 3) {return;}
      this.isLoading = true;
      //console.log('rodrigo 2')

      this.resultFamilyList = this.familyList.filter((u:any) => u.description.toUpperCase().includes(param.toUpperCase()));
      this.isLoading = false;
      this.familyName= undefined;
      this.selectedFamily = undefined;
    }, 1000);
  }

  familySelectionChanged(){
    this.color = this.selectedFamily.backgroundColor;
    this.familyName = this.selectedFamily.description;

    //console.log('sel family')
    //console.log(this.selectedFamily)
  }

  closeSearch(){
    //console.log('hola')
    if(this.selectedFamily == undefined){
      this.familyName= undefined;
      this.selectedFamily = undefined;
    }
    setTimeout(() => {
      this.resultFamilyVisible = false;
    }, 500);
  }

  selectUserCombo(family: any, index: any){
    this.selectedFamily = family;
    this.filter.name = family.description;
    this.color = family.backgroundColor;
  }

  changeColor($event: ColorEvent) {
    //console.log($event.color.hex);
    this.color = $event.color.hex;  
  }

  newFamilyClicked(){
    this.newFamily = true
    this.color = '#ff00b5';
    //console.log('color')
    //console.log(this.color)
  }

  activateDefect(defect:any){
    //llamar servicio de activate y volver a llamar el servicio que me traiga los operadores apra refreshear info

    //console.log('defect')
    //console.log(defect)

    this.createDefectsService.updateDefect(defect.defectID, defect.defectCode, defect.defectDescription, 1)
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

  refreshView(){
    this.getDefects();
    this.getFamilies();
  }

  deleteDefect(defect:any) {
    Swal.fire({
      title: this.translateService.instant("INACTIVATE"),
      text: this.translateService.instant("Are you sure you want to inactivate the selected record?"),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant("Accept")
    }).then((result) => {
      if (result.value) {
        //llamar servicio de delete y volver a llamar el servicio que me traiga los operadores apra refreshear info

        this.createDefectsService.updateDefect(defect.defectID, defect.defectCode, defect.defectDescription, 0)
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

  editDefect(defect: any){
    //console.log('defect')
    //console.log(defect)

    let refFamily = this.familyList.find((x:any) => x.id == defect.inspectionTypeID);

    //console.log('reffamily')
    //console.log(refFamily)

    this.isFormHidden = false;
    this.isEditing = true;
    this.selectedFamily = refFamily;
    this.defectToEdit = defect;
    this.familyName = defect.inspectionTypeDescription;
    this.selectedDefect = defect;
    this.filter.name = refFamily.description;
    this.defectCode = defect.defectCode;
    this.defectDescription = defect.defectDescription;

    this.oldDefectCode = defect.defectCode;
    this.oldDefectDescription = defect.defectDescription;
  }

  saveFamily(){
    //console.log('selected family')
    //console.log(this.selectedFamily)
    //console.log('family name')
    //console.log(this.familyName)
    //console.log('color')
    //console.log(this.color)

    if(this.familyName == '' || this.familyName == undefined || this.color == undefined ){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
    }
    else{

      let postJSON = {};
        
      postJSON = {
        "description": this.familyName,
        "backgroundColor": this.color,
        "foreColor": "#000000"
      };

      this.createDefectsService.createFamily(postJSON)
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

  saveDefect(){
    //console.log('def code')
    //console.log(this.defectCode)
    //console.log('def description')
    //console.log(this.defectDescription)

    if(this.selectedFamily == undefined || this.defectCode == undefined || this.defectDescription == undefined || this.defectCode == '' || this.defectDescription == '' ){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
    }
    else{

      this.createDefectsService.createDefect(this.selectedFamily.id, this.defectCode, this.defectDescription)
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

  edit(){

    //console.log('defect')
    //console.log(this.defectToEdit)
    //console.log('def code')
    //console.log(this.defectCode)
    //console.log('def description')
    //console.log(this.defectDescription)
    //console.log('OLD def code')
    //console.log(this.oldDefectCode)
    //console.log('OLD def description')
    //console.log(this.oldDefectDescription)
    
    if(this.defectCode == this.oldDefectCode && this.defectDescription == this.oldDefectDescription){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("No changes detected"));
    }
    else{
      if(this.defectCode == '' || this.defectDescription == ''){
        this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
      }
      else{
        this.createDefectsService.updateDefect(this.defectToEdit.defectID, this.defectCode, this.defectDescription, this.defectToEdit.status)
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
