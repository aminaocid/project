<template>
  <container>
    <template #main>
      <ol-map></ol-map>
    </template>
    <template #right>
      <right-menu></right-menu>
    </template>
  </container>
</template>

<script>
import Container from "./components/Container.vue";
import OlMap from "./components/olmap.vue";
import RightMenu from "./components/RigthMenu.vue";

export default {
  name: "MyApp",
  data() {
    return {};
  },
  components: {
    OlMap,
    Container,
    RightMenu,
  },
};
</script>
<style lang="css">
* {
  margin: 0;
  padding: 0;
  border: 0;
}

html,
body {
  height: 100%;
}

ul {
  list-style: none;
}

#app {
  height: 100%;
}

.tipBox {
  width: 40px;
  height: 15px;
  font-size: 5px;
  line-height: 15px;
  text-align: center;
  color: red;
  position: fixed;
  z-index: 12;
  border: 1px solid black;
  border-radius: 5px;
}

.middlePoint {
  width: 40px;
  height: 15px;
  font-size: 5px;
  line-height: 15px;
  text-align: center;
  color: red;
  border: 1px solid black;
  border-radius: 5px;
}
.ol-full-screen-false {
  position: fixed;
  z-index: 10;
  left: 10px;
  bottom: 90px;
}

.ol-zoom-in {
  position: fixed;
  left: 10px;
  bottom: 145px;
}

.ol-zoom-out {
  position: fixed;
  left: 10px;
  bottom: 120px;
}

.ol-scale-line {
  left: 5px;
  bottom: 25px;
}
</style>
