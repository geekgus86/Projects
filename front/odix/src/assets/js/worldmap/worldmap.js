var worldmap = AmCharts.makeChart("chartdiv", {
    "type": "map",
    "theme": "black",
    "projection": "miller",
    
    "dataProvider": {
      "map": "worldLow",
      "getAreasFromMap": true
    },
    "areasSettings": {
      "autoZoom": true,
      "selectedColor": "#262626"
    },
    "smallMap": {},
    "export": {
      "enabled": false,
      "position": "bottom-right"
    }
});