<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Elérhető időpontok</h2>
    <table class="table table-bordered table-hover text-center">
      <thead class="table-dark">
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
            <router-link :to="`/foglalas/${slot.id}`" class="btn btn-primary">Foglalás</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const availableSlots = ref([]);

const fetchBookings = async () => {
  const { data } = await axios.get('http://localhost:3000/bookings');
  const bookedSlots = data.map(b => `${b.date}-${b.time}`);

  const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
  const allSlots = days.flatMap((day, index) => 
    Array.from({ length: 9 }, (_, i) => ({
      id: index * 10 + i + 1,
      date: day,
      time: `${8 + i}:00`
    }))
  );
  availableSlots.value = allSlots.filter(slot => !bookedSlots.includes(`${slot.date}-${slot.time}`));
};

onMounted(fetchBookings);
</script>