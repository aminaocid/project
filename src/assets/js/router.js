import {createRouter, createWebHashHistory} from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active-router",
    routes: [
        {path: "/xxx", component: xxx}
    ]
})

export default router