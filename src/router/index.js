import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import LoginPage from '@/components/LoginPage'

Vue.use(Router)

export default new Router({
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
        }
    ]
})