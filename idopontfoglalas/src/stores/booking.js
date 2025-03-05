import { defineStore } from 'pinia'
import axios from 'axios'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: []
  }),
  actions: {
    async getAvailableSlots(){
      const {data: booked} = await axios.get('http://localhost:3000/bookings')
      const allSlots = Array.from({lenght: 8}, (_,i) => `${8 + i}:00`)
      return allSlots.filter(slot => !booked.some(b => b.time === slot))
    },
    async bookSlot(time, name, phone){
      await axios.post('http://localhost:3000/bookings', {time, name, phone})
    }
  }
})
