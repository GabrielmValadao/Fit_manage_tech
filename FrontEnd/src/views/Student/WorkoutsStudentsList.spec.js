import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { createVuetify } from 'vuetify'; 
import * as components from 'vuetify/components'; 
import * as directives from 'vuetify/directives'; 
import WorkoutsStudentsList from './WorkoutsStudentsList.vue';
import WorkoutsStudentsService from '@/services/Student/WorkoutsStudentsService';

const vuetify = createVuetify({ // Obrigatório
    components,
    directives,
});

global.ResizeObserver = require('resize-observer-polyfill'); 



describe("Tela Treinos por estudante", () => {
    const expectedWorkouts = {
        "student_id": 5,
        "name": "Julieta",
        "workouts": {
            "SEGUNDA": [
                {
                    "description": "Flexão",
                    "repetitions": 3,
                    "weight": "23.00",
                    "break_time": 2,
                    "observations": null,
                    "time": 3,
                    "created_at": null
                },
                {
                    "description": "Triceps",
                    "repetitions": 3,
                    "weight": "23.00",
                    "break_time": 2,
                    "observations": null,
                    "time": 3,
                    "created_at": null
                }
            ],
            "DOMINGO": [
                {
                    "description": "Flexão",
                    "repetitions": 3,
                    "weight": "23.00",
                    "break_time": 2,
                    "observations": null,
                    "time": 3,
                    "created_at": null
                }
            ],
        }
    };
    
    vi.spyOn(WorkoutsStudentsService, 'workoutsByStudentList').mockResolvedValue([expectedWorkouts]);

    it("Espera-se que a tela seja renderizada", () => {
        const component = mount(WorkoutsStudentsList, {
            global: {
                plugins: [vuetify]
            }
        });
    
        expect(component).toBeTruthy();
    });
    

    it("Deve retornar um objeto com os treinos de um aluno", async () => {
        const workouts = await WorkoutsStudentsService.workoutsByStudentList(5);

        expect(workouts).toEqual([expectedWorkouts]);

        expect(workouts[0].name).toContain("Julieta");
               
        expect(workouts[0].workouts.DOMINGO[0].description).toContain("Flexão");
    });  

    it("Espera-se que mostre um erro ao obter a resposta com array incompleto", async () => {        
        const workouts = await WorkoutsStudentsService.workoutsByStudentList(5);
        
        expect(workouts).not.toEqual([]);
       
        expect(workouts[0].name).not.toContain("Monica");
        
        expect(workouts[0].workouts.DOMINGO[0].description).not.toContain("Tríceps");
    });   
});
