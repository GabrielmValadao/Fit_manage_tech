<template>
  <v-layout>
    <v-navigation-drawer
      theme="dark"
      v-model="drawer"
      :permanent="lgAndUp"
      width="15%"
      id="sidebar"
      border="none"
      :style="mdAndDown ? 'display:none;' : ''"
    >
      <v-list-item>
        <router-link to="/dashboard">
          <img
            src="@/assets/fit-manage-tech-white.svg"
            alt="logo fitmanage tech, braço flexionado mostrando músculos e um halter grande."
            class="my-4 pb-5 w-100 mx-auto d-block"
          />
        </router-link>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          :prepend-avatar="imagePath"
          :title="name"
          :subtitle="profile"
          class="font-weight-bold pl-8"
        ></v-list-item>
      </v-list>
      <v-divider class="pb-3"></v-divider>

      <v-list nav dense class="ma-0 pa-0 pl-0 pl-md-4 mt-5">
        <router-link
          v-for="(item, i) in menu[profile]"
          :key="i"
          :to="item.link"
          :ripple="false"
          class="menuLink"
        >
          <v-list-item class="font-weight-bold pl-0pl-lg-5 menuItem" :prepend-icon="item.icon">
            {{ item.text }}
          </v-list-item>
        </router-link>
        <v-list-item class="menuLink">
          <!-- item adicionado para permitir arredondamento borda menu -->
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pb-10 pr-2 pr-md-4">
          <v-btn block append-icon="mdi-logout" variant="plain" @click="logout">Sair</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-layout>

  <div class="d-flex justify-center" id="menuMobile">
    <v-row :style="lgAndUp ? 'display:none' : ''">
      <v-col cols="12" class="pa-0 ma-0">
        <v-card-title
          class="bg-grey-darken-4 d-flex align-center justify-space-between pt-4 pl-8 pl-sm-4"
        >
          <router-link to="/dashboard">
            <img
              src="@/assets/logo.svg"
              alt="logo fitmanage tech, braço flexionado mostrando músculos e um halter grande."
              :style="xs ? 'width: 30%; margin-left: 5% ' : 'width: 40%; margin-left: 10%'"
            />
          </router-link>

          <h2>FITMANAGE TECH</h2>

          <v-menu theme="dark" class="menu-dropdown">
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props"
                class="my-2 my-sm-4 mx-2 mx-sm-12"
                theme="dark"
                variant="plain"
              >
              </v-btn>
            </template>

            <v-list theme="dark">
              <v-list-item v-for="(item, i) in menu[profile]" :key="i" :to="item.link" link>
                <v-list-item :append-icon="item.icon">{{ item.text }}</v-list-item>
              </v-list-item>
              <v-list-item class="pt-10" align="center">
                <v-btn append-icon="mdi-logout" variant="plain" @click="logout" width="100%"
                  >Sair</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { xs, lgAndUp, mdAndDown } = useDisplay()
</script>

<script>
import accountImage from '@/assets/account-image.jpg'
import UserService from '@/services/User/UserService'
import AuthenticationService from '@/services/Auth/AuthenticationService'

import axios from 'axios'

export default {
  name: 'MenuPag',
  data() {
    return {
      imagePath: accountImage,
      permissions: localStorage.getItem('@permissions'),
      name: localStorage.getItem('@name'),
      profile: localStorage.getItem('@profile'),
      token: localStorage.getItem('@token'),
      loading: false,
      drawer: true,
      menu: {
        ADMIN: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-account-plus', text: 'Cadastrar Usuário', link: '/users/new' },
          { icon: 'mdi-account-multiple', text: 'Usuários', link: '/users' }
        ],
        RECEPCIONISTA: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-account-plus', text: 'Cadastrar Estudante', link: '/students/new' },
          { icon: 'mdi-account-multiple', text: 'Estudantes', link: '/students' }
        ],
        INSTRUTOR: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-dumbbell', text: 'Exercícios', link: '/exercises' },
          { icon: 'mdi-account-multiple', text: 'Estudantes', link: '/instructor/students' }
        ],
        NUTRICIONISTA: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-account-check', text: 'Estudantes Ativos', link: '/active/students' }
        ],
        ALUNO: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-food-apple', text: 'Minhas Dietas', link: '/student/meal-plans' },
          { icon: 'mdi-dumbbell', text: 'Meus Treinos', link: '/student/workouts' }
        ]
      }
    }
  },

  mounted() {
    this.loadUserImage()
  },

  methods: {
    logout() {
      AuthenticationService.logout().then(() => {
        const storage = ['@permissions', '@name', '@profile', '@token']
        storage.forEach((item) => localStorage.removeItem(item))
        this.$router.push('/')
      })
    },

    loadUserImage() {
      UserService.getImage().then((response) => {
        if (!response) return
        axios.get(response, { responseType: 'blob', crossdomain: true }).then((response) => {
          var reader = new window.FileReader()
          reader.readAsDataURL(response.data)
          reader.onload = () => {
            this.imagePath = reader.result
          }
        })
      })
    }
  }
}
</script>

<style scoped>
nav {
  width: 15%;
}

/* Estilo para arredondar bordas menu */
#sidebar a.menuLink {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: grid;
  text-decoration: none;
  align-items: center;
  position: relative;
  color: white;
}

#sidebar a.router-link-exact-active,
#sidebar a:has(.router-link-exact-active) {
  background: #fff;
  color: #424242;
  margin-right: -10px;
}

#sidebar .menuLink.router-link-exact-active::before {
  position: absolute;
  content: '';
  width: 70px;
  height: 70px;
  background-color: #212121;
  top: -70px;
  right: 10px;
  border-radius: 3rem;
  box-shadow: 30px 30px 0px white;
  z-index: -1;
}

#sidebar .menuLink.router-link-exact-active + .menuLink::before {
  position: absolute;
  content: '';
  width: 70px;
  height: 70px;
  background-color: #212121;
  top: 0;
  right: 0;
  border-radius: 3rem;
  box-shadow: 30px -30px 0px white;
  z-index: -1;
}

.menuItem {
  z-index: 1010;
}

.menuLink:not(:last-child):not(:first-child):hover {
  border-radius: 30px;
  background: rgb(73, 73, 73);
  background: linear-gradient(
    90deg,
    rgba(73, 73, 73, 1) 0%,
    rgba(33, 33, 33, 0) 50%,
    rgba(33, 33, 33, 0) 100%
  );
}

a.router-link-exact-active:hover .v-list-item,
a:has(.router-link-exact-active):hover .v-list-item {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background: white;
}

.menu-dropdown a.router-link-exact-active:hover .menuLink {
  background: none;
}
</style>
