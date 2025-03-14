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
  it('Idopontok megjelenitese', async () => {
    axios.get.mockResolvedValue({ data: [{ date: 'Hétfő', time: '10:00' }] });
    const wrapper = mount(BookingListView);
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(wrapper.text()).toContain('Hétfő');
    expect(wrapper.text()).toContain('10:00');
  });
});

describe('BookingListView.vue', () => {
  it('Helyesen megjelenik', () => {
    const wrapper = mount(BookingListView);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('BookingListView.vue', () => {
  it('Osszes elerheto idopont megjelenik', async () => {
    axios.get.mockResolvedValue({ data: [] });
    const wrapper = mount(BookingListView);
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(wrapper.text()).toContain('Elérhető időpontokNapIdőpontFoglalásHétfő8:00FoglalásHétfő9:00FoglalásHétfő10:00FoglalásHétfő11:00FoglalásHétfő12:00FoglalásHétfő13:00FoglalásHétfő14:00FoglalásHétfő15:00FoglalásHétfő16:00FoglalásKedd8:00FoglalásKedd9:00FoglalásKedd10:00FoglalásKedd11:00FoglalásKedd12:00FoglalásKedd13:00FoglalásKedd14:00FoglalásKedd15:00FoglalásKedd16:00FoglalásSzerda8:00FoglalásSzerda9:00FoglalásSzerda10:00FoglalásSzerda11:00FoglalásSzerda12:00FoglalásSzerda13:00FoglalásSzerda14:00FoglalásSzerda15:00FoglalásSzerda16:00FoglalásCsütörtök8:00FoglalásCsütörtök9:00FoglalásCsütörtök10:00FoglalásCsütörtök11:00FoglalásCsütörtök12:00FoglalásCsütörtök13:00FoglalásCsütörtök14:00FoglalásCsütörtök15:00FoglalásCsütörtök16:00FoglalásPéntek8:00FoglalásPéntek9:00FoglalásPéntek10:00FoglalásPéntek11:00FoglalásPéntek12:00FoglalásPéntek13:00FoglalásPéntek14:00FoglalásPéntek15:00FoglalásPéntek16:00Foglalás');
  });
});

describe('BookingFormView.vue', () => {
  it('Helyesen megjelenik', () => {
    const wrapper = mount(BookingFormView, {
      global:{plugins: [router]}
    });
    expect(wrapper.exists()).toBe(true);
  });
});