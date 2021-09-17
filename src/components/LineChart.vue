<template>
  <div class="box" ref="demo"></div>
</template>
<script>
import { lineChart } from "../assets/js/airChart";
export default {
  name: "linechart",
  data() {
    return {};
  },
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      if (newVal) {
        let {
          AQI: AQI,
          CO: CO,
          NO2: NO2,
          PM10: PM10,
          PM25: PM25,
          SO2: SO2,
          o3: O3,
          primary: primary,
        } = this.data;
       let dataset = [CO,NO2,PM10,PM25,SO2]
        lineChart(this.$refs.demo, dataset);
      }
    },
  },
};
</script>
<style scoped>
.box {
  width: 500px;
  height: 300px;
}
</style>