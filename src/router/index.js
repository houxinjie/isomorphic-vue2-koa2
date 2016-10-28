import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexView from '../components/Index.vue'
import ListView from '../components/List.vue'
import ShowView from '../components/Show.vue'

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/', component: IndexView },
        { path: '/list', component: ListView },
        { path: '/:id', component: ShowView },
        { path: '*', redirect: '/' }
    ]
})
