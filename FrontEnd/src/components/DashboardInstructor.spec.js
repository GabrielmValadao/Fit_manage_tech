import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DashboardInstructor from './DashboardInstructor.vue'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

const mockLocalStorage = {
  getItem: vi.fn()
}
global.localStorage = mockLocalStorage

beforeEach(() => {
  vi.mock('axios', () => ({
    default: {
      get: vi.fn(() =>
        Promise.resolve({ data: { registered_students: 5, registered_exercises: 10 } })
      )
    }
  }))
})

describe('DashboardInstructor', () => {
  it('Deve montar o componente com sucesso.', () => {
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn()
          }
        }
      }
    })

    expect(wrapper.exists()).toBeTruthy()
  })

  it('Deve exibir o nome do usuário vindo do localStorage na mensagem de boas-vindas.', async () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === '@name') return 'Usuário Teste'
      return null
    })

    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn()
          }
        }
      }
    })

    await flushPromises()

    const userNameText = wrapper.find('[data-test="user-name"]').text()
    expect(userNameText).toContain('Usuário Teste')
  })

  it('Deve atualizar a frase aleatória quando o cartão do título é clicado.', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn()
          }
        }
      }
    })

    await wrapper.vm.$nextTick()

    await wrapper.find('.title-card').trigger('click')

    await wrapper.vm.$nextTick()

    const phraseText = wrapper.find('[data-test="random-phrase"]').text()
    expect(phraseText).toBe(wrapper.vm.frases[0])
  })

  it('Deve renderizar os textos estáticos corretamente para os cards de alunos e exercícios.', () => {
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn()
          }
        }
      }
    })

    expect(wrapper.find('.text-h5').text()).toContain('ALUNOS')
    expect(wrapper.find('.text-h5').text()).toContain('CADASTRADOS')

    const exercisesTextContent = wrapper.findAll('.text-h5').at(1).text()
    expect(exercisesTextContent).toContain('EXERCÍCIOS')
    expect(exercisesTextContent).toContain('CADASTRADOS')
  })

  it('Deve atualizar o número de alunos e exercícios cadastrados corretamente após a chamada da API.', async () => {
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn()
          }
        }
      }
    })

    await flushPromises()

    const registeredStudentsText = wrapper.find('[data-test="registeredStudents"]').text()
    expect(registeredStudentsText).toContain('5')
    const registeredExercisesText = wrapper.find('[data-test="registeredExercises"]').text()
    expect(registeredExercisesText).toContain('10')
  })

  it('Deve redirecionar para a página correta ao clicar nos botões "ADICIONAR"', async () => {
    const $router = {
      push: vi.fn()
    }
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router
        }
      }
    })

    await wrapper.find('[data-test="add-students-button"]').trigger('click')
    expect($router.push).toHaveBeenCalledWith('/instructor/students')

    await wrapper.find('[data-test="add-exercises-button"]').trigger('click')
    expect($router.push).toHaveBeenCalledWith('/exercises')
  })

  it('Deve redirecionar para a página correta ao clicar nos cards respectivos de alunos e exercícios.', async () => {
    const $router = {
      push: vi.fn()
    }
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router
        }
      }
    })

    await wrapper.find('[data-test="students-card"]').trigger('click')
    expect($router.push).toHaveBeenCalledWith('/instructor/students')

    await wrapper.find('[data-test="exercises-card"]').trigger('click')
    expect($router.push).toHaveBeenCalledWith('/exercises')
  })
})
