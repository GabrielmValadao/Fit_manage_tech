<template>

    <div class="container">
        <div class="tabela">
            <h2>Estudantes</h2>
            <v-table class="tabelaDieta">
                <thead>
                    <tr>
                        <th class="linha">Nome</th>
                        <th class="linha">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in item" :key="student.id">
                        <td>{{ student.name }}</td>
                        <td>
                            <div class="d-flex justify-space-around">
                                <v-btn @click="editDieta(meal)" type="submit" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    Cadastrar Avaliação
                                </v-btn>
                                <v-btn @click="excluirDieta(meal.id)" type="submit" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    Ver Avaliações
                                </v-btn>

                                <v-btn @click="cadDieta(student.id)" type="submit" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    cadastrar dieta
                                </v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>

    </div>
</template>

<script>

import MealService from "../services/MealService";

export default {

    data: () => ({
        item: []
    }),

    computed: {

    },

    mounted() {


 this.getStudents()
    },

    watch: {

    },

    methods: {

        cadDieta(id) {
            this.$router.push(`/dietas/${id}`)
        },

        getStudents() {
            MealService.getStudents()
                .then((data) => {
                    this.item = data;
                    console.log(data)
                })
                .catch(() => {
                    console.log('dados não encontrados');
                });
        }
    }
}

</script>

<style></style>