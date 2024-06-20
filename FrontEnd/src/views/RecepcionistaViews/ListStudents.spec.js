import { describe, it, expect, vi } from 'vitest'
import ListStudents from './ListStudents.vue'
import { flushPromises, mount } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import StudentService from '@/services/StudentService'
import { concatId } from '@/utils/tests/getComponent'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela lista de students', () => {
  vi.spyOn(StudentService, 'getAllStudents').mockResolvedValue([
    {
      name: 'Joana Silva',
      email: 'joana123@gmail.com',
      cpf: '323.456.789-00',
      id: 1
    },
    {
      name: 'Renata Oliveira',
      email: 'renata.oliveira@example.com',
      cpf: '234.567.890-01',
      id: 4
    },
    {
      name: 'Carlos Oliveira',
      email: 'carlosoliveira@email.com',
      cpf: '123.456.789-01',
      id: 2
    },
    {
      name: 'Maria Souza',
      email: 'maria.souza@example.com',
      cpf: '987.654.321-00',
      id: 3
    }
  ])

  it('Espera-se que a tela seja renderizada', () => {
    const component = mount(ListStudents, {
      global: {
        plugins: [vuetify]
      }
    })

    expect(component).toBeTruthy()
  })

  it('Espera que exiba a quantidade de linhas na tabela corretamente', async () => {
    const component = mount(ListStudents, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    expect(component.findAll(concatId('row-table'))).toHaveLength(4)
  })

  it('Espera que exiba pesquisa uma palavra, seja enviado o valor na função', async () => {
    const getAllStudents = vi
      .spyOn(StudentService, 'getAllStudents')
      .mockRejectedValue([{ name: 'Renata' }])

    const component = mount(ListStudents, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    component.getComponent(concatId('input-text')).setValue('Renata')

    await flushPromises()

    expect(getAllStudents).toBeCalled("Renata")
  })
})
