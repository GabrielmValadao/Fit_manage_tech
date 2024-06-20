import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

/* Configuração do vuetify */
import { createVuetify } from 'vuetify' // obrigatório
import * as components from 'vuetify/components' // obrigatório
import * as directives from 'vuetify/directives' // obrigatório

const vuetify = createVuetify({ // obrigatório
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill') // obrigatório

import StudentMealPlans from './StudentMealPlans.vue'
import MealPlanService from '@/services/Student/MealPlanService'



    describe("Tela StudentMealPlans", () => {

        it('Espera-se que a tela seja renderizada', ()=> {
            vi.spyOn(MealPlanService, 'getAllMealPlans').mockResolvedValue(
                [
                    {
                        "id": 1,
                        "description": "Emagrecimento",
                    }
                ]
            )
            const component = mount(StudentMealPlans, {
                global:{
                    plugins: [vuetify]
                }
            })
            expect(component).toBeTruthy()
        })

        it('Usa o select escolhendo o Meal Plan', async ()=> {

            const spyGetPlans = vi.spyOn(MealPlanService, 'getPlanSchedule').mockResolvedValue({})

            const component = mount(StudentMealPlans, {
                global:{
                    plugins: [vuetify]
                }
            })
            component.getComponent("[data-test='select-plans']").setValue('1')
            await flushPromises()
            expect(spyGetPlans).toBeCalled()
        })

        it('Espera-se que apareça um erro caso a tela seja carregada e GetAllMealPlans apresente um erro', async () => {
            vi.spyOn(MealPlanService, 'getAllMealPlans').mockRejectedValue(new Error('Erro ao buscar planos de alimentação'));
        
            const component = mount(StudentMealPlans, {
                global: {
                    plugins: [vuetify]
                }
            });
        
            await flushPromises();
        
            expect(component.find("[data-test='snackbar']").exists());
                });
    })