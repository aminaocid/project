import { createApp } from 'vue'
import App from './App.vue'

import {map} from "./assets/js/olmap"
import olmap from "./components/olmap.vue"

import axios from "axios"

const app = createApp(App)
// app.use(router)

axios.defaults.baseURL = 'http://www.noobprogram.com'
app.config.globalProperties.$http = axios
app.config.globalProperties.$map = map
app.config.globalProperties.$mapDOM = olmap.mapDOM

app.mount("#app")
