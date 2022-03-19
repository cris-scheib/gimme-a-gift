import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'login',
            component: require('@/components/pages/Login').default,
            meta: {
                guest: true
            }
        },
        {
            path: '/relatorios',
            name: 'relatorios',
            component: require('@/components/pages/Relatorios').default,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/pagamentos',
            name: 'pagamentos',
            component: require('@/components/pages/Pagamentos').default,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/minha-conta',
            name: 'minha-conta',
            component: require('@/components/pages/Usuario').default,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/',
            name: 'listas-de-presentes',
            component: require('@/components/pages/ListasPresentes').default,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/listas-de-presente',
            name: 'listas-de-presente',
            component: require('@/components/pages/ListaPresentes').default,
            meta: {
                requiresAuth: false
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let token = localStorage.getItem('token')
        if (!token || token === 'null') next({ path: '/login', params: { nextUrl: to.fullPath } })
        else next()
    } else if (to.matched.some(record => record.meta.guest)) {
        let token = localStorage.getItem('token')
        if (!token || token === 'null') next()
        else next({ name: 'listas-de-presentes' })
    } else {
        next()
    }
})

export default router