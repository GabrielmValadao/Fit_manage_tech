<template>
  <div class="container">
    <v-snackbar v-model="success"
     color="#212121" 
     location="top center" 
     timeout="5000"  
     class="blink-snackbar">
    Treino excluído com sucesso!
  </v-snackbar>
    <v-card color="#ffc107">
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi mdi-account-supervisor</v-icon>
          <h1 class="py-14">Treinos {{ studentName }}</h1>
        </div>
        <img src="@/assets/logo.svg" alt="Logo" style="height: 80px;">
      </v-card-title>
    </v-card>
    <v-toolbar color="#757575">
      <v-btn 
      class="ml-auto"
      color="grey-darken-4 text-amber"
      type="submit"
      variant="elevated"
       size="large" 
       data-test="add-workout-button"
       @click="newWorkout">
        Novo Treino
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="days" centered color="#424242">
          <v-tab v-for="(day, index) in daysOfWeek" 
          :key="index" :value="day.value" 
          :prepend-icon="day.icon">{{
            day.label }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window v-model="days">
      <v-window-item 
      v-for="(day, index) in daysOfWeek" 
      :key="index" 
      :value="day.value">
          <v-table v-if="workoutsList.length > 0">
            <thead>
              <tr>
                <th class="head-descriptions">Exercício</th>
                <th class="head-descriptions">Peso</th>
                <th class="head-descriptions">Repetições</th>
                <th class="head-descriptions">Pausa (s)</th>
                <th class="head-descriptions">Tempo</th>
                <th class="head-descriptions">Observações</th>
                <th class="head-descriptions">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="workout in workoutsList" :key="workout.id">
                <td>{{ workout.exercise.description }}</td>
                <td>{{ workout.weight }} kg</td>
                <td>{{ workout.repetitions }}</td>
                <td>{{ workout.break_time }}</td>
                <td>{{ workout.time }}</td>
                <td>{{ workout.observations}}</td>
                <td>
                  <v-btn @click="updateWorkout(workout.id)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn data-test="delete-button" @click="deleteWorkout(workout.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div v-else 
          class="text-center py-4">
          Não há treinos para este dia.
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import InstructorListWorkoutsService from '@/services/InstructorListWorkoutsService.js'
import DeleteWorkoutService from '@/services/DeleteWorkoutService.js'

export default {
  data() {
    return {
      studentName: '',
      workoutsList: [],
      days: '',
      daysOfWeek: [
        { label: 'Segunda-feira', value: 'segunda', icon: 'mdi-arm-flex' },
        { label: 'Terça-feira', value: 'terca', icon: 'mdi-arm-flex' },
        { label: 'Quarta-feira', value: 'quarta', icon: 'mdi-arm-flex' },
        { label: 'Quinta-feira', value: 'quinta', icon: 'mdi-arm-flex' },
        { label: 'Sexta-feira', value: 'sexta', icon: 'mdi-arm-flex' },
        { label: 'Sábado', value: 'sabado', icon: 'mdi-arm-flex' },
        { label: 'Domingo', value: 'domingo', icon: 'mdi-arm-flex' }
      ],
      success: false,
      workoutId:''
    };
  },
  mounted() {
    this.loadWorkout();
    const currentDayIndex = new Date().getDay();
    const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    this.days = this.daysOfWeek[adjustedDayIndex].value;
  },
  watch: {
    days() {
      this.loadWorkout()
    }
  },
  methods: {
    async loadWorkout() {
      try {
        const studentId = this.$route.params.id;
        const response = await InstructorListWorkoutsService.ListWorkouts(studentId);
        this.studentName = response.student_name;
        const workouts = response.workouts;
        const currentDay = this.days.toUpperCase();
        if (workouts[currentDay]) {
          this.workoutsList = Object.values(workouts[currentDay]);
        } else {
          this.workoutsList = [];
        }
      } catch (error) {
        alert('Não foi possível acessar a lista de Treinos.');
      }
    },
    newWorkout() {
      this.$router.push(`/newWorkout/${this.$route.params.id}`);
    },
    updateWorkout(workoutId) {

      this.workoutId = workoutId;
      this.$router.push(`/updateWorkout/${this.$route.params.id}/${workoutId}`);
    },
    deleteWorkout(workoutId) {
  DeleteWorkoutService.DeleteWorkout(workoutId)
    .then(() => {
      this.success = true

      this.loadWorkout();
    })
    .catch(() => {
      alert('Erro ao excluir o treino.');
    });
}
  }
}
</script>
<style scoped>
.head-descriptions {
  background-color: #424242;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.1rem;
}
.blink-snackbar {
  animation: blink 1s infinite alternate; 
}

@keyframes blink {
  0% {
    opacity: 0; 
  }
  100% {
    opacity: 1; 
  }
}
</style>