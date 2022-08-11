import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import ViewSections from '../components/ViewSections.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard
  },
  {
    path: '/:section_id',
    name: 'view-sections',
    component: ViewSections
  }
]

const router = new VueRouter({
  routes
})

export default router
