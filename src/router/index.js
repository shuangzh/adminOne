import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'

import LoginPage from '@/components/LoginPage'
import MainPage from '@/components/MainPage'

import E404 from '@/components/E404'

Vue.use(Router)

const router =   new Router({
    routes:[
        {
            path:'/',
            name:'Hello',
            component:Hello
        },
        {
            path:'/login',
            name:'/login-page',
            component:LoginPage
        },
        {
            path:'/main',
            name:'main-page',
            component:MainPage,
            // children:[
            //     {
            //         path:'userman',
            //         component:UerMan,
            //         name:'userman',
            //         meta: {
            //             title:'用户管理'
            //         }
            //     },
            //     {
            //         path:'roleman',
            //         component:RoleMan,
            //         name:'roleman',
            //         meta:{
            //             title:'角色管理'
            //         }
            //     },
            // ]
        },
        {
            path:"*",
            component:E404
        }
    ]
})

router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    // console.log(this)
    next()
})

export default router