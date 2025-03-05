<template>
    <div>
        <h2>Elérhető időpontok</h2>
        <ul class="list-group">
            <li v-for="slot in availableSlots" :key="slot" class="list-group-item">
                <router-link :to="`/foglalas/${slot}`" class="btn btn-primary">{{ slot }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue'
    import { useBookingStore } from '@/stores/booking';

    const store = useBookingStore()
    const availableSlots = ref([])

    onMounted(async () => {
        availableSlots.value = await store.getAvailableSlots()
    })
</script>