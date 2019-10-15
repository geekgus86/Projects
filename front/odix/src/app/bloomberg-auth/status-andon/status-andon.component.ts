import { Component, OnInit } from '@angular/core';
import { StatusAndonService } from './status-andon.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-status-andon',
  templateUrl: './status-andon.component.html',
  styleUrls: ['./status-andon.component.scss']
})
export class StatusAndonComponent implements OnInit {
  andon: any
  activeShift: any;

  statusAndon: any;
  statusActiveShift: any;

  andonCode: any;
  activeShiftCode: any;

  lineModel: any;
  enable: any;; 
  lines: any;
  constructor(private statusAndonService: StatusAndonService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.loadInfo(39);
  }

  loadInfo(assetID: any) {
    this.statusAndonService.getComboboxes(assetID) 
    .subscribe(res => {
      this.lines = res.Line;
      this.statusAndon = res.Status[0];
      this.statusActiveShift = res.Status[1];
      this.lineModel = assetID;
      this.loadSwitches();
    });
  }

  loadSwitches() {
    var andonState;
    if(this.statusAndon.Status == 1)
      this.andon = true;
    else
      this.andon = false;
    
    if(this.statusActiveShift.Status == 1)
      this.activeShift = true;
    else
      this.activeShift = false;

    this.andonCode = this.statusAndon.Code;
    this.activeShiftCode = this.statusActiveShift.Code;
  }

  onChangeLine(newValue:any) {
    this.loadInfo(newValue);
  }

  onAndonValueChange(value: boolean) {
    this.statusAndonService.changeSwitchState(this.lineModel,this.andonCode) 
    .subscribe(res => {
      var object = new Object();
      object['error'] = res.error;
      object['id'] = res.id;
      object['last_update'] = res.last_update;
      object['msj'] = res.msj;
      object['type'] = res.type;
    });
  }

  onActiveShiftValueChange(value: boolean) {
    this.statusAndonService.changeSwitchState(this.lineModel,this.activeShiftCode) 
    .subscribe(res => {
      var object = new Object();
      object['error'] = res.error;
      object['id'] = res.id;
      object['last_update'] = res.last_update;
      object['msj'] = res.msj;
      object['type'] = res.type;
    });
  }

   openConfirmationDialogAndon(value: boolean) {
    this.confirmationDialogService.confirm('Confirmation', 'Do you really want to change the state of the Andon?')
    .then((confirmed) => {
      if(confirmed){
        this.onAndonValueChange(value);
        this.andon = value;
      }
      else if(value == true)
        this.andon = false;
      else
        this.andon = true;
    })
    .catch(() => {
      if(value == true)
        this.andon = false;
      else
        this.andon = true;
    });
  }

   openConfirmationDialogActiveShift(value: boolean) {
    this.confirmationDialogService.confirm('Confirmation', 'Do you really want to change the state of the Active Shift?')
    .then((confirmed) => {
      if(confirmed){
        this.onActiveShiftValueChange(value);
        this.activeShift = value;
      }
      else if(value == true)
        this.activeShift = false;
      else
        this.activeShift = true;
    })
    .catch(() => {
      if(value == true)
        this.activeShift = false;
      else
        this.activeShift = true;
    });
  }
}
