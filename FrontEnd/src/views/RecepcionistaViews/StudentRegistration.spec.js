import { expect, it, vi } from 'vitest'
import StudentRegistration from './StudentRegistration.vue'
import { flushPromises, mount } from '@vue/test-utils'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { concatId } from '@/utils/tests/getComponent'

import StudentRegistrationService from '@/services/StudentRegistrationService'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

it('Espera-se que a tela seja renderizada', () => {
    const component = mount(StudentRegistration, {
        global: {
            plugins: [vuetify]
        }
    })

    expect(component).toBeTruthy()
})

it('Espera-se que ao submenter o formulário, seja cadastrado o aluno com os valores correto', async () => {

    const createStudent = vi.spyOn(StudentRegistrationService, 'createStudent').mockResolvedValue({})

    const component = mount(StudentRegistration, {
        global: {
            plugins: [vuetify]
        }
    })

    await flushPromises()

    component.vm.photo = 'data:image/jpeg;base64,PHOTO_DATA_BASE64_STRING'
    component.getComponent(concatId("input-name")).setValue("Verônica Vilas")
    component.getComponent(concatId("input-email")).setValue("veronica@exemplo.com")
    component.getComponent(concatId("input-cpf")).setValue("123.456.789-99")
    component.getComponent(concatId("input-contact")).setValue("71912345678")
    component.getComponent(concatId("input-dateBirth")).setValue("2024-03-31")
    component.getComponent(concatId("input-cep")).setValue("40450690")
    component.getComponent(concatId("input-street")).setValue("Rua Professor")
    component.getComponent(concatId("input-number")).setValue("01")
    component.getComponent(concatId("input-neighborhood")).setValue("Uruguai")
    component.getComponent(concatId("input-complement")).setValue("3° andar")
    component.getComponent(concatId("input-city")).setValue("Salvador")
    component.getComponent(concatId("input-state")).setValue("BA")

    component.getComponent(concatId("submit-button")).trigger("submit")

    expect(createStudent).toBeCalled()
})

it("Espera-se que ao submeter o formulário sem as informações obrigatórias, exiba os erros em tela", async () => {
    const component = mount(StudentRegistration, {
        global: {
            plugins: [vuetify]
        }
    })

    await flushPromises()

    component.getComponent(concatId("input-name")).setValue("")
    component.getComponent(concatId("input-email")).setValue("")
    component.getComponent(concatId("input-cpf")).setValue("")
    component.getComponent(concatId("input-contact")).setValue("")
    component.getComponent(concatId("input-cep")).setValue("")
    component.getComponent(concatId("input-street")).setValue("")
    component.getComponent(concatId("input-number")).setValue("")
    component.getComponent(concatId("input-neighborhood")).setValue("")
    component.getComponent(concatId("input-city")).setValue("")
    component.getComponent(concatId("input-state")).setValue("")
    component.getComponent(concatId("submit-button")).trigger("submit")

    await flushPromises()

    expect(component.text()).toContain("O nome é obrigatório")
    expect(component.text()).toContain("O email é obrigatório")
    expect(component.text()).toContain("O CPF deve estar no formato 000.000.000-00")
    expect(component.text()).toContain("O telefone é obrigatório")
    expect(component.text()).toContain("O CEP é obrigatório")
    expect(component.text()).toContain("O logradouro é obrigatório")
    expect(component.text()).toContain("O número da residência é obrigatório")
    expect(component.text()).toContain("O bairro é obrigatório")
    expect(component.text()).toContain("A cidade é obrigatória")
    expect(component.text()).toContain("O estado é obrigatório")
})

