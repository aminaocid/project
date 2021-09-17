// 初始化map
import {
    Map,
    View,
    control,
} from "ol"
import TileLayer from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import * as olProj from "ol/proj"
import VectorLayer from "ol/layer/Vector"
import Vector from "ol/source/Vector"
import * as Control from "ol/control" 

const map = new Map({
    view: new View({
        center: olProj.transform([126, 45], "EPSG:4326", "EPSG:3857"),
        zoom: 8
    }),
    layers: [new TileLayer({
            source: new XYZ({
                url: "http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
            })
        }),
        new VectorLayer({
            source: new Vector()
        }),
        new VectorLayer({
            source: new Vector()
        })
    ],
    controls: new Control.defaults().extend([new Control.FullScreen(), new Control.ScaleLine(), new Control.MousePosition()])
})

export {
    map
}