// 地图组件
<template>
  <div id="map" ref="mapDOM"></div>
  <search></search>

  <div
    class="tool"
    :style="
      toolMark ? 'transform:translate(-500px,0)' : 'transform:translate(0,0)'
    "
  >
    <div class="clear" @click="clearView">清空</div>
    <div
      class="toolBox"
      :class="colorMark ? 'toolBoxG' : 'toolBoxB'"
      @click="
        isShow = !isShow;
        colorMark = !colorMark;
      "
    >
      工具箱
    </div>
    <div class="toolList" v-show="isShow">
      <ul>
        <li @click="() => this.measure(this.map, this.$refs.mapDOM, 'line')">
          测距离
        </li>
        <li @click="() => this.measure(this.map, this.$refs.mapDOM, 'poly')">
          测面积
        </li>
        <li @click="() => this.setPoint(this.map)">放置点</li>
      </ul>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import Search from "./Search.vue";
import { measure, setPoint } from "../assets/js/toolBox";
import bus from "../plugin/eventBus";

export default {
  data() {
    return {
      map: null,
      mapDOM: null,
      isShow: false,
      colorMark: true,
      measure: measure,
      setPoint: setPoint,
      toolMark: false,
    };
  },
  methods: {
    //   清空绘制图层
    clearView() {
      try {
        this.map.getLayers().item(1).getSource().clear();
        this.map.getLayers().item(2).getSource().clear();
        this.map.getLayers().item(3).getSource().clear();
        this.map.getLayers().item(4).getSource().clear();
      } catch {
        return null;
      } finally {
        this.map.getOverlays().clear();
      }
    },
  },
  created() {
    bus.on("menuMove", (data) => {
      this.toolMark = data;
    });
  },
  mounted() {
    this.map = this.$map;
    this.map.setTarget("map");
    this.mapDOM = this.$refs.mapDOM;
  },
  components: {
    Search,
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
.tool {
  position: fixed;
  top: 65px;
  right: 15px;
  z-index: 20;
  width: 201px;
  height: 30px;
  border: 1px solid #888888;
  background-color: white;
  box-shadow: 5px 5px 3px #888888;
  cursor: pointer;
  transition: transform 0.5s linear;
}

.tool div {
  float: left;
  line-height: 30px;
  font-size: 15px;
}

.clear {
  border-right: 1px solid #888888;
  width: 100px;
  background: url(../assets/images/clear.png) 10px 5px no-repeat;
  background-size: 20px 20px;
  text-indent: 40px;
  color: #707070;
}

.clear:hover {
  color: #1296db;
  background-image: url(../assets/images/clearB.png);
}

.toolBox {
  background: url(../assets/images/toolG.png) 10px 5px no-repeat;
  background-size: 20px 20px;
  text-indent: 40px;
  width: 100px;
  color: #707070;
}

.toolBoxB {
  color: #1296db;
  background-image: url(../assets/images/toolB.png);
}

.toolBoxG {
  color: #707070;
  background-image: url(../assets/images/toolG.png);
}

.toolList {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: white;
  width: 100px;
  box-shadow: 5px 5px 3px #888888;
}

.toolList li {
  text-indent: 0;
  text-align: center;
}

.toolList li:hover {
  color: #1296db;
}
</style>