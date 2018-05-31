import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/pages/Pos'
import Shop from '@/components/pages/Shop'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/Pos',
        name: 'Pos',
        component: Pos
    }, {
        path: '/Shop',
        name: 'Shop',
        component: Shop
    }]
})