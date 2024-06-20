<template>
  <div class="container ma-6">
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <h1 class="ml-2 mb-0">Lista de estudantes</h1>
        <v-icon class="ml-2" color="#ffc107">mdi-school</v-icon>
      </div>
      <v-btn variant="elevated" color="amber darken-4" dark @click="redirectToNewStudent">
        <span class="text-black font-weight-bold">Cadastro de estudante</span>
      </v-btn>
    </div>
    <form>
      <v-row>
        <v-col cols="12" class="my-2">
          <v-text-field
            label="Pesquisar"
            placeholder="Pesquise pelo nome, email ou cpf do estudante"
            variant="outlined"
            v-model="searchText"
            data-test="input-text"
            @input="handleSearch"
          ></v-text-field>
        </v-col>
      </v-row>
    </form>
    <v-table>
      <thead class="header-table">
        <tr>
          <th class="font-weight-bold">NOME</th>
          <th class="font-weight-bold">CPF</th>
          <th class="font-weight-bold">EMAIL</th>
          <th class="font-weight-bold"></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.id" data-test="row-table">
          <td>{{ student.name }}</td>
          <td>{{ student.cpf }}</td>
          <td>{{ student.email }}</td>
          <td class="pa-2">
            <div class="d-flex align-center justify-space-around">
              <v-btn variant="elevated" color="black" dark @click="handleEditStudent(student.id)">
                <span class="text-amber">Editar</span>
              </v-btn>
              <v-btn
                variant="elevated"
                color="grey-darken-1"
                dark
                @click="handleDocumentsStudent(student.id)"
              >
                <span class="text-white font-weight-bold"> Documentos </span>
              </v-btn>
              <v-btn
                variant="elevated"
                color="amber darken-4"
                dark
                @click="handleDeleteStudent(student.id)"
              >
                <span class="text-black font-weight-bold">Desativar</span>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import StudentService from '../../services/StudentService'
export default {
  data() {
    return {
      searchText: '',
      students: []
    }
  },

  computed: {
    filteredStudents() {
      if (!this.searchText) {
        return this.students
      }
      return this.students.filter(
        (student) =>
          student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.cpf.includes(this.searchText) ||
          student.email.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  },

  methods: {
    redirectToNewStudent() {
      this.$router.push('/students/new')
    },

    handleSearch() {
      StudentService.getAllStudents(this.searchText)
        .then((data) => {
          this.students = data.map((item) => ({
            id: item.id,
            name: item.name,
            cpf: item.cpf,
            email: item.email
          }))
        })
        .catch(() => alert('Houve um erro ao retornar os estudantes'))
    },

    handleEditStudent(studentId) {
      this.$router.push(`/students/${studentId}`)
    },

    handleDocumentsStudent(studentId) {
      this.$router.push(`/students/${studentId}/documents`)
    },

    handleDeleteStudent(studentId) {
      StudentService.deleteOneStudent(studentId)
        .then(() => {
          this.students = this.students.filter((item) => item.id !== studentId)
          alert('Desativado com sucesso')
        })
        .catch(() => alert('Erro ao desativar estudante'))
    }
  },

  mounted() {
    this.handleSearch()
  }
}
</script>

<style scoped>
.header-table {
  background: #ffc107;
  color: #212121;
}

tbody tr:nth-child(2n) {
  background: #f2f0f0;
}
</style>
