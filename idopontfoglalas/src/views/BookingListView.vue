<template>
  <div>
    <h2>Elérhető időpontok</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nap</th>
          <th>Időpont</th>
          <th>Foglalás</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="slot in availableSlots" :key="slot.id">
          <td>{{ slot.date }}</td>
          <td>{{ slot.time }}</td>
          <td>
            <router-link :to="`/foglalas/${slot.id}`" class="btn btn-primary">
              Foglalás
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
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