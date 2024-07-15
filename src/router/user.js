import { compareTime } from 'element-plus/es/components/time-select/src/utils.mjs';

//用户路由
export const userRoute = {
    path: '/',
    component: () => import('../views/user/home.vue'),
    redirect: '/home',
    children: [
        {
            path: 'home',
            component: () => import('../views/user/page1.vue')
        },
        {
            path: 'login',
            component: () => import('../views/user/login.vue')
        },
        {
            path: 'notice',
            component: () => import('../views/user/notice.vue'),
        },
        {
            path: 'detail/:id',
            component: () => import('../views/user/noticedetail.vue'),
        },
        {
            path: '/singleInfo',
            component: () => import('../views/user/singleInfo.vue')
        },
        {
            path: '/feedback',
            component: () => import('../views/user/feedback.vue') 
        },
        {
            path: 'lookhouse',
            component: () => import('../views/user/page2.vue')
        },
        {
            path: 'search/1',
            component: () => import('../views/user/page2.vue'),

        },
        {
            path: 'search/2',
            component: () => import('../views/user/page3.vue'),

        },
        {
            path: 'result',
            component: () => import('../views/user/search_module.vue')
        },
        {
            path: 'detail',
            name: 'Detail',
            component: () => import('../views/user/detail_module.vue'),
            props: route => ({ homeInfo: JSON.parse(route.query.homeInfo) })
        },
        {
            path: 'problem',
            name: 'problem',
            component: () => import('../views/user/problem.vue'),
            redirect: '/problem/always',
            children: [
                {
                    path: 'always',
                    name: 'always',
                    component: () => import('../views/user/problem_module/always.vue'),
                },
                {
                    path: 'owner',
                    name: 'owner',
                    component: () => import('../views/user/problem_module/owner.vue'),
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/user/problem_module/login.vue'),
                },
                {
                    path: 'house',
                    name: 'house',
                    component: () => import('../views/user/problem_module/house.vue'),
                },
                {
                    path: 'order',
                    name: 'order',
                    component: () => import('../views/user/problem_module/order.vue'),
                },
                {
                    path: 'contract',
                    name: 'contract',
                    component: () => import('../views/user/problem_module/contract.vue'),
                },
            ]
        },

        {
            path: 'upContract',
            name: 'UpContract',
            component: () => import('../views/user/contract/upContract.vue'),
            props: route => ({
                homeInfo: JSON.parse(route.query.homeInfo),
                selectedValue:JSON.parse(route.query.selectedValue)
            })
        },
        {
            path: 'contract',
            name: 'Contract',
            component: () => import('../views/user/contract/contract.vue'),
            props: route => ({
                ruleForm: JSON.parse(route.query.ruleForm),
                homeInfo: JSON.parse(route.query.homeInfo),
                selectedValue:JSON.parse(route.query.selectedValue)
            })
        },
        {
            path: 'payment',
            name: 'Payment',
            component: () => import('../views/user/payment.vue'),
            props: route => ({
                homeInfo: JSON.parse(route.query.homeInfo),
                selectedValue: JSON.parse(route.query.selectedValue)
            })
        },


    ]

}