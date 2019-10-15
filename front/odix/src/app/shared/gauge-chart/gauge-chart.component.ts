import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import { HelpLibrary } from '@app/utilities/help-library';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: [
    './gauge-chart.component.scss',
  ],
    encapsulation: ViewEncapsulation.None
})
export class GaugeChartComponent implements OnInit, AfterViewInit {

    chart: any;
    @Input() data: any;
    @Input() gauge: any;
    randomId: string;

    constructor() {
        this.randomId = HelpLibrary.makeid(); // this function generate a random id for the chart
     }

    ngOnInit() {

    }

    ngAfterViewInit() {
        let colorRef;
        switch(this.data.colorRef) {
            case "Red":
                colorRef = "#FF0000"
                break;
            case "Yellow":
                colorRef = "#F6C600"
                break;
            default:
                colorRef = "#60B044"
        }
        this.chart =  c3.generate({
            bindto: `#${this.randomId}`,
            data: {
                columns: [
                    ['Quality Rate', this.data.rate*100]
                ],
                type: 'gauge',
            },
            gauge: {
            },
            color: {
                pattern: [colorRef], // the three color levels for the percentage values.
                /*threshold: {
                    values: [30, 60, 90, 100]
                }*/
            },
            size: {
                width: 140,
                height: 100
              },
            legend: {
                hide: true
            },
            tooltip: {
                show: false
            }
        });


    }

}
