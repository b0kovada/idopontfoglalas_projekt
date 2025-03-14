import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BookingFormView from '@/views/BookingFormView.vue';
import BookingListView from '@/views/BookingListView.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('axios');

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/foglalas/1', component: BookingFormView }],
});

describe('BookingListView.vue', () => {
  it('fetches and displays available slots', async () => {
    axios.get.mockResolvedValue({ data: [{ date: 'Hétfő', time: '10:00' }] });
    const wrapper = mount(BookingListView);
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(wrapper.text()).toContain('Hétfő');
    expect(wrapper.text()).toContain('10:00');
  });
});

describe('BookingFormView.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BookingFormView, {
      global:{plugins: [router]}
    });
    expect(wrapper.exists()).toBe(true);
  });
});