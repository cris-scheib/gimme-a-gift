import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/',
            name: 'auth',
            component: require('@/components/pages/Login').default,
            meta: {
                guest: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: require('@/components/pages/Dashboard').default,
            meta: {
                guest: false
            }
        },
        {
            path: '/me',
            name: 'me',
            component: require('@/components/pages/User').default,
            meta: {
                guest: false
            }
        },
        {
            path: '/movements-types',
            name: 'movements-types',
            component: require('@/components/pages/MovementsTypes').default,
            meta: {
                guest: false
            }
        },
        {
            path: '/movements',
            name: 'movements',
            component: require('@/components/pages/Movements').default,
            meta: {
                guest: false
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let token = localStorage.getItem('token')
        if (!token || token === 'null') next({ path: '/', params: { nextUrl: to.fullPath } })
        else next()
    } else if (to.matched.some(record => record.meta.guest)) {
        let token = localStorage.getItem('token')
        if (!token || token === 'null') next()
        else next({ name: 'dashboard' })
    } else {
        next()
    }
})

export default router