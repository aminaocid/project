<template>
  <div class="box" ref="barChart"></div>
</template>
<script>
import { barChart } from "../assets/js/airChart";
export default {
  name: "BarChart",
  return: {},
  props: ["data","name"],
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

        let dataset = {
          source: [
            ["value", "AQI", "CO", "NO2", "PM10", "PM25", "SO2", "O3"],
            ["AQI", AQI],
            ["CO", CO],
            ["NO2", NO2],
            ["PM10", PM10],
            ["PM2.5", PM25],
            ["SO2", SO2],
            ["O3", O3],
          ],
        };
        barChart(this.$refs.barChart, dataset,this.name);
      }
    },
  },
};
</script>
<style scoped>
.box {
  width: 500px;
  height: 350px;
}
</style>