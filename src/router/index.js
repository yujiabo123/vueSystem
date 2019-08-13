import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Login from '@/components/Login.vue'
import User from '@/components/SecondLevel/User.vue'
import CellList from '@/components/CellList.vue'
import IncomeDetails from '@/components/Cells/IncomeDetails.vue'
import DownPlayers from '@/components/Cells/DownPlayers.vue'
import AgentManage from '@/components/Cells/AgentManage.vue'
import PlayerGet from '@/components/Cells/PlayerGet.vue'
import AgentGet from '@/components/Cells/AgentGet.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/index/cls',
      children: [{
        path: '/index/cls',
        name: 'CellList',
        component: CellList,
      }, {
        path: '/index/icd',
        name: 'IncomeDetails',
        component: IncomeDetails,
      }, {
        path: '/index/dps',
        name: 'DownPlayers',
        component: DownPlayers,
      }, {
        path: '/index/am',
        name: 'AgentManage',
        component: AgentManage,
      }]
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/pg',
      name: 'PlayerGet',
      component: PlayerGet,
    },
    {
      path: '/ag',
      name: 'AgentGet',
      component: AgentGet,
    },
    { path: '*', component: NotFound },
  ]
})
