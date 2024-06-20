<template>
  <div>
    <v-card class="imageCard" @click="selectImage">
      <div
        class="imagePreviewWrapper"
        :style="{ 'background-image': `url(${previewImage || defaultImage})` }"
      >
        <div class="overlay" v-if="!previewImage">
          <v-icon color="white" size="x-large">mdi-camera</v-icon>
          <div class="title">Selecione uma imagem</div>
        </div>

        <div class="removeButton" v-if="previewImage" @click.stop="removeImage">
          <v-btn class="ma-2" color="amber" icon="mdi-close" size="small"></v-btn>
        </div>
      </div>
    </v-card>
    <input
      ref="fileInput"
      type="file"
      @change="pickFile"
      style="display: none"
      accept="image/*"
      aria-label="Select Image"
    />
  </div>
</template>

<script>
import accountImage from '@/assets/account-image.jpg'
import axios from 'axios'

export default {
  props: {
    selectedImage: {
      type: File,
      default: null
    }
  },
  data() {
    return {
      previewImage: null,
      defaultImage: accountImage
    }
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    setImageFromURL(file) {
      let that = this
      axios.get(file, { responseType: 'blob', crossdomain: true }).then((response) => {
        var reader = new window.FileReader()
        reader.readAsDataURL(response.data)
        reader.onload = function () {
          that.previewImage = reader.result
          that.$emit('update:selectedImage', file)
        }
      })
    },
    pickFile(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          this.previewImage = reader.result
          this.$emit('update:selectedImage', file)
        }
        reader.readAsDataURL(file)
      }
    },
    removeImage() {
      this.previewImage = null
      this.$refs.fileInput.value = ''
      this.$emit('update:selectedImage', null)
    }
  }
}
</script>

<style>
.imageCard {
  width: 40vh;
  height: 40vh;
  cursor: pointer;
}

.imagePreviewWrapper {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  margin-top: 8px;
  color: white;
}

.removeButton {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

@media (max-width: 1650px) {
  .imageCard {
    width: 35vh;
    height: 35vh;
  }
}

@media (max-width: 1450px) {
  .imageCard {
    width: 30vh;
    height: 30vh;
  }
}

@media (max-width: 1016px) {
  .imageCard {
    width: 25vh;
    height: 25vh;
  }
}

@media (max-width: 710px) {
  .imageCard {
    width: 20vh;
    height: 20vh;
  }
}
</style>
