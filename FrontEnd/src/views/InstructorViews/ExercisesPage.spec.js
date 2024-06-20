import { describe, expect, it, vi } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'

import ExercisePage from './ExercisesPage.vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ExerciseService from '@/services/ExerciseService'
import ExercisesPage from './ExercisesPage.vue'
import { concatId } from '@/utils/testes/getComponent'

const vuetify = createVuetify({
    components,
    directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela de Exercícios', () => {

    vi.spyOn(ExerciseService, 'getAllExercises').mockResolvedValue([
        {
            "id": 1,
            "description": "Supino"
        },
        {
            "id": 2,
            "description": "Halter"
        },
        {
            "id": 3,
            "description": "Jump"
        }
    ])

    it('Deve renderizar a tela corretamente', () => {
        const component = mount(ExercisePage, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()
        
    })

    it('Deve exibir mensagem de erro ao submeter o formulário com campos vazios', async () => {
        const wrapper = mount(ExercisePage, {
            global: {
                plugins: [vuetify]
            }
        })

        wrapper.find('form').trigger('submit')

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.errors.description).toBeTruthy()
    })

    it('Deve exibir mensagem de erro ao submeter o formulário com descrição muito longa', async () => {
        const wrapper = mount(ExercisePage, {
            global: {
                plugins: [vuetify]
            }
        })

        const longDescription = 'a'.repeat(151)

        await wrapper.setData({ description: longDescription })

        wrapper.find('form').trigger('submit')

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.errors.description).toBeTruthy()
    })

    it('Deve exibir mensagem de sucesso ao cadastrar um exercício', async () => {

        const createExercise = vi.spyOn(ExerciseService, 'createExercise').mockResolvedValue({ success: true });

        const component = mount(ExercisesPage, {
            global: {
                plugins: [vuetify]
            }
        })

        component.getComponent(concatId("input-description")).setValue("Supino")

        component.getComponent(concatId("submit-button")).trigger("submit")

        await flushPromises()

        expect(createExercise).toBeCalledWith({

            description: 'Supino',

        })

    })

    it('Deve exibir mensagem de erro ao tentar cadastrar um exercício que já existe', async () => {

        const createExercise = vi.spyOn(ExerciseService, 'createExercise').mockRejectedValueOnce(new Error('Exercício já existe'));

        const component = mount(ExercisesPage, {
            global: {
                plugins: [vuetify]
            }
        });

        component.getComponent(concatId("input-description")).setValue('Supino');

        component.getComponent(concatId("submit-button")).trigger("submit");

        await flushPromises();

        expect(createExercise).toBeCalledWith({
            description: 'Supino',
        });

    });

    it("Espera-se exiba na tela os nomes dos exercícios", async () => {
        const mockedExercises = [
            { "id": 1, "description": "Supino" },
            { "id": 2, "description": "Halter" },
            { "id": 3, "description": "Jump" }
        ]
        vi.spyOn(ExerciseService, 'getAllExercises').mockResolvedValue(mockedExercises)

        const component = mount(ExercisesPage, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        const renderedDescriptions = component.findAll(concatId("exercise-description"))

        mockedExercises.forEach(exercise => {
            expect(renderedDescriptions.filter(description => description.text() === exercise.description)).toBeTruthy();
        });
    })

})
