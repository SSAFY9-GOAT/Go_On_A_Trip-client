import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardModify from "@/components/board/BoardModify.vue"

import store from "@/store";

Vue.use(VueRouter)

const onlyAuthUser = async (to, from, next) => {
    const checkUserInfo = store.getters["memberStore/checkUserInfo"];
    const checkToken = store.getters["memberStore/checkToken"];
    let token = sessionStorage.getItem("access-token");
    console.log("로그인 처리 전", checkUserInfo, token);

    if (checkUserInfo != null && token) {
        console.log("토큰 유효성 체크하러 가자!!!!");
        await store.dispatch("memberStore/getUserInfo", token);
    }
    if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        // next({ name: "login" });
        router.push({ name: "login" });
    } else {
        console.log("로그인 했다!!!!!!!!!!!!!.");
        next();
    }
};


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
        path: '/attraction',
        name: 'attraction',
        component: () => import(/* webpackChunkName: "attraction" */ '@/views/AppAttraction.vue')
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
                beforeEnter: onlyAuthUser,
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
                beforeEnter: onlyAuthUser,
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
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/member/UserInfo.vue')
            },
            {
                path: "modify",
                name:'modify',
                beforeEnter: onlyAuthUser,
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
