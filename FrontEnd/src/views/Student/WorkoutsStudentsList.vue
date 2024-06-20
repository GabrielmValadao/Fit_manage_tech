<template>
  <div class="container">
    <v-card v-if="!formattedWorkouts.workouts || Object.keys(formattedWorkouts.workouts).length === 0" color="#424242" width="100%" class="px-6 py-6 mt-10 custom-card" elevation="10">     
      <v-card-text class="text-center">
        <img src="@/assets/StudentWorkouts/memsagemtreinos.jpg" alt="Memsagem treinos" width="300px"> <br>
        <h2 class="white-text">Prezado/a estudante {{ formattedWorkouts.name }}, ainda não há treinos agendados para você!</h2>
      </v-card-text>
    </v-card>
    <template v-else>
      <h1 class="title mt-10">Treinos - {{ formattedWorkouts.name }}</h1>

      <v-card color="#424242" width="100%" class="px-6 py-6 mt-4 custom-card-1" elevation="10">
        <v-toolbar-title class="orange-text">HOJE : {{ currentDay }}</v-toolbar-title>
        <br>
        
        <v-table v-if="formattedWorkouts.workouts[currentDay]">
          <tbody>
            <tr v-for="(workout, index) in formattedWorkouts.workouts[currentDay]" :key="index">
              <td class="orange-checkbox"><input type="checkbox"></td>
              <td>{{ workout.description }}</td>
              <td> | {{ workout.weight }} KG </td>
              <td> | {{ workout.repetitions }} repetições </td>
              <td> | {{ workout.break_time }} min de pausa</td>
            </tr>
          </tbody>
        </v-table>
        <template v-else>
          
          <p class="orange-text">Não há sessões de treinamento agendadas para hoje! <img src="@/assets/StudentWorkouts/memsagemtreinos1.jpg" alt="Memsagem treinos" width="50px"></p>
        </template>        
      </v-card>
      <br>

      <v-card class="custom-card" color="#424242" elevation="10" width="100%" >
        <v-toolbar color="#FFC107">
          <v-toolbar-title>TREINOS DA SEMANA</v-toolbar-title>
        </v-toolbar>

        <div class="d-flex flex-row py-3 px-2" >
          <v-tabs v-model="tab" direction="horizontal" color="#FFC107">
            <v-tab v-for="(day, index) in days" :key="index" :value="'option-' + (index + 1)">
              <v-icon v-if="icons[index]">{{ icons[index] }}</v-icon>
              {{ day }}
            </v-tab>
          </v-tabs>
        </div>     

        <v-window v-model="tab">
          <v-window-item v-for="(day, index) in days" :key="index" :value="'option-' + (index + 1)">
            <v-card flat>
              <v-card-text>
                <table>
                  <tr class="text-body-1" v-for="workout in formattedWorkouts.workouts[day]" :key="workout.id">
                    <td>{{ workout.description }}</td>
                    <td> | {{ workout.weight }} KG </td>
                    <td> | {{ workout.repetitions }} repetições </td>
                    <td> | {{ workout.break_time }} min de pausa</td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>        
      </v-card>
    </template>
  </div>
</template>

<script>
import WorkoutsStudentsService from '@/services/Student/WorkoutsStudentsService'

export default {
  data() {
    return {
      formattedWorkouts: {
        student_id: null,
        name: null,
        workouts: {}
      },
      today: ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'],

      tab: 'option-1', 
      days: ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'],
      icons: ['mdi-run', 'mdi-dumbbell', 'mdi-gymnastics', 'mdi-bike', 'mdi-arm-flex', 'mdi-jump-rope', 'mdi-weight-lifter']
    }
  },

  computed: {
    currentDay() {
      const todayIndex = new Date().getDay(); 
      return this.today[todayIndex]; 
    }
  },

  methods: {
    async fetchWorkoutsByStudent(studentId) {
      try {
        const data = await WorkoutsStudentsService.workoutsByStudentList(studentId);
        this.formattedWorkouts = data;
        console.log('Workouts:', this.formattedWorkouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        alert('Hubo un error');
      }
    }
  },

  mounted() {
    this.fetchWorkoutsByStudent();
  }
}
</script>

<style scoped>
.orange-text {
  color: #FFC107;
}

.orange-checkbox input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #FFC107;
  border-radius: 3px;
}

.orange-checkbox input[type="checkbox"]:checked {
  background-color: #FFC107;
}

.custom-card {
  border: 2px solid #FFC107; 
  border-radius: 18px;
}

.custom-card-1 {
  border: 2px solid #757575; 
  border-radius: 18px;
}

</style>