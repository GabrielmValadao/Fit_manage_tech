import { flushPromises, mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

import { concatId } from '@/utils/tests/getComponent'
import CreateStudentWorkout from '../InstructorViews/CreateStudentWorkout.vue'
import GetExercises from '../../services/InstructorServices/GetExercises'
import CreateWorkoutService from '../../services/InstructorServices/CreateWorkoutService'
import { daysOfWeek } from '../../constants/Instructor/daysOfWeek'
import { getCurrentDay } from '../../utils/Instructor/getCurrentDay'

describe('Tela de cadastro de treino', () => {
  vi.spyOn(GetExercises, 'getAllUserExercises').mockResolvedValue([
    {
      id: 1,
      description: 'Exercício 1'
    },
    {
      id: 2,
      description: 'Exercício 2'
    },
    {
      id: 3,
      description: 'Exercício 3'
    }
  ])

  it('Espera-se que a tela seja renderizada', async () => {
    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    expect(component.exists()).toBe(true)
  })

  it('Espera-se que seja enviada corretamente a submissão do formulário', async () => {
    const spyCreateWorkout = vi
      .spyOn(CreateWorkoutService, 'createWorkout')
      .mockResolvedValue({ success: true })

    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    // Simular preenchimento dos campos do formulário
    component.getComponent(concatId('selected-exercise')).setValue(1)
    component.getComponent(concatId('repetitions-input')).setValue(10)
    component.getComponent(concatId('weight-input')).setValue(20.0)
    component.getComponent(concatId('break-input')).setValue(30)

    // Obter o dia da semana atual e encontrar seu nome completo usando getCurrentDay
    const currentDayValue = new Date().getDay() // Obtém o valor numérico do dia da semana atual
    const currentDayName = getCurrentDay(currentDayValue)

    // Mock do dayOfWeek com o dia da semana atual
    component.getComponent(concatId('day-input')).setValue(currentDayName)

    component.getComponent(concatId('observations-input')).setValue('Observações do treino')

    await component.find(concatId('submition-input')).trigger('submit')

    await flushPromises()

    expect(spyCreateWorkout).toBeCalled()
  })

  it('Espera-se que mostre um erro ao enviar o formulário sem preencher todos os campos', async () => {
    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    // Não preencher nenhum campo

    component.getComponent(concatId('submition-input')).trigger('submit')

    await flushPromises()

    expect(component.text()).toContain('O número de repetições deve ser um número')
    expect(component.text()).toContain('A carga deve ser um número')
  })
})

describe('Função getCurrentDay', () => {
  it('Deve retornar "SEGUNDA" para o valor 1', () => {
    expect(getCurrentDay(1)).toBe('SEGUNDA')
  })
})

describe('Teste da constante daysOfWeek', () => {
  it('Deve retornar "Segunda-feira" para o valor "SEGUNDA"', () => {
    const expectedTitle = 'Segunda-feira'
    const dayOfWeekObject = daysOfWeek.find((day) => day.value === 'SEGUNDA')
    const actualTitle = dayOfWeekObject.title

    expect(actualTitle).toBe(expectedTitle)
  })
})
