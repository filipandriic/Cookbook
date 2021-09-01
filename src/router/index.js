import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/receipts',
    name: 'Receipts',
    component: () => import('../views/Receipts.vue')
  },
  {
    path: '/addreceipt',
    name: 'Add Receipt',
    component: () => import('../views/AddReceipt.vue')
  },
  {
    path: '/myaccount',
    name: 'My Account',
    component: () => import('../views/MyAccount.vue')
  },
  {
    path: '/aboutus',
    name: 'About Us',
    component: () => import('../views/AboutUs.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
