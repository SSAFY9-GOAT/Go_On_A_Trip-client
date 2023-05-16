import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexView
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/components/LoginView.vue')
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import(/* webpackChunkName: "board" */ '@/views/AppBoard.vue'),
        children: [{
            path: 'write',
            name: 'boardwrite',
            component: BoardWrite,
        }]
    },

    {
        path: '/regist',
        name: 'regist',
        component: () => import('@/components/JoinForm.vue')
    },
    {
        path:'/mypage',
        name: 'mypage',
        component: () => import('@/views/AppMypage.vue'),
        children: [
            {
                path: "",
                name:'info',
                component: () => import('@/components/member/UserInfo.vue')
            },
            {
                path: "modify",
                name:'modify',
                component: () => import('@/components/member/ModifyUser.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
