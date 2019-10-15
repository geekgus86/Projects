import { Component, OnInit, OnDestroy } from '@angular/core';
import * as io from "socket.io-client";
import { PcbAssemblyService } from './pcb-assembly.service';
import * as Rx from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-pcb-assembly',
  templateUrl: './pcb-assembly.component.html',
  styleUrls: ['./pcb-assembly.component.scss']
})
export class PcbAssemblyComponent implements OnInit, OnDestroy {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  detalle:any = [];
  socket: SocketIOClient.Socket = null;
  topicPath = "PCB_LINE1";
  framesData:any = [];
  prodDate = '';
  prodPerDay: any = [];
  weekProd: any = [];
  onDestroy$ = new Subject<void>();

  constructor(private pcbServie: PcbAssemblyService) {
    this.socket = io("http://i40appmaster.eastus.cloudapp.azure.com:8088", {
      reconnectionDelay: 3000,
      reconnection: true,
      reconnectionAttempts: 20,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
      autoConnect: true,
      reconnectionDelayMax: 5000
    });
    console.log("SOCKET URL", URL);
    console.log("SOCKET OBJ", this.socket);
  }

  ngOnInit() {

    this.subscribeTo(this.topicPath, (d: any) => {
      let data = JSON.parse(d);
      console.log(data);
      this.framesData = data;
      this.weekProd = [];
      for (let index = 0; index < 7; index++) {
        this.weekProd.push({1: '-', 2: '-'});
      }
      for (var prop in data.weekFrames) {
        let fragment = prop.split('-');
        let dt = new Date(Number(fragment[0]),Number(fragment[1])-1, Number(fragment[2]));
        console.log(this.weekProd);
        this.weekProd[(dt.getDay() == 0 ) ? 6 : (dt.getDay()-1)] = data.weekFrames[prop];
      }
      this.prodDate = new Date(data.prodDate.date.year,data.prodDate.date.month-1,data.prodDate.date.day,0,0,0,0)
      .toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
      this.prodDate = this.prodDate.charAt(0).toUpperCase() + this.prodDate.slice(1);
    });
    this.getProductionPlan();
    let obs = Rx.Observable.interval(1000*60*15).takeUntil(this.onDestroy$);
    obs.subscribe(value => {
      this.getProductionPlan();
    });

  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.unsubscribe(this.topicPath);
  }

  subscribeTo(path: string, cb: any) {
    if (cb) {
      this.socket.emit('join', path)
      this.socket.on('reconnect', (data:any) => {
        this.socket.emit('join', path)
      })
      this.socket.on(path, (data: any) => {
        if (data) { cb(data) }
      })
    }
  }

  unsubscribe(path: string) {
    if (this.socket) {
      this.socket.removeListener(path)
    }
  }

  getProductionPlan(){
    var date: Date = new Date();
    var dayOfWeek = date.getDay();
    date.setDate(date.getDate() - dayOfWeek + 1);
    for (let i = 0; i < dayOfWeek; i++) {
      this.pcbServie.getProductionPlan(date.toLocaleDateString()).subscribe((data:any) => {
        var totalQty = 0;
        data.BancoTrabajo.forEach((element:any) => {
          totalQty += element.QtyReq;
        });
        this.prodPerDay[i] = totalQty;
      });
      date.setDate(date.getDate() + 1);
    }
    setTimeout(() => {
      console.log(this.prodPerDay);
    }, 1000);
  }



  showDetail(i: any) {
    this.detalle[i] = this.detalle[i] ? !this.detalle[i] : true;
  }

}
