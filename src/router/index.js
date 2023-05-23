import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from "@/views/IndexView.vue";

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
        router.push({name: "login"});
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
        path: '/naverLogin',
        name: 'naverCallback',
        component: () => import('@/components/member/NaverCallback.vue')
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
                component: () => import('@/components/board/BoardList.vue'),
            },
            {
                path: 'write',
                name: 'boardwrite',
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/board/BoardWrite.vue'),
            },
            {
                path: ':articleId',
                name: 'boardview',
                component: () => import('@/components/board/BoardView.vue'),
            },
            {
                path: ':articleId/modify',
                name: 'boardmodify',
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/board/BoardModify.vue'),
            },
        ]
    },
    {
        path: '/regist',
        name: 'regist',
        component: () => import('@/components/JoinForm.vue')
    },
    {
        path: '/mypage',
        name: 'mypage',
        component: () => import('@/views/AppMypage.vue'),
        children: [
            {
                path: "",
                name: 'info',
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/member/UserInfo.vue')
            },
            {
                path: "modify",
                name: 'modify',
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/member/ModifyUser.vue')
            },
            {
                path: "modifyPw",
                name: 'modifyPw',
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/member/ModifyPassword.vue')
            },
            {
                path: "withdrawal",
                name: "withdrawal",
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/member/WithdrawalUser.vue')
            }
        ]
    },
    {
        path: "/findPassword",
        name: "findPw",
        component: () => import('@/components/member/FindPassword.vue')
    },
    {
        path: "/tripplan",
        name: "tripplan",
        component: () => import('@/views/AppTripPlan.vue'),
        redirect: "/tripplan",
        children: [
            {
                path: "",
                name: "tripplanlist",
                component: () => import('@/components/tripplan/TripPlanList.vue'),
            },
            {
                path: "/write",
                name: "tripplanwrite",
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/tripplan/TripPlanWrite.vue'),
            },
            {
                path: ":tripPlanId",
                name: "tripplanview",
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/tripplan/TripPlanView.vue'),

            }
        ]
    },
    {
        path: "/hotplaces",
        name: 'hotplaces',
        redirect: "hotplaces",
        component: () => import('@/views/AppHotPlace.vue'),
        children: [
            {
                path: "",
                name: 'hotplace-list',
                component: () => import('@/components/hotplace/HotplaceList.vue')
            },
            {
                path: "write",
                name: 'hotplace-write',
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/hotplace/HotplaceWrite.vue')
            },
            {
                path: ":hotPlaceId",
                name: 'hotplace-detail',
                beforeEnter: onlyAuthUser,
                component: () => import('@/components/hotplace/HotplaceDetail.vue')
            }
        ]
    },
    {
        path: "/notice",
        name: 'notice',
        component: () => import('@/views/AppNotice.vue'),
        children: [
            {
                path: "",
                name: 'notice',
                component: () => import('@/components/notice/NoticeList.vue')
            },
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
