<template>
  <div class="background">
    <div class="d-flex ma-0 pa-0 container">
      <section class="left" :style="mdAndDown ? 'display:none' : ''">
        <div class="float">
          <h2 class="mb-10">Amplifique seus resultados...</h2>
          <h3>Pela integração: </h3>
          <h4 class="text-h3" style="color: #ffc107">Academia, Instrutor, Nutricionista e Aluno!</h4>
        </div>
      </section>
      <section
        class="d-flex flex-column justify-center align-center right"
        :style="mdAndDown ? 'width: 100%' : 'width: 70%'"
      >
        <form @submit.prevent="handleSubmit" class="mx-auto pa-8 pb-6 v-form">
          <v-card class="mx-auto pa-8 pb-6" elevation="8" max-width="520" rounded="lg"> <!-- Ajuste o max-width para aumentar o tamanho do formulário -->
            <v-img
              class="mx-auto my-6"
              max-width="300" 
              src="../../src/assets/fit-manage-tech.svg"
              style="z-index: 9999"
            ></v-img>

            <div class="text-subtitle-1 text-medium-emphasis mt-4">Email</div>

            <v-text-field
              density="compact"
              placeholder="Email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="email"
              data-test="input-email"
              outlined
              :error-messages="errors.email"
            />

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Senha
            </div>
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-model="password"
              data-test="input-password"
              outlined
              :error-messages="errors.password"
            />

            <v-snackbar v-model="showError" :timeout="5000" color="error">
              Credenciais inválidas
            </v-snackbar>

            <v-btn
              block
              class="mb-8"
              color="#ffc107"
              size="large"
              variant="flat"
              type="submit"
              data-test="submit-button"
            >
              Login
            </v-btn>
          </v-card>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { mdAndDown } = useDisplay()
</script>

<script>
import api from '@/services/api'
import * as yup from 'yup'
import { captureErrorYup } from '@/utils/captureErrorYup'
import AuthenticationService from '@/services/Auth/AuthenticationService'
import router from '@/router'

export default {
  data() {
    return {
      visible: false,
      email: '',
      password: '',
      errors: {},
      showError: false
    }
  },
  methods: {
    handleSubmit() {
      try {
        const schema = yup.object().shape({
          email: yup.string().required('Email é obrigatório'),
          password: yup.string().required('A senha é obrigatória')
        })

        schema.validateSync(
          {
            email: this.email,
            password: this.password
          },
          { abortEarly: false }
        )
        AuthenticationService.login({
          email: this.email,
          password: this.password
        })
          .then(({ data }) => {
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            localStorage.setItem('@token', data.token)
            localStorage.setItem('@permissions', JSON.stringify(data.permissions))
            localStorage.setItem('@name', data.name)
            localStorage.setItem('@profile', data.profile)

            router.push('/dashboard')
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.showError = true
            } else {
              this.showError = false
              console.error('Ocorreu um erro ao processar sua solicitação:', error.message)
            }
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
        }
      }
    },
  }
}
</script>
<style scoped>
.background {
  background-color: #ffc107;
  background-image: url('../../assets/background.svg');
  background-size: fill;
  background-position: left;
  height: 100vh;
  width: 100%;
}

section,
.container {
  height: 100%;
  width: 100%;
}

.v-form {
  width: 100%;
  gap: 8px;
}
section.left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.float {
  position: absolute;
  top: 54%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 4px 4px black;
}

</style>