import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/', // 设置根路径
        name: 'homeView',
        component: () => import('/@/views/homeView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
