import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import ViewSections from '../components/ViewSections.vue'
import EditSections from '../components/EditSections.vue'


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
  },
  {
    path: '/edit/:section_id',
    name: 'edit-sections',
    component: EditSections
  }
]

const router = new VueRouter({
  routes
})

export default router
