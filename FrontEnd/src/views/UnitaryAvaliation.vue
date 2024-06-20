<template>
  <div class="container mt-5">
    <v-card color="grey-darken-3" height="85px">
      <v-row class="ma-1">
        <v-col>
          <h1>Avaliações</h1>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="ma-1 mt-12">
      <v-col cols="6">
        <!-- Select para escolher avaliações -->
        <v-select v-model="selectedAvaliationId" :items="avaliationOptions" label="Escolha uma avaliação"
          item-title="text" @change="selectAvaliation"></v-select>
      </v-col>
    </v-row>
    <v-card color="amber" class="ma-4" v-if="avaliation">
      <v-table fixed-header class="ma-2">
        <thead>
          <tr>
            <th class="text-left">Informações</th>
            <th>Valores</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="avaliation">
            <td>Data</td>
            <td>{{ avaliation.date }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Idade</td>
            <td>{{ avaliation.age }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Peso</td>
            <td>{{ avaliation.weight }}kg</td>
          </tr>
          <tr v-if="avaliation">
            <td>Altura</td>
            <td>{{ avaliation.height }}m</td>
          </tr>
          <tr v-if="avaliation">
            <td>Punho</td>
            <td>{{ avaliation.punho }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Antebraço Direito</td>
            <td>{{ avaliation.antebraco_direito }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Antebraço Esquerdo</td>
            <td>{{ avaliation.antebraco_esquerdo }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Braço Direito</td>
            <td>{{ avaliation.braco_direito }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Braço Esquerdo</td>
            <td>{{ avaliation.braco_esquerdo }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Torax</td>
            <td>{{ avaliation.torax }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Abdomen</td>
            <td>{{ avaliation.abdomen }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Quadril</td>
            <td>{{ avaliation.quadril }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Coxa Direira</td>
            <td>{{ avaliation.coxa_direita }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Coxa Esquerda</td>
            <td>{{ avaliation.coxa_esquerda }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Biceps Femoral Direito</td>
            <td>{{ avaliation.biceps_femoral_direito }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Biceps Femoral Esquerdo</td>
            <td>{{ avaliation.biceps_femoral_esquerdo }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Panturrilha Direita</td>
            <td>{{ avaliation.panturrilha_direita }}</td>
          </tr>
          <tr v-if="avaliation">
            <td>Panturrilha Esquerda</td>
            <td>{{ avaliation.panturrilha_esquerda }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <div v-if="avaliation">
      <img :src="avaliation.imagem_back.url" alt="Imagem de costas" width="250px">
      <img :src="avaliation.imagem_front.url" alt="Imagem frontal" width="250px">
      <img :src="avaliation.imagem_left.url" alt="Imagem de lateral esquerda" width="250px">
      <img :src="avaliation.imagem_right.url" alt="Imagem de lateral direita" width="250px">
      
      
    </div>
    <v-card color="grey-darken-1">
      <v-col cols="12" v-if="avaliation">
        <p><strong>Observações para Aluno:</strong> {{ avaliation.observations_to_student }}</p>
        <p><strong>Observações para Nutricionista:</strong> {{ avaliation.observations_to_nutritionist }}</p>
      </v-col>
    </v-card>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedAvaliationId: null,
      avaliationOptions: [], // Lista de opções do select
      avaliation: null, // Detalhes da avaliação selecionada
      avaliationImages: [], // Lista de URLs das imagens da avaliação
      avaliations: []
    };
  },
  watch: {
    selectedAvaliationId(newId) {
      console.log(this.avaliations)
      this.avaliation = this.avaliations.find(avaliation => avaliation.id == newId)
    }
  },
  methods: {
    selectAvaliation() {
      axios.get(`http://localhost:8000/api/avaliations/${this.selectedAvaliationId}`)
        .then(response => {
          this.avaliation = response.data;

          this.avaliationImages = [this.avaliation.back, this.avaliation.front, this.avaliation.left, this.avaliation.right];
        })
        .catch(error => {
          console.error('Erro ao obter detalhes da avaliação:', error);
        });
    },
    
  },
  mounted() {
    const studentId = this.$route.params.studentId; // Perguntar como fazer para puxar automatico

    const accessToken = localStorage.getItem('@token');

    if (!accessToken) {
      console.error('Token de autenticação não encontrado no localStorage');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    axios.get(`http://localhost:8000/api/avaliations/${studentId}`)
      .then(response => {

        this.avaliationOptions = response.data.map(avaliation => ({
          text: `Avaliação ${avaliation.date}`, // Texto visível no select
          value: avaliation.id
        }));

        this.avaliations = response.data

      })
      .catch(error => {
        console.error('Erro ao obter lista de avaliações:', error);
      });
  }
};
</script>
