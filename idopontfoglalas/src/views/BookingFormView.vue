<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-lg">
      <div v-if="slot">
        <h3 class="text-center">Időpont: {{ slot.date }} - {{ slot.time }}</h3>
        <form @submit.prevent="submitBooking">
          <div class="mb-3">
            <label class="form-label">Név:</label>
            <input v-model="name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Telefonszám:</label>
            <input v-model="phone" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success w-100">Foglalás</button>
        </form>
      </div>
      <div v-else>
        <p class="text-danger text-center">Időpont nem található!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { Guid } from 'js-guid';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const slot = ref(null);
const name = ref('');
const phone = ref('');

const fetchSlot = async () => {
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
  slot.value = allSlots.find(s => s.id == route.params.id && !bookedSlots.includes(`${s.date}-${s.time}`));
};

onMounted(fetchSlot);

const submitBooking = async () => {
  if (!slot.value) return;
  await axios.post('http://localhost:3000/bookings', { id: Guid.newGuid().toString(), date: slot.value.date, time: slot.value.time, name: name.value, phone: phone.value });
  toast.success(`Foglalás sikeres: ${slot.value.date} - ${slot.value.time} időpontra`);
  router.push('/');
};
</script>