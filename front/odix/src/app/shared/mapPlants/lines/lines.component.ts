import { Component, OnInit,Input } from '@angular/core';



@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
  @Input() plantName: any;

  constructor() { }

  ngOnInit() {
  }

}
