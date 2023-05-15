import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from "@/views/IndexView.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/LoginView.vue')
  },
  {
    path: '/regist',
    name: 'regist',
    component: ()=>import('@/components/JoinForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
