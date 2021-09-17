import {
    getLength,
    getArea
} from "ol/sphere"
import Draw from "ol/interaction/Draw";
import {
    Overlay
} from "ol"
// import {
//     Style,
//     Icon
// } from "ol/style"
import Style from "ol/style/Style"
import Icon from "ol/style/Icon"

// 测量相关
function measure(map, mapDOM, type) {
    let dis = null
    let position;
    let mark = true;
    let elementTip = null;

    let draw = new Draw({
        type: type == "line" ? "LineString" : "Polygon",
        source: map.getLayers().item(1).getSource(),
        // 防止双击结束时，地图放大
        stopClick: "doubleclick",
    });
    // 获取鼠标位置
    map.on("pointermove", function (e) {
        position = e.coordinate;
        // 加大元素与鼠标的距离
        position[0] += 1000;
        position[1] += 1000;
    })
    map.addInteraction(draw);

    function add() {
        if (mark) {
            elementTip.innerHTML = "起点";
            mark = false;
        }
        createOverTip(elementTip.innerHTML, "middlePoint", position);
    }

    function createOverTip(text, style, posi) {
        var element = document.createElement("div");
        element.innerHTML = text;
        mapDOM.appendChild(element);
        element.setAttribute("class", style);
        element.style.width = element.innerHTML.length > 5 ? element.innerHTML.length * 8 + "px" : "40px";
        map.addOverlay(new Overlay({
            element: element,
            position: posi
        }))
    }
    draw.on("drawstart", (event) => {
        elementTip = document.createElement("div");
        elementTip.setAttribute("class", "tipBox");
        mapDOM.appendChild(elementTip);
        (function () {
            event.feature.getGeometry().on("change", (event) => {
                let feature = event.target.clone();
                if (type === "line") {
                    dis = getLength(feature);
                    if (dis > 100) {
                        dis = Math.round(dis / 1000 * 100) / 100 + "公里";
                    } else {
                        dis = Math.round(dis * 100) / 100 + "米";
                    }
                } else if (type === "poly") {
                    dis = getArea(feature);
                    if (dis > 100) {
                        dis = Math.round(dis / 1000000 * 100) / 100 + "平方公里";
                    } else {
                        dis = Math.round(dis * 100) / 100 + "平方米";
                    }
                }
                elementTip.innerHTML = dis;
                elementTip.style.width = dis.length * 8 + "px";
                elementTip.style.top = window.event.clientY + 20 + "px";
                elementTip.style.left = window.event.clientX + 20 + "px";
            })
        })()
        window.addEventListener("click", add)
    })
    draw.on("drawend", () => {
        console.log("end")
        mark = true;
        mapDOM.removeChild(elementTip);
        window.removeEventListener("click", add);
        draw.setActive(false)
        map.removeInteraction(draw)
    })
}

function setPoint(map) {
    let pointLayer = map.getLayers().item(2)
    let draw = new Draw({
        type: "Point",
        source: pointLayer.getSource(),
        // stopClick: "singleclick"
    })
    map.addInteraction(draw);
    draw.on("drawstart", () => {
        pointLayer.setStyle(new Style({
            image: new Icon({
                src: require("../images/position.png")
            })
        }))
    })
    draw.on("drawend", ()=>{
        draw.setActive(false)
    })
}

export {
    measure,
    setPoint
}