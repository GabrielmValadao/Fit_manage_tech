<template>
  <div class="container">
    <div class="d-flex flex-column py-12 px-12 px-sm-6">
      <div class="d-flex">
        <v-icon size="x-large" class="text-h3" color="amber">mdi-account-multiple-plus-outline</v-icon>
        <h1 class="container-title font-weight-medium ms-2 mt-1">Cadastro de aluno</h1>
      </div>
      <v-progress-linear 
        color="grey-darken-4" 
        indeterminate>
      </v-progress-linear>
    </div>
    <div class="formContent d-flex flex-column">
      <div>
        <v-form @submit.prevent="handleSubmitStudentRegistration">
          <div class="formContent-data d-flex">
            <div class="d-flex formContent-data-cameraContent">
              <div class="formContent-data-cameraContent-camera">
                <div class="formContent-data-cameraContent-camera-photo">
                  <simple-v-camera 
                    v-if="open" 
                    :resolution="{ width: 400, height: 400 }" 
                    ref="camera">
                  </simple-v-camera>
                </div>
              </div>
              <div class="d-flex flex-column justify-center">
                <v-btn 
                  class="ma-2" 
                  color="amber" 
                  title="Clique para capturar uma foto" size="large"
                  icon="mdi-camera-plus" 
                  @click="capturePhoto('snap')">
                </v-btn>
                <v-btn 
                  class="ma-2" 
                  color="grey-darken-4 text-amber" 
                  size="large"
                  title="Clique para habilitar/desabilitar a webcam" 
                  :icon="open ? 'mdi-camera' : 'mdi-camera-off'"
                  @click="handleCameraEnabled"></v-btn>
              </div>
            </div>
            <div class="w-100 formContent-data-responsiveInput-nameAndEmail">
              <v-col 
                cols="12" 
                sm="12" 
                md="12">
                <v-text-field 
                  v-model="name" 
                  label="Nome completo" 
                  type="text" 
                  variant="outlined"
                  data-test="input-name"
                  @focus="clearError('name')"
                  :error-messages="error.name"/>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field 
                v-model="email" 
                label="E-mail" 
                type="email" 
                variant="outlined"
                data-test="input-email"
                @focus="clearError('email')"
                :error-messages="error.email"/>
            </v-col>
            <div class="d-flex formContent-data-responsiveInput">
              <v-col cols="12" sm="12" md="4">
                <v-text-field 
                v-model="cpf" 
                label="CPF" 
                type="text" 
                variant="outlined" 
                data-test="input-cpf"
                @input="handleChange"
                @focus="clearError('cpf')"
                :error-messages="error.cpf"/>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field 
                  v-model="contact" 
                  label="Telefone para contato" 
                  type="number" 
                  variant="outlined"
                  data-test="input-contact"
                  @focus="clearError('contact')"
                  :error-messages="error.contact" />
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field 
                  v-model="dateBirth" 
                  label="Data de Nascimento" 
                  type="date" 
                  variant="outlined"
                  data-test="input-dateBirth"
                  @focus="clearError('dateBirth')"
                  :max="maxDate" 
                  :error-messages="error.dateBirth" />
              </v-col>
              </div>
            </div>
          </div>
          <div class="formContent-data-importantInformations d-flex">
            <v-icon size="small">mdi-alert-circle</v-icon>
            <h3 class="subtitle font-weight-light ms-2">A última foto capturada será a usada em seu cadastro.</h3>
          </div>
          <v-divider class="mb-4"></v-divider>
          <div class="d-flex formContent-data-responsiveInput">
            <v-col cols="12" sm="12" md="3">
              <v-text-field 
                v-model="cep" 
                label="CEP" 
                type="number" 
                variant="outlined"
                data-test="input-cep"
                @focus="clearError('cep')"
                :error-messages="error.cep"
                maxLength="9" 
                v-on:focusout="getAddressInfo()" 
                v-on:keyup.enter="getAddressInfo()"/>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field 
                v-model="street" 
                label="Logradouro" 
                type="text" 
                variant="outlined"
                data-test="input-street"
                @focus="clearError('street')"
                :error-messages="error.street"/>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field 
                v-model="number" 
                label="Número" 
                type="text" 
                variant="outlined"
                data-test="input-number"
                @focus="clearError('number')"
                :error-messages="error.number"/>
            </v-col>
          </div>
          <div class="d-flex formContent-data-responsiveInput">
            <v-col cols="12" sm="12" md="5">
              <v-text-field 
                v-model="neighborhood" 
                label="Bairro" 
                type="text" 
                variant="outlined"
                data-test="input-neighborhood"
                @focus="clearError('neighborhood')"
                :error-messages="error.neighborhood"/>
            </v-col>
            <v-col cols="12" sm="12" md="7">
              <v-text-field 
                v-model="complement" 
                label="Complemento" 
                type="text" 
                variant="outlined"
                data-test="input-complement"/>
            </v-col>
          </div>
          <div class="d-flex formContent-data-responsiveInput">
            <v-col cols="12" sm="12" md="6">
              <v-text-field 
                v-model="city" 
                label="Cidade" 
                type="text" 
                variant="outlined"
                data-test="input-city"
                @focus="clearError('city')"
                :error-messages="error.city" />
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field 
                v-model="state" 
                label="Estado" 
                type="text" 
                variant="outlined"
                data-test="input-state"
                @focus="clearError('state')"
                :error-messages="error.state"/>
            </v-col>
          </div>
          <v-col class="d-flex justify-center pt-sm-6 pb-sm-0">
            <router-link to="">
              <v-btn 
                variant="elevated" 
                color="amber text-dark-grey-4"
                class="font-weight-bold px-sm-2 px-md-10 mr-1 mr-md-4" 
                size="large">
                Voltar
              </v-btn>
            </router-link>
            <v-btn 
              type="submit" 
              variant="elevated" 
              color="grey-darken-4 text-amber" 
              class="font-weight-bold"
              data-test="submit-button"
              :ripple="false" size="large">
              Cadastrar
            </v-btn>
          </v-col>
        </v-form>
        <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
          {{ successMessage }}
        </v-snackbar>
        <v-snackbar v-model="snackbarError" :timeout="duration" color="red-darken-2" location="top">
          {{ errorMessage }}
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import StudentRegistrationService from '../../services/StudentRegistrationService'

