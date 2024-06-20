import { describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import ListStudentWorkout from './ListStudentWorkout.vue'
import InstructorListWorkoutsService from '@/services/InstructorListWorkoutsService'
import { concatId } from '@/utils/testes/getComponent'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Tela de listagem de treinos do estudante", () => {
    const workoutsApi = {
        "student_id": 1,
        "student_name": "Julio",
        "workouts": {
            "SEGUNDA": {
                "1": {
                    "id": 2,
                    "student_id": 1,
                    "exercise_id": 1,
                    "repetitions": 10,
                    "weight": "10.00",
                    "break_time": 10,
                    "observations": "ATE A FALHA",
                    "time": 10,
                    "user_id": 3,
                    "day": "SEGUNDA",
                    "exercise": {
                        "id": 1,
                        "description": "SUPINO"
                    }
                },
                "2": {
                    "id": 3,
                    "student_id": 1,
                    "exercise_id": 2,
                    "repetitions": 10,
                    "weight": "10.00",
                    "break_time": 10,
                    "observations": "ATE A FALHA",
                    "time": 10,
                    "user_id": 3,
                    "day": "SEGUNDA",
                    "exercise": {
                        "id": 2,
                        "description": "REMADA ALTA"
                    }
                }
            },
            "TERCA": [
                {
                    "id": 1,
                    "student_id": 1,
                    "exercise_id": 1,
                    "repetitions": 10,
                    "weight": "10.00",
                    "break_time": 10,
                    "observations": "ATE A FALHA ",
                    "time": 10,
                    "user_id": 3,
                    "day": "TERCA",
                    "exercise": {
                        "id": 1,
                        "description": "SUPINO"
                    }
                }
            ],
            "QUARTA": [],
            "QUINTA": [],
            "SEXTA": [],
            "SABADO": [],
            "DOMINGO": []
        }
    }

    vi.spyOn(InstructorListWorkoutsService, 'ListWorkouts').mockResolvedValue([workoutsApi]);

    it("Espera-se que a tela seja renderizada", () => {
        const component = mount(ListStudentWorkout, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()
    })

    it("Espera-se que exiba na tela os treinos", async () => {

        const component = mount(ListStudentWorkout, {
            global: {
                plugins: [vuetify]
            }
        })

        const workouts = await InstructorListWorkoutsService.ListWorkouts();

        expect(workouts).toEqual([workoutsApi]);

        expect(workouts[0].student_name).toContain("Julio");


        const segundaWorkouts = Object.values(workouts[0].workouts.SEGUNDA);

        expect(segundaWorkouts[0].exercise.description).toContain("SUPINO");
    });

    it("Espera-se que exiba um alerta de erro na tela quando tiver uma falha em carregar os dados", async () => {
        vi.spyOn(InstructorListWorkoutsService, 'ListWorkouts').mockRejectedValue([]);

        const alertSpy = vi.spyOn(window, 'alert');

        const component = mount(ListStudentWorkout, {
            global: {
                plugins: [vuetify],
            }
        });

        await flushPromises();

        expect(alertSpy).toHaveBeenCalledWith('Não foi possível acessar a lista de Treinos.');
    })

    it("Espera-se que tenha um botão utilizado para direcionar a um novo treino ", async () => {

        const component = mount(ListStudentWorkout, {
            global: {
                plugins: [vuetify]
            }
        })
        const addWorkout = component.getComponent(concatId('add-workout-button'));
        expect(addWorkout.exists()).toBeTruthy();

    });

})

