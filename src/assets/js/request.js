// 请求数据相关模块
import Style from "ol/style/Style";
import VectorLayer from "ol/layer/Vector"
import Heatmap from "ol/layer/Heatmap"
import Vector from "ol/source/Vector"
import * as olFormat from "ol/format";
import * as olProj from "ol/proj"
import * as olEasing from "ol/easing"
import axios from "axios"
import {
    Fill,
    Stroke,
    Text
} from "ol/style"
import {
    getArea
} from "ol/sphere"

let feature = null;

// 与服务器通信，并返回响应
async function requestToServer(ajax, url, requestText, points) {
    let {
        data: responseText
    } = await ajax.get(url, {
        params: {
            name: requestText,
            quantity: points
        },
    });
    return responseText
}
// 与环境云通信，并返回响应
async function requestToEnvi(url) {
    let {
        data: responseText
    } = await axios.get(url)
    return responseText
}
const vectorLayer = new VectorLayer({
    source: new Vector()
})

let heatLayer = new Heatmap({
    source: new Vector(),
    blur: 15,
    radius: 4
})

function timeStr(responseText) {
    return responseText ?
        responseText.time.slice(0, 4) +
        "年" +
        responseText.time.slice(4, 6) +
        "月" +
        responseText.time.slice(6, 8) +
        "日" +
        responseText.time.slice(8, 10) +
        "时" :
        null;
}

// 移动至区域并绘制矢量图层
function moveAndDraw(map, responseText) {
    // 删除上一图层
    try {
        map.removeLayer(vectorLayer)
    } catch {
        return null
    }
    let region = responseText[0].Region.split(",")
    let wkt = responseText[0].WKT

    map.addLayer(vectorLayer)
    vectorLayer.getSource().clear();

    // 移动
    map.getView().fit(
        olProj.transformExtent(region, "EPSG:4326", "EPSG:3857"), {
            duration: 3000,
            easing: olEasing.upAndDown()
        }
    )
    // 绘制要素
    feature = new olFormat.WKT().readFeature(wkt, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857"
    })
    feature.setStyle(
        new Style({
            fill: new Fill({
                color: "rgba(0,0,0,0.3)"
            }),
            // stroke: stroke,
            // text: text
        })
    )
    vectorLayer.getSource().addFeature(feature);
}

function heatMap(map,responseText, name,which) {
    try {
        map.removeLayer(heatLayer)
    } catch {
        return null
    }
    let {
        CO: CO,
        NO2: NO2,
        PM10: PM10,
        PM25: PM25,
        SO2: SO2,
    } = responseText;
    let dataset = [CO, NO2, PM10, PM25, SO2]
    console.log(dataset)
    let quantity = Math.round(getArea(feature.getGeometry()) / 100000000) * Math.ceil(Number.parseFloat(dataset[which]));
    console.log(quantity)
    requestToServer(axios, "static/airHeat", name + "%", quantity).then(responseText => {
        let pointList = responseText.split(",");
        
        heatLayer.getSource().clear();
        for (let i = 0; i < pointList.length; i++) {
            heatLayer.getSource().addFeature(new olFormat.WKT().readFeature(pointList[i], {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857"
            }))
        }
        map.addLayer(heatLayer);
    })
}
export {
    moveAndDraw,
    requestToServer,
    requestToEnvi,
    timeStr,
    heatMap
}