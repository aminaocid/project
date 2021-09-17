import { echarts } from "../../plugin/echart";

let BarChart
function barChart(target,dataset,name){
    if(BarChart != undefined){
        BarChart.dispose()
    }
    BarChart = echarts.init(target)
    BarChart.setOption({
        title: {
            text: name + '近期空气情况',
            x:"center"
        },
        dataset:dataset,
        tooltip: {},
        xAxis: {
            type:"category"
        },
        yAxis: {},
        series: [{
            name: '浓度',
            type: 'bar'
        }]
    })
}

let LineChart
function lineChart(target,dataset){
    if(LineChart != undefined){
        LineChart.dispose()
    }

    LineChart = echarts.init(target)
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '浓度',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: dataset[0], name: 'CO'},
                    {value: dataset[1], name: 'NO2'},
                    {value: dataset[2], name: 'PM10'},
                    {value: dataset[3], name: 'PM2.5'},
                    {value: dataset[4], name: 'SO2'}
                ]
            }
        ]
    }
    LineChart.setOption(option);
}

export{
    barChart,
    lineChart
}