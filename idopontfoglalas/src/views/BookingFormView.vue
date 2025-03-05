<template>
    <div>
        <h2>Foglalás {{ $route.params.time }}</h2>
        <form @submit.prevent="submitBooking">
            <div class="mb-3">
                <label>Név</label>
                <input v-model="name" class="form-control" required>
            </div>
            <div class="mb-3">
                <label>Telefonszám</label>
                <input v-model="phone" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">Foglalás</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBookingStore } from '@/stores/booking';
import {useToast} from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const store = useBookingStore()
const toast = useToast()

const time = route.params.time
const name = ref('')
const phone = ref('')

const submitBooking = async() =>{
    await store.bookSlot(time, name.value, phone.value)
    toast.success('Foglalás sikeres!')
    router.push('/')
}
</script>