<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">

    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Exercícios</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-weight-lifter</v-icon>
    </div>

    <div class="cardImage">
      <div class="cardContent" :style="smAndDown ? 'flex-direction: column;  padding:8%' : 'flex-direction: row'">

        <v-form @submit.prevent="addExercise" ref="form" class="d-flex"
          :style="xs ? 'flex-direction: column;' : 'flex-direction: row'">

          <v-text-field v-model="description" label="Digite o nome do exercício" :error-messages="errors.description"
            variant="outlined" class="pl-md-2" data-test="input-description">
          </v-text-field>

          <v-btn type="submit" variant="elevated" color="grey-darken-4 text-amber"
            class="font-weight-bold px-md-16 ml-sm-5 ml-md-10 mt-2 mt-md-0" height="60px" :ripple="false"
            :style="xs ? 'height: 45px;' : 'height: 60px'" data-test="submit-button">
            Cadastrar
          </v-btn>
        </v-form>

        <v-table class="mt-4 mt-md-10">
          <thead>
            <tr>
              <th class="font-weight-bold text-grey-darken-4">Nome do exercício</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercise in exercises" :key="exercise.id" data-test="exercise-description">
              <td>{{ exercise.description }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
          Cadastrado com sucesso!
        </v-snackbar>

        <v-snackbar v-model="snackbarError" :timeout="duration" color="red-darken-2" location="top">
          Exercício já foi cadastrado!
        </v-snackbar>

        <v-snackbar v-model="snackbarLoadError" :timeout="duration" color="red-darken-2" location="top">
          Erro ao carregar os exercícios!
        </v-snackbar>

      </div>
    </div>
  </div>
</template>
<script setup>
import { useDisplay } from 'vuetify'
const { xs, smAndDown, mdAndDown } = useDisplay()
</script>
<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import { schemaExerciseForm } from '@/validations/exercise.validations'
import ExerciseService from '@/services/ExerciseService'


export default {
  data() {
    return {
      exercises: [],
      description: '',
      errors: [],
      snackbarSuccess: false,
      snackbarError: false,
      snackbarLoadError: false,
      duration: 3000,
      loading: false
    }
  },
  watch: {
    exercises(newValue) {
      this.exercises = newValue;
    }
  },
  mounted() {
    this.getExercises()
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000);
    },
    getExercises() {
      this.load();
      ExerciseService.getAllExercises(this.exercises.current_page)
        .then((response) => {
          this.exercises = response;
          this.exercises.sort((a, b) => a.description.localeCompare(b.description));
        })
        .catch((error) => {
          console.error('Erro ao carregar os exercícios:', error);
          this.snackbarLoadError = true;
        });
    },
    addExercise() {
      try {
        const body = {
          description: this.description
        }
        schemaExerciseForm.validateSync(body, { abortEarly: false })
        this.errors = {}

        ExerciseService.createExercise(body)
          .then(() => {
            this.snackbarSuccess = true
            this.description = ''
            this.$refs.form.reset()
            this.getExercises();
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.snackbarError = true;
            }
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errors = captureErrorYup(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100%;
} 
.cardImage {
  border-radius: 2rem;
  background-image: url(bg_pags.jpg);
  background-size: cover;
  box-shadow:
    8px 10px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
  padding: 2%;
}

.cardContent {
  padding: 2%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 2rem;
  box-shadow:
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8)),
    1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(230, 230, 230, 0.8));
}
</style>
