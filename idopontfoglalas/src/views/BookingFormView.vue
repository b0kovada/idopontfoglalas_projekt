<template>
    <div>
      <h2>Foglalás</h2>
      <div v-if="slot">
        <h3>Időpont: {{ slot.date }} - {{ slot.time }}</h3>
        <form @submit.prevent="submitBooking">
          <div class="mb-3">
            <label>Név:</label>
            <input v-model="name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label>Telefonszám:</label>
            <input v-model="phone" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success">Foglalás</button>
        </form>
      </div>
      <div v-else>
        <p>Időpont nem található!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useBookingStore } from '@/stores/booking';
  import { useToast } from 'vue-toastification';
  
  const route = useRoute();
  const router = useRouter();
  const store = useBookingStore();
  const toast = useToast();
  
  const slot = ref(null);
  const name = ref('');
  const phone = ref('');
  
  const loadSlot = async () => {
    await store.fetchBookings();
    slot.value = store.getAvailableSlots().find(b => b.id == route.params.id);
  };
  
  onMounted(loadSlot);
  watch(() => route.params.id, loadSlot);
  
  const submitBooking = async () => {
    if (!slot.value) return;
    await store.bookSlot(slot.value.date, slot.value.time, name.value, phone.value);
    toast.success('Foglalás sikeres!');
    router.push('/');
  };
  </script>