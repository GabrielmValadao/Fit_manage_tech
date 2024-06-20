<template>
  <div class="container">
    <v-container>
      <v-row>
        <!-- Calendário -->
        <v-col cols="12" md="4">
          <v-col>
            <h3>Olá {{ studentName.name }}</h3>
            <v-date-picker v-model="date" color="yellow" mode="dateTime" :timezone="timezone" is24hr  ></v-date-picker>
          </v-col>         
        </v-col>

        <!-- Formulário de Avaliação -->
        <v-col cols="12" md="8">
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field v-model="age" label="Idade" color="yellow-darken-1"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="weight" label="Peso" color="yellow-darken-2" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="height" label="Altura" color="yellow-darken-2" type="number"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="observationsToNutritionist" label="Observações para a Nutricionista"
                  color="yellow-darken-2"></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="observationsToStudent" label="Observações para o Aluno"
                  color="yellow-darken-2"></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-btn type="submit" variant="elevated" color="grey-darken-4 text-amber" class="font-weight-bold"
                  size="large">Proximo ></v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      studentName: '',
      student_id: '1',
      date: null,
      timezone: '',
      time: null,
      age: '',
      weight: '',
      height: '',
      observationsToNutritionist: '',
      observationsToStudent: '',
      measures: '',
    }
  },
  mounted(){    
    this.student_id = this.$route.params.student_id;

    //recuperar nome do aluno no qual esta sendo cadastrado a avaliação
    this.findStudentName();
  },

  methods: {
    selectDate(date) {
      // Lógica para lidar com a seleção de data
      console.log('Data selecionada:', date)
    },

    async findStudentName() {
      try {
        // Obtem dados do aluno
        const response = await axios.get(`http://127.0.0.1:8000/api/students/${this.student_id}`);
        // Atualize o estado do componente com o nome do aluno
        this.studentName = response.data; 
        console.log(this.studentName)
      } catch (error) {
        console.error('Erro ao buscar nome do estudante:', error);
      }
    },

    submitForm() {
      const dataForm = {
        student_id: this.student_id,
        age: this.age,
        date: this.formatDate(this.date),
        weight: this.weight,
        height: this.height,
        observations_to_student: this.observationsToStudent,
        observations_to_nutritionist: this.observationsToNutritionist,
        measures: this.measures
      }
      const token = localStorage.getItem('@token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.post('http://127.0.0.1:8000/api/avaliations/step1', dataForm)

        .then(response => {
          console.log(response.data);
          this.$router.push('/avaliation/step2');
        })
        .catch(error => {
          console.log(dataForm, token)
          console.error('erro ao enviar dados', error)
        });

    },
    //Logica para formatar data conforme backEnd
    formatDate(date) {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const hours = String(formattedDate.getHours()).padStart(2, '0');
      const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
      const seconds = String(formattedDate.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

  }
}
</script>

<style scoped></style>