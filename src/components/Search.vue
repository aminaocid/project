// 搜索框组件
<template>
  <div class="searchBox">
    <!-- 搜索框 -->
    <input
      v-model.trim="value"
      :placeholder="placeHolder"
      @keyup.enter="submit(value)"
      @input="value == '' ? (isShow = false) : (isShow = true)"
    />
    <!-- 清空键 -->
    <div class="clear" v-show="isShow" @click="rollBackBegin()"></div>
    <!-- 按钮 -->
    <button @click="submit(value)"></button>
    <!-- 找不到提示 -->
    <div class="alert" v-if="alertMark">
      <div>找不到相关地点</div>
      <div>
        您可以使用百度搜索<a :href="unfoundLink" target="_blank">{{ value }}</a>
      </div>
    </div>
    <!-- 下拉联想词列表 -->
    <div class="selection">
      <ul ref="selectionList">
        <li
          v-for="item in responseList"
          :key="item.Id"
          @click="submit(item.Country, item.City)"
        >
          <div>{{ item.Country }}</div>
          <div>{{ item.City }}</div>
          <div>{{ item.Province }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { moveAndDraw, requestToServer } from "../assets/js/request";
export default {
  name: "searchBox",
  data() {
    return {
      value: "",
      placeHolder: "请入城市名称",
      isShow: false,
      unfoundLink: "https://www.baidu.com/s?wd=",
      alertMark: false,
      responseList: null,
    };
  },
  methods: {
    // 按钮点击
    async submit(country, city) {
      let requestText;
      // 通过实参数量，判断按钮点击事件或下拉列表点击事件
      if (arguments.length == 1) {
        // 判断输入文本是否唯一
        if (this.responseList.length == 1) {
          requestText =
            this.responseList[0].Country + "," + this.responseList[0].City;
        } else if (this.responseList.length > 1) {
          this.placeHolder = "检索到多个结果，请选择";
          return null;
        }
      } else {
        requestText = country + "," + city;
      }

      requestToServer(this.$http, "static/search", requestText).then((responseText) => {
        if (responseText == "none") {
          this.alertMark = true;
          this.unfoundLink += this.value;
        } else {
          moveAndDraw(this.$map, responseText);
          this.rollBackBegin();
        }
      });
    },
    rollBackBegin() {
      this.value = "";
      this.placeHolder = "请输入城市名称";
      this.isShow = false;
      this.alertMark = false;
    },
  },
  watch: {
    value(newVal, oldVal) {
      newVal != ""
        ? requestToServer(this.$http, "static/selection", "%" + newVal + "%").then(
            (responseText) =>
              (this.responseList = responseText != "none" ? responseText : [])
          )
        : (this.responseList = []);
    },
  },
};
</script>

<style lang="css" scoped>
.searchBox {
  position: fixed;
  height: 32px;
  width: 450px;
  top: 60px;
  left: 20px;
  z-index: 11;
  box-shadow: 5px 5px 3px #888888;
  font-size: 18px;
  line-height: 30px;
}

input {
  position: absolute;
  z-index: 11;
  border: 1px solid #888888;
  padding: 0;
  width: 389px;
  height: 30px;
  outline: none;
  font-size: 15px;
  text-indent: 3px;
}

button {
  position: absolute;
  left: 390px;
  z-index: 11;
  width: 60px;
  height: 32px;
  border: 0;
  background: url(../assets/images/search.png) center center no-repeat;
  background-color: #3385ff;
  background-size: 25px 25px;
  cursor: pointer;
}

.clear {
  height: 30px;
  width: 30px;
  position: absolute;
  left: 360px;
  top: 1px;
  line-height: 30px;
  z-index: 12;
  cursor: pointer;
  background: url(../assets/images/delete.png) center center no-repeat;
  background-size: 30px 30px;
}

.clear:hover {
  background-color: #d6cfcf;
}

.alert {
  position: absolute;
  top: 30px;
  height: 70px;
  width: 389px;
  background-color: white;
  transform: translate(0, 0);
  z-index: 10;
  box-shadow: 5px 5px 3px #888888;
}

.selection {
  position: absolute;
  top: 35px;
  z-index: 11;
  width: 390px;
  background-color: white;
  box-shadow: 5px 5px 3px #888888;
}

.selection li {
  background: url(../assets/images/search.png) 5px 5px no-repeat;
  background-size: 20px 20px;
  cursor: pointer;
  overflow: hidden;
}

.selection li:hover {
  background-color: #d6cfcf;
}

.selection li div:nth-child(1) {
  font-size: 15px;
  line-height: 30px;
  text-indent: 30px;
  float: left;
}

.selection li div:nth-child(2) {
  font-size: 10px;
  line-height: 30px;
  text-indent: 10px;
  float: left;
}

.selection li div:nth-child(3) {
  font-size: 8px;
  line-height: 30px;
  text-indent: 10px;
  float: left;
}
</style>