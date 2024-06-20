import { describe, expect, it, vi } from 'vitest';
import Dashboard from '../Dashboard/Dashbord.vue'
import { mount } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela de Dashboard', () => {
  it('Espera-se que a tela seja renderizada', () => {
    const component = mount(Dashboard, {
      global: {
        plugins: [vuetify]
      }
    })
    expect(component).toBeTruthy()
  })

  it('Espera-se que o DashboardAdmin seja renderizado quando o perfil for ADMIN', async () => {
    localStorage.setItem('@profile', 'ADMIN');
  
    const component = mount(Dashboard, {
      global: {
        plugins: [vuetify]
      }
    });
  
    await component.vm.$nextTick();

    const dashboardAdminComponent = component.findComponent({ name: 'DashboardAdmin' });
    expect(dashboardAdminComponent.exists()).toBe(true);
  });

  it('Espera-se que o DashboardInstructor seja renderizado quando o perfil for Instrutor', async () => {
    localStorage.setItem('@profile', 'INSTRUTOR');
  
    const component = mount(Dashboard, {
      global: {
        plugins: [vuetify]
      }
    });
  
    await component.vm.$nextTick();

    const dashboardAdminComponent = component.findComponent({ name: 'DashboardInstructor' });
    expect(dashboardAdminComponent.exists()).toBe(true);
  });

  it('Espera-se que o DashboardNutritionist seja renderizado quando o perfil for Nutricionista', async () => {
    localStorage.setItem('@profile', 'NUTRICIONISTA');
  
    const component = mount(Dashboard, {
      global: {
        plugins: [vuetify]
      }
    });
  
    await component.vm.$nextTick();

    const dashboardAdminComponent = component.findComponent({ name: 'DashboardNutritionist' });
    expect(dashboardAdminComponent.exists()).toBe(true);
  });

  it('Espera-se que o DashboardReceptionist seja renderizado quando o perfil for Recepcionista', async () => {
    localStorage.setItem('@profile', 'RECEPCIONISTA');
  
    const component = mount(Dashboard, {
      global: {
        plugins: [vuetify]
      }
    });
  
    await component.vm.$nextTick();

    const dashboardAdminComponent = component.findComponent({ name: 'DashboardReceptionist' });
    expect(dashboardAdminComponent.exists()).toBe(true);
  });

  it('Espera-se que o DashboardStudent seja renderizado quando o perfil for Estudante', async () => {
    localStorage.setItem('@profile', 'ALUNO');
  
    const component = mount(Dashboard, {
      global: {
        plugins: [vuetify]
      }
    });
  
    await component.vm.$nextTick();

    const dashboardAdminComponent = component.findComponent({ name: 'DashboardStudent' });
    expect(dashboardAdminComponent.exists()).toBe(true);
  });

})
