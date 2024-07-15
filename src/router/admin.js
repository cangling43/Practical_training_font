import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import houseApis from '@/apis/houseApis.js';



//后台路由
export const adminRoute = {

    path: '/admin',
    component: () => import('../views/admin/adminView.vue'),
    redirect: '/admin/home',
    children: [
        {
            path: 'home',
            component: () => import('../views/admin/homeView.vue')
        },
        {
            path: 'user',
            children: [
                {
                    path: 'list',
                    component: () => import('../views/admin/user/userList.vue')
                },
                {
                    path: 'addUser',
                    component: () => import('../views/admin/user/userAdd.vue')
                },
                {
                    path: 'liuyan',
                    children: [
                        {
                            path: 'list',
                            component: () => import('../views/admin/liuyan/liuyan.vue')
                        },

                    ]
                }


            ]
        },
        {
            path: 'house',
            children: [
                {
                    path: 'list',
                    component: () => import("@/views/admin/house/houseList.vue"),
                },

                {
                    path: 'detail/:id',
                    component: () => import('../views/admin/house/houseDetail.vue'),
                }
            ]
        },
        {
            path: 'news',
            children: [
                {
                    path: '',
                    component: () => import('../views/admin/news/newsList.vue'),
                },
                {
                    path: 'add',
                    component: () => import('../views/admin/news/newsAdd.vue')
                },
                {
                    path: 'detail/:id',
                    component: () => import('../views/user/noticedetail.vue'),
                },

            ]
        },
      
    ]

}
