<template>
    <div>
      <h2>Elérhető időpontok</h2>
      <ul class="list-group">
        <li v-for="slot in availableSlots" :key="slot.id" class="list-group-item">
          <router-link :to="`/foglalas/${slot.id}`" class="btn btn-primary">
            {{ slot.date }} - {{ slot.time }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  
  const store = useBookingStore();
  const availableSlots = ref([]);
  
  onMounted(async () => {
    await store.fetchBookings();
    availableSlots.value = await store.getAvailableSlots();
  });
  </script>