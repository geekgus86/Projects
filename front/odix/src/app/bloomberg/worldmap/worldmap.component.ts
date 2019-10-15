import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Router } from '@angular/router';
import { WorldWidePlantsService } from '@app/bloomberg/worldmap/world-wide-plants.service';


declare var $: any;

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.scss']
})
export class WorldmapComponent implements OnInit, OnDestroy {

  private chart: AmChart;
  private worldWidePlants: any;
  private currentMapArea: string;

  constructor(
    private AmCharts: AmChartsService,
    private route: Router,
    private service: WorldWidePlantsService
  ) {
    this.currentMapArea = '';
  }

  ngOnInit() {

    this.service.getWorldWidePlants()
      .subscribe(
        result => {
          this.worldWidePlants = result;
          //console.log(result);
          this.chart = this.AmCharts.makeChart("chartdiv", {
            "type": "map",
            "theme": "black",
            "projection": "miller",
            "dataProvider": {
              "map": "worldLow",
              "images": this.worldWidePlants.markers, // marcadores
              //"getAreasFromMap": true,
              "areas": this.worldWidePlants.areas // areas o sea paises
            },
            "areasSettings": {
              "autoZoom": true,
              "color":"#00B5A7", // color de las areas que contienen plantas
              "selectedColor": "#00e6e6", // color del area seleccionada
              "unlistedAreasColor":"#00B5A7" // color de las areas que no estan listadas
            },
            imagesSettings: {
              color: "#CC0000",
              rollOverColor: "#CC0000",
              selectedColor: "#000000",
              labelRollOverColor: "#f10a0a",
              labelPosition: "top"
            },
            "smallMap": {
              "enabled": false,
            },
            "export": {
              "enabled": false,
              "position": "bottom-right"
            },
            listeners: [ // los eventos init y zoomCompleted deben estar aca porque son cambiantes
              {
                event: "init",
                method: (e:any)=> {

                  let map = e.chart;

                  this.hiddenAllMarkers(map);

                  map.addListener("zoomCompleted", (e:any) => {

                    if(map.zoomLevel() <= 1.5) {
                      this.hiddenAllMarkers(map);
                      this.currentMapArea = '';
                    }
                    else{
                      this.showMarkers(map);
                    }

                  });
                  map.validateData();
                }
              }
            ]
          });

          this.AmCharts.addListener(this.chart, "clickMapObject", (e:any) => {

            /**
             * en caso que se selecione un pais entoces guardamos el id para cuando
             * finalise el evento "zoomCompleted" entonces mostrar todos los marcadores
             * con el groupId igual a id del area seleccionada
             */

            if (e.mapObject.cname == 'MapArea') {
              this.currentMapArea = e.mapObject.id;
            }

            /**
             * tener mucho cuidado...mapObject es cualquier objeto del
             * mapa por lo que si plant esta definido es que estamos sobre
             * un objeto de tipo image porque asi lo defini yo en este caso
             */
            if (e.mapObject.plant !== undefined) {
              this.route.navigate(["/plant/apodaca"]);
            }

          });
        },
        error => {}
    );
  }

  hiddenAllMarkers(map: any): void {

    let areas = this.worldWidePlants.areas;
    areas.forEach((area:any) => {
      map.hideGroup(area.id);
    })

  }

  showMarkers(map: any): void {

    if (this.currentMapArea) {
      map.showGroup(this.currentMapArea);
    }
    else{
      let areas = this.worldWidePlants.areas;
      areas.forEach((area:any) => {
        map.showGroup(area.id);
      })
    }

  }

  /**
   * Por favor no borrar este metodo por si hay que hacer
   * alguna manipulacion avanzada de los marcadores
  */
  updateCustomMarker(event:any): void {

    // get map object
    let map = event.chart;

    // go through all of the images
    for (let i in map.dataProvider.images) {

      // get MapImage object
      let image = map.dataProvider.images[i];
    }
  }

  ngOnDestroy () {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}
