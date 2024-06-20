<template>
  <v-container fluid>
    <div class="container">
      <v-row class="px-14">
        <v-col cols="12" md="10" offset-md="1">
          <v-card class="title-card elevation-10" flat @click="updateRandomPhrase">
            <v-card-text class="d-flex flex-column align-center">
              <div class="d-flex align-center justify-center">
                <v-icon class="mr-3" size="36">mdi-weight-lifter</v-icon>
                <h1
                  class="font-weight-bold"
                  data-test="user-name"
                  :style="smAndDown ? 'text-align: center;' : ''"
                >
                  Olá, {{ userName }}!
                </h1>
              </div>
              <h3
                class="mt-3 font-weight-medium"
                data-test="random-phrase"
                :style="smAndDown ? 'text-align: center;' : ''"
              >
                {{ currentPhrase }}
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="px-16">
        <v-col cols="12" md="5" class="mx-2" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card
            class="user-card elevation-10"
            @click="gotoStudents"
            data-test="students-card"
            style="cursor: pointer"
          >
            <v-card-text class="d-flex flex-column justify-end">
              <img
                src="../assets/Dashboard/alunos-academia.svg"
                alt="Imagem de 4 alunos fazendo exercícios na academia."
                class="card-image"
              />
              <div class="text-center">
                <div class="text-h5 font-weight-bold">ALUNOS<br />CADASTRADOS</div>
                <div class="text-h3 font-weight-bold" data-test="registeredStudents">
                  {{ registeredStudents }}
                </div>
                <v-btn
                  @click.stop="gotoStudents"
                  append-icon="mdi-account-circle"
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold"
                  :class="
                    smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'
                  "
                  data-test="add-students-button"
                >
                  ADICIONAR
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="5" class="mx-2" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card
            class="user-card elevation-10"
            @click="gotoExercises"
            data-test="exercises-card"
            style="cursor: pointer"
          >
            <v-card-text class="d-flex flex-column justify-end">
              <img
                src="../assets/Dashboard/equipamentos-exercicios.svg"
                alt="Imagem de varios equipamentos de academia um ao lado do outro."
                class="card-image"
              />
              <div class="text-center">
                <div class="text-h5 font-weight-bold">EXERCÍCIOS<br />CADASTRADOS</div>
                <div class="text-h3 font-weight-bold" data-test="registeredExercises">
                  {{ registeredExercises }}
                </div>
                <v-btn
                  @click.stop="gotoExercises"
                  append-icon="mdi-dumbbell"
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold"
                  :class="
                    smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'
                  "
                  data-test="add-exercises-button"
                >
                  ADICIONAR
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { useDisplay } from 'vuetify'
import api from '@/services/api'

export default {
  name: 'DashboardComponent',
  setup() {
    const { smAndDown, mdAndDown } = useDisplay()

    return { smAndDown, mdAndDown }
  },
  data() {
    return {
      registeredStudents: 0,
      registeredExercises: 0,
      userName: localStorage.getItem('@name') || 'Instrutor',
      currentPhrase: '',
      frases: [
        'Inspire grandeza em seus alunos. Comece agora!',
        'Faça a diferença para seus alunos. Vamos lá!',
        'Seja o guia. Inicie a jornada com seu aluno!',
        'O sucesso de seus alunos começa com você! Vamos começar!',
        'Transforme potencial em realização. Ajude-os a alcançar novas alturas!',
        'Cada aluno é uma história de sucesso esperando para acontecer.',
        'Eduque com paixão. Inspire a próxima geração.',
        'O caminho para o sucesso é através do aprendizado. Guie-os em cada passo.'
      ]
    }
  },
  methods: {
    updateRandomPhrase() {
      this.currentPhrase = this.frases[Math.floor(Math.random() * this.frases.length)]
    },
    async fetchDashboardData() {
      try {
        const response = await api.get('/dashboard/instrutor')
        this.registeredStudents = response.data.registered_students
        this.registeredExercises = response.data.registered_exercises
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error)
      }
    },
    gotoStudents() {
      this.$router.push('/instructor/students')
    },
    gotoExercises() {
      this.$router.push('/exercises')
    }
  },
  mounted() {
    this.updateRandomPhrase()
    this.fetchDashboardData()
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.title-card {
  padding: 2rem;
  border-radius: 1.5rem;
  background: rgb(255, 212, 80);
  background: linear-gradient(160deg, rgba(255, 212, 80, 1) 0%, rgba(222, 167, 0, 1) 100%);
  box-shadow:
    12px 16px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
}

.user-card {
  border-radius: 1.5rem;
  background: rgb(255, 212, 80);
  background: linear-gradient(160deg, rgba(255, 212, 80, 1) 0%, rgba(222, 167, 0, 1) 100%);
  box-shadow:
    12px 16px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
  position: relative;
  overflow: hidden;
  min-height: auto;
}

.card-image {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .text-h3 {
    font-size: 1.5rem;
  }
  .v-btn {
    padding: 8px 12px;
  }
}
</style>
