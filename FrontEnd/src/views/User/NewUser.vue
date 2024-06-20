<template>
  <div class="container">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">
        {{ userId ? 'Editar Usuário' : 'Cadastrar Usuário' }}
      </h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-outline</v-icon>
    </div>

    <div class="cardImage pa-10 mt-10" :class="{ disabled: loading }">
      <v-form ref="form" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" sm="5" md="4">
            <div :style="smAndDown ? 'display:flex; justify-content:center;' : ''">
              <ImageUploadPreview @update:selectedImage="updatePhoto" ref="image" />
            </div>
            <span
              class="v-messages__message v-messages errorFile mx-5 my-3"
              tag="div"
              role="alert"
              aria-live="polite"
              id="input-13-messages"
            >
              {{ errors.photo }}
            </span>
          </v-col>

          <v-col cols="12" sm="7" md="8" class="my-auto">
            <v-row>
              <v-col cols="12" class="pt-sm-2 pb-sm-2 mt-sm-0 mt-3">
                <v-select
                  v-model="profile"
                  label="Perfil do Usuário"
                  :items="profileUsers"
                  :error-messages="errors.profile"
                  variant="outlined"
                  data-test="profile-select"
                  :disabled="userId ? true : false"
                ></v-select>
              </v-col>

              <v-col cols="12" class="pt-sm-2 pb-sm-2 my-sm-0 my-3">
                <v-text-field
                  v-model="name"
                  label="Nome completo"
                  type="text"
                  variant="outlined"
                  :error-messages="errors.name"
                  data-test="name-input"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" class="pt-sm-2 pb-sm-2 mb-sm-0 mb-3">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  :error-messages="errors.email"
                  data-test="email-input"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col class="d-flex justify-center pt-sm-6 pb-sm-0" cols="12">
            <router-link to="/users">
              <v-btn
                variant="elevated"
                color="amber text-dark-grey-4"
                class="font-weight-bold px-sm-2 px-md-10 mr-1 mr-md-4"
                :ripple="false"
                size="large"
              >
                Voltar
              </v-btn>
            </router-link>

            <v-btn
              type="submit"
              variant="elevated"
              color="grey-darken-4 text-amber"
              :class="{
                'font-weight-bold': true,
                'px-sm-2 px-md-11': userId
              }"
              :ripple="false"
              size="large"
              v-if="!loading"
              data-test="submit-button"
            >
              {{ userId ? 'Editar' : 'Cadastrar' }}
            </v-btn>

            <v-btn
              type="submit"
              variant="elevated"
              color="grey-darken-4 text-amber"
              class="font-weight-bold"
              :ripple="false"
              size="large"
              v-if="loading"
            >
              {{ userId ? 'Editando' : 'Cadastrando' }}
              <svg
                version="1.1"
                id="loader-1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 50 50"
                style="enable-background: new 0 0 50 50"
                xml:space="preserve"
              >
                <path
                  fill="#FFC107"
                  d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                >
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
        {{ userId ? ' Usuário editado com sucesso!' : 'Usuário cadastrado com sucesso!' }}
      </v-snackbar>
      <v-snackbar v-model="snackbarError" :timeout="duration" color="red-darken-2" location="top">
        {{ errorMessage }}
      </v-snackbar>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
</script>

<script>
import ImageUploadPreview from '@/components/File/ImageUploadPreview.vue'

import UserService from '@/services/User/UserService'

import * as yup from 'yup'
import { captureErrorYup } from '@/utils/captureErrorYup'
import { schemaCreateUser } from '@/validations/User/userCreate.validations'
import { ref } from 'vue'

const loading = ref(false)

const token = localStorage.getItem('@token')
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
}

export default {
  components: {
    ImageUploadPreview
  },

  data() {
    return {
      photo: null,
      profile: null,
      profileUsers: [],
      name: '',
      email: '',

      snackbarSuccess: false,
      snackbarError: false,
      errorMessage: '',
      duration: 3000,

      errors: {},

      userId: this.$route?.params?.id
    }
  },

  created() {
    this.initializeProfileOptions()
  },

  mounted() {
    if (this.userId) {
      this.loadUserData()
    }
  },

  methods: {
    initializeProfileOptions() {
      if (!this.userId) {
        this.profileUsers = [
          { value: '2', title: 'Recepcionista' },
          { value: '3', title: 'Instrutor' },
          { value: '4', title: 'Nutricionista' }
        ]
      } else {
        this.profileUsers = [
          { value: '1', title: 'Administrador' },
          { value: '2', title: 'Recepcionista' },
          { value: '3', title: 'Instrutor' },
          { value: '4', title: 'Nutricionista' },
          { value: '5', title: 'Aluno' }
        ]
      }
    },

    loadUserData() {
      UserService.getOneUser(this.userId, config)
        .then((response) => {
          this.name = response.name
          this.email = response.email
          this.profile = response.profile_id.toString()

          if (response.file !== null) {
            this.photo = response.file.url
            this.$refs.image.setImageFromURL(response.file.url)
          }
        })
        .catch((error) => {
          this.errorMessage = error
          this.snackbarError = true
        })
    },

    validateSync() {
      this.errors = {}
      try {
        schemaCreateUser.validateSync(
          {
            name: this.name,
            email: this.email,
            profile: this.profile,
            photo: this.photo
          },
          { abortEarly: false }
        )

        this.errors = {}
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
          return false
        }
      }
      return true
    },

    handleSubmit() {
      if (this.validateSync() === false) return

      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('profile_id', this.profile)

      loading.value = true

      if (this.userId) {
        if (typeof this.photo !== 'string') formData.append('photo', this.photo)

        UserService.updateUser(this.userId, formData, config)
          .then(() => {
            this.snackbarSuccess = true
            loading.value = false
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message
            this.snackbarError = true
            loading.value = false
          })
        return
      } else {
        if (this.photo) formData.append('photo', this.photo)

        UserService.createUser(formData, config)
          .then(() => {
            this.snackbarSuccess = true
            loading.value = false
            this.$refs.image.removeImage()
            this.$refs.form.reset()
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message
            this.snackbarError = true
            loading.value = false
          })
      }
    },

    updatePhoto(imageData) {
      this.photo = imageData
    }
  }
}
</script>

<style scoped>
.cardImage {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.errorFile {
  color: rgb(176, 0, 32);
  opacity: 1;
  font-size: 12px;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
