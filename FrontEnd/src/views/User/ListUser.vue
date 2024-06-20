<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Usuários</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-group-outline</v-icon>
    </div>
    <div class="cardImage">
      <div class="cardContent" :style="smAndDown ? 'flex-direction: column;  padding:8%' : ''">
        <v-alert
          v-if="showError"
          color="error"
          closable
          title="Houve um erro ao carregar as informações dos usuários"
          class="mb-8"
        >
        </v-alert>

        <div class="d-flex justify-end">
          <v-btn
            to="/users/new"
            variant="elevated"
            color="grey-darken-4 text-amber"
            class="font-weight-bold px-md-10"
            height="45px"
            :ripple="false"
            :style="smAndDown ? 'width:100%; margin-bottom:8%' : 'margin-bottom:4%'"
          >
            Cadastrar Usuário
          </v-btn>
        </div>

        <v-form class="d-flex">
          <v-text-field
            v-model="search"
            label="Digite o nome do usuário"
            type="text"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            @input="searchUsers"
          >
          </v-text-field>
        </v-form>

        <v-table class="mt-md-3 mt-lg-6">
          <thead>
            <tr>
              <th class="font-weight-bold text-grey-darken-4">Nome</th>
              <th class="font-weight-bold text-grey-darken-4">E-mail</th>
              <th class="font-weight-bold text-grey-darken-4">Perfil do Usuário</th>
              <th class="font-weight-bold text-grey-darken-4 d-flex justify-center align-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" data-test="user-data">
              <td v-html="highlightSearch(user.name)" :style="xs ? 'height: auto' : ''"></td>
              <td v-html="highlightSearch(user.email)"></td>
              <td v-html="user.profile"></td>

              <td
                :style="xs ? 'flex-direction:column; height: auto;' : ''"
                class="d-flex justify-center align-center"
              >
                <v-btn
                  v-if="user.is_active"
                  :to="`/users/${user.id}/edit`"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold px-1 px-sm-2 px-md-10 mr-sm-1 mr-md-4"
                  :ripple="false"
                  :style="xs ? 'width:100%; margin: 10px 0px' : ''"
                >
                  Editar
                </v-btn>

                <v-btn
                  v-else
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold px-1 px-sm-2 px-md-10 mr-sm-1 mr-md-4"
                  :ripple="false"
                  :style="{ opacity: 0.5, ...(xs ? 'width:100%; margin: 10px 0px' : '') }"
                  disabled
                >
                  Editar
                </v-btn>

                <v-btn
                  v-if="user.is_active"
                  :loading="user.loading"
                  :disabled="user.loading"
                  variant="elevated"
                  color="amber text-dark-grey-4"
                  class="font-weight-bold px-1 px-sm-2 px-md-10 ml-sm-1 ml-md-4"
                  :ripple="false"
                  :style="xs ? 'width:100%; margin-bottom: 10px' : ''"
                  @click.prevent
                  @click="updateUserActivation(user.id, false)"
                  data-test="deactive-button"
                >
                  Desativar
                </v-btn>

                <v-btn
                  v-else
                  :loading="user.loading"
                  :disabled="user.loading"
                  variant="elevated"
                  color="amber text-dark-grey-4"
                  class="font-weight-bold px-2 px-sm-6 px-md-14 ml-sm-1 ml-md-4"
                  :ripple="false"
                  :style="{
                    opacity: user.is_active ? 1 : 0.5,
                    ...(xs ? 'width:100%; margin-bottom: 10px' : '')
                  }"
                  @click="updateUserActivation(user.id, true)"
                >
                  Ativar
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
          Usuário atualizado com sucesso!
        </v-snackbar>

        <v-snackbar v-model="snackbarError" :timeout="duration" color="red" location="top">
          Houve uma falha ao tentar atualizar o usuário!
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
import UserService from '@/services/User/UserService'

export default {
  data() {
    return {
      search: '',
      users: [],
      filteredUsers: [],

      snackbarSuccess: false,
      snackbarError: false,
      duration: 2000,

      loading: false,
      showError: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    async updateUserActivation(userId, is_active) {
      const user = this.users.find((user) => user.id === userId)
      if (!user) return

      user.loading = true
      this.load()

      try {
        const body = {
          is_active: is_active ? true : false,
          deleted_at: is_active ? null : new Date().toISOString()
        }

        const response = await UserService.updateStatusUserDelete(userId, body)

        if (response.status === 200) {
          this.snackbarSuccess = true
          this.getUsers()
        }
      } catch (error) {
        console.error(error)
        this.snackbarError = true
      } finally {
        user.loading = false
      }
    },
    getUsers() {
      UserService.getAllUsers()
        .then(({ data }) => {
          this.users = this.filteredUsers = data
        })
        .catch((error) => {
          console.error('Erro ao obter os usuários.', error)
          this.showError = true
        })
    },
    searchUsers() {
      this.filteredUsers = this.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(this.search.toLowerCase().trim()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase().trim())
        )
      })
    },
    highlightSearch(str) {
      if (!str || !this.search) return str
      const highlight = this.search.trim()
      return str.replace(
        new RegExp(`(.)?(${highlight})(.)?`, 'ig'),
        '$1<b style="background:#FFCA27; padding:2px; border-radius:2px;">$2</b>$3'
      )
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
