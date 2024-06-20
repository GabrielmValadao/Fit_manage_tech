<template>
  <v-app :key="componentKey">


    <v-main>
      <v-container>
        <v-img width="50px" src="blob:http://localhost:5173/eb002bae-208f-4f20-a4f2-fb7cfb9c437d">

        </v-img>
        <v-card class="ma-4 ml-10" color="grey-darken-3" height="85px">
          <v-row class="ma-1">
            <v-col>
              <h1>Medidas do Aluno <v-icon size="25">mdi-ruler-square</v-icon></h1>

            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <v-container>

        <v-card class="pl-5 d-flex align-center ma-4 ml-10">
          <v-card-text class="mt-6">
            <v-form ref="form" @submit.prevent="submitForm">
              <v-row>
                <v-col>
                  <v-text-field data-test="input-torax" v-model="formData.torax" :rules="toraxRules" clearable
                    label="Torax (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-braco_direito" v-model="formData.braco_direito"
                    :rules="bracoDireitoRules" clearable label="Braço Direito (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-braco_esquerdo" v-model="formData.braco_esquerdo"
                    :rules="bracoEsquerdoRules" clearable label="Braço Esquerdo (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-cintura" v-model="formData.cintura" :rules="cinturaRules" clearable
                    label="Cintura (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-antebraco_direito" v-model="formData.antebraco_direito"
                    :rules="antebraçoDireitoRules" clearable label="Antebraço Direito (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>

                <v-col>
                  <v-text-field data-test="input-antebraco_esquerdo" v-model="formData.antebraco_esquerdo"
                    :rules="antebraçoEsquerdoRules" clearable label="Antebraço Esquerdo (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-abdomen" v-model="formData.abdomen" :rules="abdomenRules" clearable
                    label="Abdomen (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-quadril" v-model="formData.quadril" :rules="quadrilRules" clearable
                    label="Quadril (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-coxa_direita" v-model="formData.coxa_direita" :rules="coxaDireitaRules"
                    clearable label="Coxa Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-coxa_esquerda" v-model="formData.coxa_esquerda"
                    :rules="coxaEsquerdaRules" clearable label="Coxa Esquerda (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field data-test="input-panturrilha_direita" v-model="formData.panturrilha_direita"
                    :rules="panturrilhaDireitaRules" clearable label="Panturrilha Direita (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-panturrilha_esquerda" v-model="formData.panturrilha_esquerda"
                    :rules="panturrilhaEsquerdaRules" clearable label="Panturrilha Esquerda (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-punho" v-model="formData.punho" :rules="punhoRules" clearable
                    label="Punho (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-biceps_femoral_direito" v-model="formData.biceps_femoral_direito"
                    :rules="bicepsFemoralDireitoRules" clearable label="Bíceps Femoral Direito (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-biceps_femoral_esquerdo" v-model="formData.biceps_femoral_esquerdo"
                    :rules="bicepsFemoralEsquerdoRules" clearable label="Bíceps Femoral Esquerdo (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-col cols="12" class="text-right">
                  <v-btn type="submit" elevation="2" variant="tonal">Cadastrar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <v-btn class="ma-4 ml-10" color="amber" @click="goBack">
          <v-icon class="pl-4" icon="mdi-arrow-left" start></v-icon>
          Voltar
        </v-btn>
      </v-container>
    </v-main>
  </v-app>

</template>

<script>

import api from '@/services/api';

export default {
  data() {
    return {
      formData: {
        torax: null,
        braco_direito: null,
        braco_esquerdo: null,
        cintura: null,
        antebraco_direito: null,
        antebraco_esquerdo: null,
        abdomen: null,
        quadril: null,
        coxa_direita: null,
        coxa_esquerda: null,
        panturrilha_direita: null,
        panturrilha_esquerda: null,
        punho: null,
        biceps_femoral_direito: null,
        biceps_femoral_esquerdo: null,
      },
      componentKey: 0,

      toraxRules: [
        v => !!v || 'O campo Torax é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Torax',
      ],
      bracoDireitoRules: [
        v => !!v || 'O campo Braço Direito é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Braço Direito',
      ],
      bracoEsquerdoRules: [
        v => !!v || 'O campo Braço Esquerdo é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Braço Esquerdo',
      ],
      cinturaRules: [
        v => !!v || 'O campo Cintura é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Cintura',
      ],
      antebraçoDireitoRules: [
        v => !!v || 'O campo Antebraço Direito é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Antebraço Direito',
      ],
      antebraçoEsquerdoRules: [
        v => !!v || 'O campo Antebraço Esquerdo é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Antebraço Esquerdo',
      ],
      abdomenRules: [
        v => !!v || 'O campo Abdômen é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Abdômen',
      ],
      quadrilRules: [
        v => !!v || 'O campo Quadril é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Quadril',
      ],
      coxaDireitaRules: [
        v => !!v || 'O campo Coxa Direita é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Coxa Direita',
      ],
      coxaEsquerdaRules: [
        v => !!v || 'O campo Coxa Esquerda é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Coxa Esquerda',
      ],
      panturrilhaDireitaRules: [
        v => !!v || 'O campo Panturrilha Direita é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Panturrilha Direita',
      ],
      panturrilhaEsquerdaRules: [
        v => !!v || 'O campo Panturrilha Esquerda é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Panturrilha Esquerda',
      ],
      punhoRules: [
        v => !!v || 'O campo Punho é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Punho',
      ],
      bicepsFemoralDireitoRules: [
        v => !!v || 'O campo Bíceps Femoral Direito é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Bíceps Femoral Direito',
      ],
      bicepsFemoralEsquerdoRules: [
        v => !!v || 'O campo Bíceps Femoral Esquerdo é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Bíceps Femoral Esquerdo',
      ]

    };
  },
  mounted() {
    this.loadInitialData();
  },
  methods: {
    resetForm() {
      this.componentKey += 1;
    },
    goBack() {
      this.$router.push('/avaliation/step2');
    },

    loadInitialData() {
      const savedData = localStorage.getItem('studentEvaluationForm');
      if (savedData) {
        const studentEvaluationData = JSON.parse(savedData);
        Object.assign(this.formData, studentEvaluationData);
      }
    },



    async submitForm() {
      if (!(await this.$refs.form.validate())) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const step1Data = JSON.parse(localStorage.getItem('step1Data'));
      if (!step1Data) {
        alert('Dados da etapa 1 não encontrados. Por favor, volte à etapa 1 e salve as informações novamente.');
        return;
      }

      const formData = new FormData();

      const imageIds = ['image_0', 'image_1', 'image_2', 'image_3'];
      imageIds.forEach((id, index) => {
        const imageId = localStorage.getItem(id);
        if (!imageId) {
          alert(`Imagem ${index + 1} não encontrada. Por favor, verifique as imagens carregadas.`);
          return;
        }
        formData.append(['front', 'right', 'back', 'left'][index], imageId);
      });

      Object.entries(this.formData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      Object.entries(step1Data).forEach(([key, value]) => {
    if (key !== 'student_id' && key !== 'date') { 
      formData.append(key, value);
    }
  });

  try {
    const response = await api.post('/avaliations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


      alert('Avaliação cadastrada com sucesso!');
    console.log(response.data);
  } catch (error) {
    console.error(error);
    alert('Ocorreu um erro ao tentar cadastrar a avaliação.');
  }
},
  },
};
</script>

<style scoped>
.v-container {
  margin-left: 15%;
  width: auto;
}

@media (max-width: 960px) {
  .v-container {
    margin-left: 0;
    width: 100%;
  }
}
</style>
