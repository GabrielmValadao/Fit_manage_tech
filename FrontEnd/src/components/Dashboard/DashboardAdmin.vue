<template>
  <v-container fluid>
    <div class="container">
      <v-row >
        <v-col cols="12" md="10" offset-md="1">
          <v-card class="title-card elevation-10" flat>
            <v-card-text class="d-flex flex-column align-center">
              <div class="d-flex align-center justify-center">
                <v-icon class="mr-3" size="36">mdi-weight-lifter</v-icon>
                <h1 class="font-weight-bold my-10" :style="smAndDown ? 'text-align: center;' : ''">
                  Bem vindo, {{ profileName }}!
                </h1>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="5" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card class="user-card elevation-10" style="cursor: pointer">
            <v-card-text class="d-flex flex-column justify-end">
              <img
                src="@/assets/Dashboard/equipamentos-exercicios.svg"
                alt="Imagem com equipamentos que remetem a exercicios"
                class="card-image"
              />
              <div class="text-center">
                <v-card-title>Exercícios Registrados</v-card-title>
                <v-card-text class="text-h3 font-weight-bold">{{ registeredExercises }}</v-card-text>
                <span class="text-h3 font-weight-bold" v-if="!showExercises"></span>
                <v-list class="user-card" v-else>
                  <v-list-item v-for="exercise in exercises" :key="exercise.id">
                      <v-list-item-title>{{ exercise.description }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-btn
                  @click="toggleExercises"
                  append-icon="mdi-dumbbell"
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold my-6"
                  :class="smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'"
                >
                  Visualizar
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card class="user-card elevation-10" style="cursor: pointer">
            <v-card-text class="d-flex flex-column justify-end">
            <img
              src="@/assets/Dashboard/users.svg"
              alt="Imagem com 5 personagens fazendo referencia aos 5 perfils do sistema: admin, recepcionista, nutricionista, instrutor e aluno."
              class="card-image"
            />
            <div class="text-center">
              <v-card-title>Usuários Cadastrados</v-card-title>
              <v-card-text class="text-h3 font-weight-bold">{{ totalUsers }}</v-card-text>
              <span class="text-h3 font-weight-bold" v-if="!showUsers"></span>
              <v-list class="user-card" v-else>
                <v-list-item v-for="(count, profile) in profiles" :key="profile">
                    <v-list-item-title>{{ profile }}: {{ count }}</v-list-item-title>
                </v-list-item>
                <v-btn
                  to="/users"
                  append-icon="mdi-account-circle"
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold my-6 mx-2"
                  :class="smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'"
                >
                  Listagem completa
                </v-btn>
                
                <v-btn
                  @click="navigateToCreateUser"
                  append-icon="mdi-account-circle"
                  size="large"
                  variant="elevated"
                  color="amber text-grey-darken-4"
                  class="font-weight-bold my-6 mx-2"
                  :class="smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'"
                >
                  Cadastrar Usuário
                </v-btn>
              </v-list>
              <v-btn
                @click="toggleUsers"
                append-icon="mdi-account-circle"
                size="large"
                variant="elevated"
                color="grey-darken-4 text-amber"
                class="font-weight-bold my-6"
                :class="smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'"
              >
                Visualizar
              </v-btn>

            </div>
          </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown, mdAndDown } = useDisplay()
</script>

<script>
import AuthenticationService from '@/services/Auth/AuthenticationService'

export default {
  data() {
    return {
      profileName: localStorage.getItem('@name'),
      registeredExercises: 0,
      profiles: {},
      exercises: [],
      showExercises: false,
      showUsers: false
    }
  },
  created() {
    this.fetchDashboardData()
  },
  methods: {
    async fetchDashboardData() {
      try {
        const { registered_exercises, profiles, exercises } = await AuthenticationService.fetchDashboardData()
        this.registeredExercises = registered_exercises
        this.profiles = profiles
        this.exercises = exercises
      } catch (error) {
        console.error('Erro ao buscar dados do painel de administração:', error)
      }
    },
    toggleExercises() {
      this.showExercises = !this.showExercises
    },
    toggleUsers() {
      this.showUsers = !this.showUsers
    },
    navigateToCreateUser() {
      this.$router.push('/users/new')
    }
  },
  computed: {
    totalUsers() {
      return Object.values(this.profiles).reduce((total, count) => total + count, 0)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding-bottom: 0% !important;
}

.title-card,
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
  .v-row{
    padding: 0px;
  }
}
</style>