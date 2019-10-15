import React, { PureComponent } from "react";
import { Bar } from "react-chartjs-2";
import AreasLegend from "./AreasLegend";
import { mapColors } from "../../lib/utils";

class ToolChangeover extends PureComponent {
    render() {
        const { data } = this.props;
        let content = null;
        if (data !== null) {

            let datasets = []
            let groupedData = data
            let tempData = [];
            let targetData = [];
       
            for (let key in groupedData) {

                tempData.push(groupedData[key].total_issue_minutes)
                
                targetData.push(17)

                //Por cada item tendremos un data
                groupedData[key].items.forEach((a) => {
               
                    let _data = []
                    let _color, _label;    
                    groupedData.forEach((b) => {
                        if(b.tool_code===groupedData[key].tool_code){
                            _data.push( (a.issue_minutes).toFixed(2)  )
                            // _data.push( ((a.issue_minutes / groupedData[key].total_issue_minutes) * groupedData[key].percentageTime).toFixed(2)  )
                            _color = a.issue_type_color
                            _label = a.issue_type
                            
                        }else{
                            _data.push(0)
                        }
                    
                    })
                    
                    datasets.push({
                        label: _label,
                        backgroundColor: mapColors(_color),
                        data: _data
                    })
                })
            }

            let maxValue = Math.max(...tempData.concat(targetData));

            datasets.unshift({
                yAxisID: "y-axis-1",
                label: "Objetivo",
                type: "line",
                fill: false,
                lineTension: 0,
                backgroundColor: "#bdbdbd",
                borderColor: "#bdbdbd",
                data: targetData
            })

            datasets.unshift({
                yAxisID: "y-axis-0",
                label: "% Total",
                type: "line",
                lineTension: 0,
                fill: false,
                showLine: false,
                backgroundColor: "#000000",
                borderColor: "#00000",
                data: tempData
            })
            
            const chartData = {
                labels: groupedData.map(c => { return c.tool_code }),
                datasets: datasets
            };

            const chartOptions = {
                responsive: true,
                legend: {
                    display: false
                },
                /*tooltips: {
                    mode: 'label'
                },*/
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            color: "#D7DFEB",
                            display: false,
                            lineWidth: 1
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        position: "left",
                        id: "y-axis-0",
                        display: false,
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            min: 0,
                            max: maxValue + 5,
                            callback: function (value, index, values) {
                                return value + "%";
                            }
                        }
                    }, {
                        stacked: false,
                        position: "right",
                        id: "y-axis-1",
                        display: false,
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            min: 0,
                            max: maxValue + 5,
                            callback: function (value, index, values) {
                                return value + "%";
                            }
                        }
                    }]
                }
            };

            content = (
                <React.Fragment>
                    <Bar data={chartData} options={chartOptions} redraw={true} />
                    <AreasLegend type={true} />
                </React.Fragment>
            )
        }
        return content
    }
}
export default ToolChangeover;