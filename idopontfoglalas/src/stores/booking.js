import { defineStore } from 'pinia';
import axios from 'axios';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: []
  }),
  actions: {
    async fetchBookings() {
      const { data } = await axios.get('http://localhost:3000/bookings');
      this.bookings = data;
    },
    getAvailableSlots() {
      const allSlots = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, time: `${8 + i}:00` }));
      return allSlots.filter(slot => !this.bookings.some(b => b.time === slot.time));
    },
    async bookSlot(time, name, phone) {
      await axios.post('http://localhost:3000/bookings', { id: Date.now(), time, name, phone });
      await this.fetchBookings();
    }
  }
});