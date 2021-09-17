<template>
  <div
    ref="rightMenu"
    class="rightMenu"
    :style="
      rightMenuMark
        ? 'transform:translate(0,0)'
        : 'transform:translate(500px,0)'
    "
  >
    <button @click="menuButClick" class="button">
      <img
        src="../assets/images/direction.png"
        alt="箭头"
        :style="
          rightButMark ? 'transform:rotate(0)' : 'transform:rotate(180deg)'
        "
      />
    </button>
    <select v-model="value" @change="getAirData">
      <option
        v-for="item in list"
        :value="item.citycode + ',' + item.cityname"
        :key="item.citycode"
      >
        {{ item.cityname }}
      </option>
    </select>
    <bar-chart :data="res" :name="name"></bar-chart>
    <line-chart :data="res"></line-chart>
    <div class="time" v-if="res">{{ time }}</div>
    <div class="text" v-if="res">
      相关数据均来自<a href="http://www.envicloud.cn/">环境云</a>，仅作学习使用
    </div>
    <button v-for="(item,index) in whichList" :key="item" @click="changeHeat(item)" class="changeHeat" :style="'left:'+(index*90+25)+'px'">{{item}}</button>
    <loading-cover v-show="loadingMark"></loading-cover>
  </div>
</template>
<script>
import bus from "../plugin/eventBus";
import axios from "axios";
import BarChart from "./BarChart";
import LineChart from "./LineChart.vue";
import LoadingCover from "./LoadingCover.vue";
import {
  moveAndDraw,
  requestToEnvi,
  requestToServer,
  timeStr,
  heatMap,
} from "../assets/js/request";

export default {
  name: "RigthMenu",
  data() {
    return {
      rightMenuMark: false,
      rightButMark: false,
      initMark: true,
      bus: bus,
      value: "101010100,北京",
      name: "北京",
      list: [],
      res: null,
      loadingMark: true,
      time: null,
      whichList:["CO", "NO2", "PM10", "PM2.5", "SO2"]
    };
  },
  methods: {
    menuButClick() {
      this.rightMenuMark = !this.rightMenuMark;
      this.rightButMark = !this.rightButMark;
      bus.emit("menuMove", this.rightButMark);
      if (this.initMark) {
        this.initMark = false;
        // 获取支持空气质量查询的城市
        requestToEnvi(
          "http://service.envicloud.cn:8082/v2/air/cities/YW1PBM9HY2LKMTYZMDU4NZCZOTQ0OA=="
        ).then((responseText) => {
          this.list = responseText.cities;
          this.getAirData();
          // 移动至初始位置
          requestToServer(this.$http, "static/search", "北京市,北京市").then(
            (responseText) => {
              moveAndDraw(this.$map, responseText);
            }
          );
        });
      }
    },
    getAirData() {
      // 定义请求拦截器，加载loading
      axios.interceptors.request.use((config) => {
        this.loadingMark = true;
        return config;
      });
      // 定义响应拦截器，删除loading
      axios.interceptors.response.use((response) => {
        this.loadingMark = false;
        return response;
      });
      // 获取城市空气质量实况
      requestToEnvi(
        "http://service.envicloud.cn:8082/v2/cityairlive/YW1PBM9HY2LKMTYZMDU4NZCZOTQ0OA==/" +
          this.value.split(",")[0]
      ).then((responseText) => {
        this.res = responseText;
        this.time = timeStr(responseText);
        this.name = this.value.split(",")[1];
        heatMap(this.$map, responseText, this.name, 0);
      });
    },
    changeHeat(item){
      heatMap(this.$map, this.res, this.name, this.whichList.indexOf(item));
    }
  },
  watch: {
    async name(newVal, oldVal) {
      requestToServer(this.$http, "static/search", newVal + "%," + newVal + "%")
        .then((responseText) => {
          moveAndDraw(this.$map, responseText);
        })
        .then(() => {
          heatMap(this.$map, this.res, this.name, 0);
        });
    },
  },
  components: {
    BarChart,
    LoadingCover,
    LineChart,
  },
};
</script>
<style scoped>
.rightMenu {
  position: fixed;
  top: 50px;
  right: 0;
  width: 500px;
  height: calc(100% - 70px);
  background-color: white;
  z-index: 11;
  transition: transform 0.5s linear;
  box-shadow: 5px 5px 3px #888888;
}
.button {
  position: absolute;
  top: calc(50% - 60px);
  left: -20px;
  width: 20px;
  height: 50px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #f0e9e9;
  cursor: pointer;
  box-shadow: 0px 5px 3px #cac5c5;
}

.rightMenu img {
  position: absolute;
  top: 10px;
  left: -5px;
  width: 30px;
  height: 30px;
  transform: rotate(180deg);
}

:deep(.loading) {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.changeHeat{
  width: 80px;
  height: 45px;
  position: absolute;
  bottom: 90px;
  cursor: pointer;
}

.changeHeat:hover{
  background-color: skyblue;
}

.time {
  position: absolute;
  bottom: 50px;
  left: calc(50% - 99px);
  font-size: 20px;
}

.text {
  width: 100%;
  position: absolute;
  bottom: 0px;
  text-align: center;
  /* left: calc(50% - 141px); */
  background-color: rgba(0, 0, 0, 0.1);
}
</style>