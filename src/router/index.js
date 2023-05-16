import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardModify from "@/components/board/BoardModify.vue"

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
        redirect: '/articles',
        children: [
            {
                path: '',
                name: 'boardlist',
                component: BoardList,
            },
            {
                path: 'write',
                name: 'boardwrite',
                component: BoardWrite,
            },
            {
                path: ':articleId',
                name: 'boardview',
                component: BoardView,
            },
            {
                path: ':articleId/modify',
                name: 'boardmodify',
                component: BoardModify,
            },
        ]
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
