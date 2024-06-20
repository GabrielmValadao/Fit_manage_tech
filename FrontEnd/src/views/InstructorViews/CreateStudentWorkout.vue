<template>
  <div class="container">
    <v-app>
      <v-main class="mt-6">
        <v-row>
          <v-col>
            <v-card color="#ffc107">
              <v-card-title class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-icon class="mr-2">mdi mdi-account-supervisor</v-icon>
                  <h1 class="py-6">{{ isUpdate ? 'Atualizar' : 'Novo' }} Treino</h1>
                </div>
                <img src="@/assets/logo.svg" alt="Logo" style="height: 80px" />
              </v-card-title>
            </v-card>
            <v-window>
              <v-window-item>
                <v-form class="ma-5" @submit.prevent="handleSubmit" v-if="exercises">
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        clearable
                        label="Selecione o exercício"
                        :items="exercises"
                        item-title="description"
                        item-value="id"
                        variant="outlined"
                        v-model="exercisesSelected"
                        data-test="selected-exercise"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="Repetições"
                        type="number"
                        min="0"
                        variant="outlined"
                        v-model="repetitionOfExercise"
                        :error-messages="errors.repetitions"
                        data-test="repetitions-input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Carga"
                        type="number"
                        min="0"
                        variant="outlined"
                        v-model="exerciseLoad"
                        :error-messages="errors.weight"
                        data-test="weight-input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="breakTime"
                        :items="[0, 15, 30, 45, 60, 75, 90, 105, 120]"
                        label="Selecionar pausa (em segundos)"
                        variant="outlined"
                        :error-messages="errors.break_time"
                        data-test="break-input"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                        label="Dia da semana"
                        variant="outlined"
                        :items="daysOfWeek"
                        v-model="dayOfWeek"
                        data-test="day-input"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        clearable
                        counter
                        clear-icon="mdi-close-circle"
                        label="Observações"
                        variant="outlined"
                        v-model="observations"
                        data-test="observations-input"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-col class="text-right">
                    <v-btn
                      class="font-weight-bold mr-4"
                      type="submit"
                      variant="elevated"
                      color="amber text-grey-darken-4"
                      size="large"
                      data-test="submition-input"
                    >
                      {{ isUpdate ? 'Atualizar' : 'Cadastrar' }}
                    </v-btn>
                    <router-link v-if="isUpdate" :to="'/instructor/' + studentId + '/workouts'">
                      <v-btn class="ml-auto" variant="elevated" size="large">
                        Voltar
                      </v-btn>
                    </router-link>
                  </v-col>
                </v-form>
                <v-snackbar
                  v-model="snackbarSuccess"
                  :timeout="duration"
                  color="success"
                  location="top"
                >
                  {{ successMessage }}
                </v-snackbar>
                <v-snackbar
                  v-model="snackbarError"
                  :timeout="duration"
                  color="red-darken-2"
                  location="top"
                >
                  {{ errorMessage }}
                </v-snackbar>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import * as yup from 'yup'
import { workoutSchema } from '@/validations/InstructorValidations/workout.validations'
import { captureErrorYup } from '../../utils/captureErrorYup'

import { getCurrentDay } from '../../utils/Instructor/getCurrentDay'
import { daysOfWeek } from '../../constants/Instructor/daysOfWeek'

import GetExercises from '../../services/InstructorServices/GetExercises'
import CreateWorkoutService from '../../services/InstructorServices/CreateWorkoutService'
import UpdateWorkoutService from '../../services/InstructorServices/UpdateWorkoutService'

export default {
  data() {
    return {
      exercises: [],
      exercisesSelected: null,
      repetitionOfExercise: '',
      exerciseLoad: '',
      breakTime: 45,
      dayOfWeek: getCurrentDay(new Date().getDay()),
      daysOfWeek: daysOfWeek,
      observations: '',
      snackbarSuccess: false,
      snackbarError: false,
      duration: 3000,
      errors: {},
      studentId: null, 
      workoutId: null,
      time: 0
    }
  },
  created() {
    this.loadExercises()
    this.extractIdsFromRouteParams()
  },
  methods: {
    loadExercises() {
      GetExercises.getAllUserExercises()
        .then((response) => {
          this.exercises = response.data.data
        })
        .catch(() => {
          this.snackbarError = true
          this.errorMessage = 'Falha ao carregar os exercícios cadastrados.'
        })
    },
    extractIdsFromRouteParams() {
      // Extrai os IDs da rota
      this.studentId = this.$route.params.id
      this.workoutId = this.$route.params.workoutId 
    },
    handleSubmit() {
  try {
    const body = {
      student_id: this.studentId,
      exercise_id: this.exercisesSelected,
      repetitions: this.repetitionOfExercise,
      weight: this.exerciseLoad,
      break_time: this.breakTime,
      observations: this.observations,
      day: this.dayOfWeek,
      time: this.time
    }

    const service = this.workoutId ? UpdateWorkoutService.updateWorkout : CreateWorkoutService.createWorkout
    const id = this.workoutId || null 

    workoutSchema.validateSync(body, { abortEarly: false })
    this.errors = {}

    service(body, id)
      .then(() => {
        this.snackbarSuccess = true
        this.successMessage = this.workoutId ? 'Treino atualizado com sucesso' : 'Treino cadastrado com sucesso'
        
        if (!this.workoutId) {
          this.exercisesSelected = ''
          this.repetitionOfExercise = ''
          this.exerciseLoad = ''
          this.breakTime = 45
          this.observations = ''
          this.dayOfWeek = getCurrentDay(new Date().getDay())

          // Redirecionar para a página de treinos do aluno após cadastrar novo treino
          this.$router.push(`/instructor/${this.studentId}/workouts`)
        }
      })
      .catch((error) => {
        if (error && error.response && error.response.data && error.response.data.message) {
          this.snackbarError = true
          this.errorMessage = `Erro ao ${this.workoutId ? 'atualizar' : 'cadastrar'} treino: ${error.response.data.message}`
        } else {
          this.snackbarError = true
          this.errorMessage = `Erro ao ${this.workoutId ? 'atualizar' : 'cadastrar'} treino.`
        }
      })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      this.errors = captureErrorYup(error)
      this.snackbarError = true
      this.errorMessage = 'Erro ao validar os dados.'
    }
  }
}},
  computed: {
    isUpdate() {
      return !!this.workoutId
    }
  }
}
</script>

<style scoped></style>