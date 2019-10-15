import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateItemsService } from './create-items.service';
import { AlertHelper } from '../alerts-helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.scss']
})
export class CreateItemsComponent implements OnInit {
  itemsList: any;
  itemsListFiltered: any;
  familyList: any;
  filter: any;
  isFormHidden: boolean = true;
  isEditing: boolean = false;
  isLoading: boolean = false;
  timeReference: any;
  lineCombo: any = [];
  selectedLineOnCombo: any;
  selectedFamilyOnCombo: any;
  itemName: any;
  itemDescription: any;
  oldLineId: any;
  oldFamilyId: any;
  oldItemName: any;
  oldItemDescription: any;
  p: number = 1;

  constructor(private createItemsService: CreateItemsService, private alertHelper: AlertHelper, private translateService: TranslateService) {
    this.filter = {"name": '', "nameRegistered": ''};
  }

  ngOnInit() {
    this.getItems();
    this.getFamilies();
    this.getAssets();
  }

  getItems(){
      this.createItemsService.getItems()
        .subscribe(res => {
          this.itemsList = res.inspectionPoints;
          this.itemsListFiltered = res.inspectionPoints;
        });
  }

  getFamilies(){
    this.createItemsService.getFamilies()
      .subscribe(res => {
        this.familyList = res;
      });
  }

  getAssets(){
    this.createItemsService.getStations()
      .subscribe(data => {
        this.processAssetsJson(data);
      });
  }

  processAssetsJson(json: any){
    this.lineCombo = [];

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
    });
  }

  filterItems(){
    let param = this.filter['nameRegistered'];
    if(param.length < 1) {
      this.itemsListFiltered = this.itemsList; 
    }else{
      this.itemsListFiltered = this.itemsList.filter((u:any) => u.number.toUpperCase().includes(param.toUpperCase()) 
                                                             || u.description.toUpperCase().includes(param.toUpperCase()) 
                                                             || u.lineText.toUpperCase().includes(param.toUpperCase()) 
                                                             || u.inspectionTypeText.toUpperCase().includes(param.toUpperCase()));
    }
  }

  editItem(item: any){
    //console.log('item')
    //console.log(item)

    let refLine = this.lineCombo.find((x:any) => x.ID == item.lineID);
    let refFamily = this.familyList.find((x:any) => x.id == item.inspectionTypeID);

    this.selectedLineOnCombo = refLine;
    this.selectedFamilyOnCombo = refFamily;
    this.itemName = item.number;
    this.itemDescription = item.description;

    this.oldLineId = item.lineID;
    this.oldFamilyId = item.inspectionTypeID;
    this.oldItemName = item.number;
    this.oldItemDescription = item.description;

    this.isFormHidden = false;
    this.isEditing = true;
  }

  deleteItem(item:any) {
    Swal.fire({
      title: this.translateService.instant("INACTIVATE"),
      text: this.translateService.instant("Are you sure you want to inactivate the selected record?"),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant("Accept")
    }).then((result) => {
      if (result.value) {
        //llamar servicio de delete y volver a llamar el servicio que me traiga los items apra refreshear info
        let postJSON = {};
        
        postJSON = {
          "id": item.id,
          "name": item.number,
          "description": item.description,
          "inspectionTypeID": item.inspectionTypeID,
          "status": 0,
          "lineID": item.lineID
        };

        //console.log('post json')
        //console.log(postJSON)

        this.createItemsService.updateInspectionPoint(postJSON)
          .subscribe(res => {
            if(res.error == 'false'){
              this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record inactivated correctly"))
              this.refreshView(1);
              this.closeForm();
            }
            else{
              this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while inactivating the record"))
            }  
          });
      }
    });
  }

  refreshView(allMethods:any){
    this.getItems();
    if(allMethods == 1)
      this.getFamilies();
    this.getAssets();
  }

  activateItem(item:any){
    //llamar servicio de activate y volver a llamar el servicio que me traiga los items apra refreshear info

    let postJSON = {};
        
    postJSON = {
      "id": item.id,
      "name": item.number,
      "description": item.description,
      "inspectionTypeID": item.inspectionTypeID,
      "status": 1,
      "lineID": item.lineID
    };

    this.createItemsService.updateInspectionPoint(postJSON)
      .subscribe(res => {
        if(res.error == 'false'){
          this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"),this.translateService.instant("Record activated correctly"))
          this.refreshView(1);
          this.closeForm();
        }
        else{
          this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while activating the record"))
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
    this.selectedLineOnCombo = undefined;
    this.selectedFamilyOnCombo = undefined;
    this.itemName = undefined;
    this.itemDescription = undefined;

    this.oldLineId = undefined;
    this.oldFamilyId = undefined;
    this.oldItemName = undefined;
    this.oldItemDescription = undefined;
  }

  edit(){
    if(this.selectedLineOnCombo.ID == this.oldLineId && this.selectedFamilyOnCombo.id == this.oldFamilyId && this.itemName == this.oldItemName && this.itemDescription == this.oldItemDescription){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("No changes detected"));
    }
    else{
      //llamar servicio de update y luego el de get para actualizar info
      this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record updated correctly"))
      this.closeForm();
    } 
  }

  save(){
    if(this.selectedLineOnCombo == undefined || this.selectedFamilyOnCombo == undefined || this.itemName == undefined || this.itemDescription == undefined || this.itemName == '' || this.itemDescription == ''){
      this.alertHelper.showInfoMessage(this.translateService.instant("ALERT"),this.translateService.instant("All fields need a value"));
    }
    else{
      //llamar al servicio de save item y luego el de get para actualizar info

      let postJSON = {};
        
      postJSON = {
        "id": 0,
        "name": this.itemName,
        "description": this.itemDescription,
        "inspectionTypeID": this.selectedFamilyOnCombo.id,
        "status": 1,
        "lineID": this.selectedLineOnCombo.ID
      };

      //console.log('post json')
      //console.log(postJSON)

      this.createItemsService.createInspectionPoint(postJSON)
        .subscribe(res => {
          if(res.error == 'false'){
            this.alertHelper.showSuccessMessage(this.translateService.instant("SUCCESS"), this.translateService.instant("Record created correctly"))
            this.refreshView(0);
            this.itemName = undefined;
            this.itemDescription = undefined;
          }
          else{
            this.alertHelper.showErrorMessage(this.translateService.instant("ERROR"), this.translateService.instant("An error occured while creating the record"))
          }  
        });
    }
  }
}
