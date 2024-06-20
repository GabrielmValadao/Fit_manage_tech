<template>
  <div class="container">
    <v-layout>
      <v-container>
        <div class="main-container">
          <h1 class="py-12">Envio de fotos para a avaliação</h1>
          <p class="py-2">Por favor, envie as fotos do aluno(a):</p>
          <div class="cards-container">
            <v-row class="card-row">
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="(link, index) in imageLinks"
                :key="index"
              >
                <div
                  class="image-container"
                  data-test="card-item"
                  @mouseover="toggleHover(index)"
                  @mouseleave="toggleHover(-1)"
                >
                  <img
                    :src="link"
                    :class="{ blur: hoverIndex === index }"
                    height="150"
                    width="150"
                    :alt="getImageAlt(index)"
                  />
                  <div class="button-container" v-if="hoverIndex === index">
                    <v-btn @click="openFileInput(index)" icon class="button" data-test="button">
                      <v-icon color="amber">mdi-camera</v-icon>
                    </v-btn>
                    <v-btn @click="deletePhoto(index)" icon class="button" data-test="button">
                      <v-icon color="grey-darken-4">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="button-container-2">
            <v-btn
              color="grey-darken-4 text-amber"
              @click="goToStep1"
              class="btn-back font-weight-bold"
              size="large"
              >Voltar</v-btn
            >
            <v-btn
              color="amber text-grey-darken-4"
              @click="nextStep"
              class="btn-next font-weight-bold"
              size="large"
              >Próximo</v-btn
            >
          </div>
          <v-snackbar v-model="showAlert" color="error" top class="custom-snackbar">
            {{ alertMessage }}
            <template v-slot:action="{ attrs }">
              <v-btn text v-bind="attrs" @click="showAlert = false"> Fechar </v-btn>
            </template>
          </v-snackbar>
        </div>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import api from '../services/api'
export default {
  data() {
    return {
      imageLinks: [
        '../src/assets/avaliation-images/front.svg',
        '../src/assets/avaliation-images/right.svg',
        '../src/assets/avaliation-images/back.svg',
        '../src/assets/avaliation-images/left.svg'
      ],
      hoverIndex: -1,
      allPhotosAdded: false,
      showAlert: false,
      alertMessage: 'Favor adicionar todas as fotos antes de prosseguir'
    }
  },
  methods: {
    openFileInput(index) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.addEventListener('change', (event) => this.uploadImage(event, index))
      input.click()
    },
    async uploadImage(event, index) {
      const file = event.target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('name', `image_${index}`)
        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const imageUrl = URL.createObjectURL(file)
        this.imageLinks[index] = imageUrl
        localStorage.setItem(`image_${index}`, response.data.id)
        console.log('Imagem adicionada:', imageUrl)
        this.allPhotosAdded = this.imageLinks.every((link) => link.startsWith('blob:'))
      }
    },
    async deleteFileFromBackend(index) {
      const fileId = localStorage.getItem(`image_${index}`)
      const response = await api.delete(`/delete/${fileId}`)
      console.log(response.data.message)
    },
    deletePhoto(index) {
      this.imageLinks[index] = `../src/assets/avaliation-images/${this.getOriginalImageName(index)}`
      console.log('Imagem restaurada:', this.imageLinks[index])
      this.deleteFileFromBackend(index)
      localStorage.removeItem(`image_${index}`)
    },
    getOriginalImageName(index) {
      switch (index) {
        case 0:
          return 'front.svg'
        case 1:
          return 'right.svg'
        case 2:
          return 'back.svg'
        case 3:
          return 'left.svg'
        default:
          return ''
      }
    },
    toggleHover(index) {
      this.hoverIndex = index
    },

    getImageAlt(index) {
      switch (index) {
        case 0:
          return 'Homem virado para frente'
        case 1:
          return 'Homem virado para direita'
        case 2:
          return 'Homem virado para trás'
        case 3:
          return 'Homem virado para esquerda'
        default:
          return ''
      }
    },
    nextStep() {
      this.allPhotosAdded = this.imageLinks.every((link) => link.startsWith('blob:'))
      if (!this.allPhotosAdded) {
        this.showAlert = true
      } else {
        this.$router.push('/avaliation/step3')
      }
    },
    goToStep1() {
      this.$router.push('/avaliation/step1')
    }
  }
}
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
  }
  .main-container {
    margin-left: 0;
    align-items: flex-start;
    margin-left: 0;
  }
  .button-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .button-container .button {
    margin-left: 0;
  }
  .button-container-2 {
    align-items: flex-start;
    margin: 0 auto;
  }
  .image-container {
    position: relative;
  }
}

.main-container {
  height: 60%;
}

.image-container {
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  width: 220px;
  height: 220px;
  border-radius: 1.5rem;
  border-color: rgb(255, 212, 80);
  background: rgb(255, 212, 80);
  background: linear-gradient(160deg, rgba(255, 212, 80, 1) 0%, rgba(222, 167, 0, 1) 100%);
  box-shadow:
    12px 16px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
}

.image-container img {
  margin-top: 18px;
  border-radius: 2rem;
  transition: filter 0.3s ease;
  width: 185px;
  height: 185px;
}

.blur {
  filter: blur(4px);
}

.button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 12px;
}

.button {
  margin: 0 auto;
}

.image-container:hover .button-container {
  opacity: 1;
}

.button-container-2 {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 6%;
}

.btn-back,
.btn-next {
  margin-bottom: 10px;
  border-radius: 1rem;
}

.custom-snackbar {
  margin-left: 20%;
}
</style>
