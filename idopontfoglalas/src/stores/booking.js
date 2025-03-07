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
      const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
      const allSlots = days.flatMap((day, dayIndex) => 
        Array.from({ length: 8 }, (_, i) => ({
          id: dayIndex * 10 + i + 1,
          date: day,
          time: `${8 + i}:00`
        }))
      );
      return allSlots.filter(slot => !this.bookings.some(b => b.date === slot.date && b.time === slot.time));
    },
    async bookSlot(date, time, name, phone) {
      await axios.post('http://localhost:3000/bookings', { id: Date.now(), date, time, name, phone });
      await this.fetchBookings();
    }
  }
});