import { schemaStudentRegistrationForm } from '../../validations/studentRegistration.validations'
import { captureErrorYup } from '../../utils/captureErrorYup'

import Camera from 'simple-vue-camera'
import * as yup from 'yup'
import axios from 'axios'

export default {
  data() {
    return {
      open: false,
      name: "",
      email: "",
      contact: "",
      cpf: "",
      dateBirth: "",
      maxDate: this.calculateMaxDate(),
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      complement: "",
      photo: "",

      snackbarSuccess: false,
      snackbarError: false,
      error: {},
    }
  },
  components: {
    'simple-v-camera': Camera
  },
  methods: {
    calculateMaxDate() {
      const now = new Date()
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
    },
    handleChange(event) {
      let value = event.target.value.replace(/\D/g, '');

      let formattedCpf = '';
      for (let i = 0; i < value.length; i++) {
        if (i === 3 || i === 6) {
          formattedCpf += '.';
        } else if (i === 9) {
          formattedCpf += '-';
        }
        formattedCpf += value[i];
      }
      
      this.cpf = formattedCpf;
    },
    clearError(field) {
        this.error[field] = '';
    },
    handleCameraEnabled() {
      this.open = !this.open;
    },
    capturePhoto(opt) {
      if (opt === 'snap') {
        const studentPhoto = this.$refs.camera?.snapshot();
        studentPhoto.then((data) => {
          this.photo = data;
          this.snackbarSuccess = true;
          this.successMessage = `Foto capturada com sucesso`;
          console.log('Foto capturada com sucesso');
        })
          .catch((error) => {
            this.snackbarError = true;
            this.errorMessage = `Erro ao capturar foto`;
            console.error(error);
          });
      }
    },
    getAddressInfo() {
      const cep = this.cep.replace('-', '')
      if (cep.length === 8) {
        axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then(({ data }) => {
            if (data.erro) return
            this.street = data.logradouro
            this.neighborhood = data.bairro
            this.city = data.localidade
            this.state = data.uf
            this.addressFound = true
            this.errors = {}
            this.validateSync()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    handleSubmitStudentRegistration() {
      try {
        const body = {
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          contact: this.contact,
          dateBirth: this.dateBirth,
          cep: this.cep,
          street: this.street,
          number: this.number,
          neighborhood: this.neighborhood,
          city: this.city,
          state: this.state,
        }

        schemaStudentRegistrationForm.validateSync(body, { abortEarly: false })

        if (!this.photo) {
          this.snackbarError = true;
          this.errorMessage = `Por favor, capture uma foto antes de enviar o formulário`;
          return;
        }

        const formData = new FormData()
        formData.append('photo', this.photo);
        formData.append('name', this.name)
        formData.append('email', this.email)
        formData.append('contact', this.contact)
        formData.append('cpf', this.cpf)
        formData.append('date_birth', this.dateBirth)
        formData.append('cep', this.cep)
        formData.append('street', this.street)
        formData.append('number', this.number)
        formData.append('neighborhood', this.neighborhood)
        formData.append('city', this.city)
        formData.append('state', this.state)

        StudentRegistrationService.createStudent(formData)
          .then(() => {
            this.snackbarSuccess = true
            this.successMessage = `Aluno cadastrado com sucesso`

            this.name = ''
            this.email = ''
            this.contact = ''
            this.cpf = ''
            this.dateBirth = ''
            this.cep = ''
            this.street = ''
            this.number = ''
            this.neighborhood = ''
            this.city = ''
            this.province = ''
            this.complement = ''
          })
          .catch(() => {
            this.snackbarError = true
            this.errorMessage = `Erro ao cadastrar o aluno`
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.error = captureErrorYup(error)
        }
      }
    },
  }
}

</script>

<style scoped>
.formContent {
  border-radius: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

  padding: 48px;
  margin: 0px 48px 50px;
  position: relative;
}

.formContent:before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url(../../assets/background-student-registration.jpg);
  background-size: cover;
  z-index: -1;
  opacity: 0.5;
}

.formContent-data-cameraContent-camera {
  width: 18.1rem;
  height: 16.3rem;
  margin-top: 8px;
  border: 1px solid #757575;
  border-radius: 16px;
}

.formContent-data-cameraContent-camera-photo {
  position: relative;
  width: 15.6rem;
  height: 13.8rem;
  border: 1px solid #757575;
  border-radius: 16px;
  margin: 18px;
}

.formContent-data-importantInformations {
  color: #D50000;
  font-size: 14px;
  margin-top: -22px;
}

.subtitle {
  margin-top: -4px;
}

@media (max-width:960px) {

  .formContent-data {
    display: flex;
    flex-direction: column;
  }

  .formContent-data-cameraContent {
    display: flex;
    justify-content: center
  }

  .formContent-data-cameraContent-camera {
    width: 20rem;
  }

  .formContent-data-cameraContent-camera-photo {
    width: 17.5rem;
  }

  .formContent-data-responsiveInput {
    display: flex;
  }

  .formContent-data-responsiveInput-nameAndEmail {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width:600px) {

  .container-title {
    font-size: 28px;
  }

  .formContent {
    padding: 16px;
    margin: 0px 16px 50px;
  }

  .formContent-data-cameraContent-camera-photo {
    width: 11rem;
  }

  .formContent-data-responsiveInput {
    display: flex;
    flex-direction: column;
  }
}
</style>