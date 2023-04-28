import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminView from '../views/Admin.vue'
import QueueListView from '../views/Queues.vue'
import QueueSingleView from '../views/Queue.vue'
import QueueEditView from '../views/QueueEdit.vue'
import QueueHistoryView from '../views/QueueHistory.vue'
import TestView from '../views/Test.vue'
import Bookings from '../views/Bookings.vue'
import Booking from '../views/Booking.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/queues' },
  { path: '/admin', component: AdminView },
  { path: '/queues', component: QueueListView },
  { path: '/queues/:name', component: QueueSingleView },
  { path: '/queues/:name/edit', component: QueueEditView },
  { path: '/queues/:name/history', component: QueueHistoryView },
  { path: '/test', component: TestView },
  { path: '/bookings', component: Bookings },
  { path: '/bookings/:name', component: Booking },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
