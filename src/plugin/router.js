import {createRouter, createWebHashHistory} from "vue-router"


const router = createRouter({
    linkActiveClass:"active-router",
    history: createWebHashHistory(),
    routes:[
        // {path:"/",redirect:"/login"},
        // {path:"/login",component:LoginPage}//,children:[]
    ]
})

export default router