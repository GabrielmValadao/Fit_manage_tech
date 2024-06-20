import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Login from './Login.vue'
import AuthenticationService from '@/services/Auth/AuthenticationService'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela de login', () => {
  it('Espera-se que a tela seja renderizada', () => {
    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
    expect(component).toBeTruthy()
  })

  it('Espera-se que o formulário seja renderizado', () => {
    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })

    expect(component.find('form').exists()).toBeTruthy()
    expect(component.find("[data-test='input-email']").exists()).toBeTruthy()
    expect(component.find("[data-test='input-password']").exists()).toBeTruthy()
    expect(component.find("[data-test='submit-button']").exists()).toBeTruthy()
  })

  it('Espera-se que o formulário seja validado', async () => {
    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })

    // evita que o erro de validação que estamos verificando nesse teste, polua o console
    console.log = () => {}

    component.getComponent("[data-test='submit-button']").trigger('submit')

    await flushPromises()

    expect(component.text()).toContain('Email é obrigatório')
    expect(component.text()).toContain('A senha é obrigatória')
  })

  it('Espera-se que ao submeter o formulário de login, a função correspondente seja executada', async () => {
    const login = vi.spyOn(AuthenticationService, 'login').mockResolvedValue({
      data: {
        token: 'token'
      }
    })

    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })

    await component.getComponent("[data-test='input-email']").setValue('test@gmail.com')
    await component.getComponent("[data-test='input-password']").setValue('12345678')
    await component.getComponent("[data-test='submit-button']").trigger('submit')

    await flushPromises()

    expect(login).toBeCalledTimes(1)
    expect(login).toBeCalledWith({ email: 'test@gmail.com', password: '12345678' })
  })

  it('Espera-se que ao submeter o formulário com credenciais inválidas, receba uma mensagem de erro', async () => {
    vi.spyOn(AuthenticationService, 'login').mockRejectedValue(new Error())

    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })

    await component.getComponent("[data-test='input-email']").setValue('invalid@gmail.com')
    await component.getComponent("[data-test='input-password']").setValue('wrongpassword')
    await component.getComponent("[data-test='submit-button']").trigger('submit')

    await flushPromises()

    expect(component.findComponent({ name: 'v-snackbar' }).exists()).toBe(true)
  })
})