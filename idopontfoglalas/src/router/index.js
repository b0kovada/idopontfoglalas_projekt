import { createRouter, createWebHistory } from 'vue-router'
import BookingFormView from '@/views/BookingFormView.vue'
import BookingListView from '@/views/BookingListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Foglalás Lista',
      component: BookingListView
    },
    {
      path: '/foglalas/:id',
      name: 'Foglalás',
      component: BookingFormView
    },
  ],
})

export default router
