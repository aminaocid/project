<template>
    <div class="loading"><div class="text">正在请求所需数据</div><img src="../assets/images/loading.png" class="loadImg"></div>
</template>
<script>
export default {
    name: "loading",
    data(){
        return{}
    }
}
</script>
<style scoped>
@keyframes load{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.4);
}

.text{
     position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 64px);
    z-index: 999;
}

.loadImg{
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    z-index: 999;
    /* transform: rotateZ(360deg); */
    animation: load 1s ease 0s infinite normal;
}
</style>