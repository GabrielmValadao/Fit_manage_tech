<template>
    <div class="container">



        <div class="actions">
            <h2>Alimentação - {{ studentName }}</h2>
            <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">

                    <v-btn type="submit" variant="elevated" color="grey-darken-4 text-amber" v-bind="activatorProps">
                        Planos de Alimentação
                    </v-btn>

                </template>

                <v-card title="Cadastrar Um Novo Plano de Alimentação">
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="descriptionMeal" label="Nome do Plano" type="text"
                                    variant="outlined" :error-messages="errors.name">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Fechar" variant="plain" @click="dialog = false"></v-btn>
                            <v-btn @click="addNewPlan(meal)" color="grey-darken-4 text-amber" text="Salvar"
                                variant="elevated"></v-btn>
                        </v-card-actions>

                        <!-- <v-table class="tabelaDieta">
                                            <thead>
                                                <tr>
                                                    <th class="linha">Descrição</th>
                                                    <th class="linha">Acões</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="meal in planoAlimentacao" :key="meal.id">
                                                    <td>{{ meal.description }}</td>

                                                    <td>
                                                        <div class="d-flex justify-space-around">
                                                            <v-card-actions>
                                                                <v-btn @click="excluirDieta(meal.id)" type="submit"
                                                                    variant="elevated" color="grey-darken-4 text-amber">
                                                                    Excluir
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-table> -->
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>

        <v-card>
            <v-tabs v-model="diaDaSemana" bg-color="grey-darken-4 text-amber">
                <v-tab value="segunda">Segunda</v-tab>
                <v-tab value="terca">Terça</v-tab>
                <v-tab value="quarta">Quarta</v-tab>
                <v-tab value="quinta">Quinta</v-tab>
                <v-tab value="sexta">Sexta</v-tab>
                <v-tab value="sabado">Sábado</v-tab>
                <v-tab value="domingo">Domingo</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <v-form @submit.prevent="handleSubmit" class="formulario">
                            <!-- <v-form class="formulario" @submit.prevent="handleSubmit"> -->

                            <v-autocomplete v-model="idPlanoAlimentacao" :items="planoAlimentacao"
                                item-title="description" item-value="id" label="Plano de Alimentação" type="text"
                                variant="outlined" :error-messages="errors.meal_plan_id" data-test="input-plan">
                            </v-autocomplete>

                            <v-text-field v-model="horario" label="Horário" type="text" variant="outlined"
                                :error-messages="errors.hour" data-test="input-hour">
                            </v-text-field>
                            <v-text-field v-model="titulo" label="Refeição" type="text" variant="outlined"
                                :error-messages="errors.title" data-test="input-title">
                            </v-text-field>
                            <v-text-field v-model="descricao" label="Descrição" type="text" variant="outlined"
                                :error-messages="errors.description" data-test="input-description">
                            </v-text-field>
                            <div class="actions">
                                <v-btn type="submit" variant="elevated" color="grey-darken-4 text-amber"
                                    data-test="submit-button">
                                    {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
                                </v-btn>

                                <v-btn class="actionCancel" @click="resetForm()" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    Cancelar
                                </v-btn>
                            </div>
                        </v-form>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>

        <div class="tabela">
            <h2>Refeições</h2>
            <v-table class="tabelaDieta">
                <thead>
                    <tr>
                        <th class="linha">Horário</th>
                        <th class="linha">Título</th>
                        <th class="linha">Descrição</th>
                        <th class="linha">Acões</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="meal in item" :key="meal.id">
                        <td>{{ meal.hour }}</td>
                        <td>{{ meal.title }}</td>
                        <td>{{ meal.description }}</td>

                        <td>
                            <div class="d-flex justify-space-around">
                                <v-btn @click="editDieta(meal)" type="submit" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    Editar
                                </v-btn>
                                <v-btn @click="excluirDieta(meal.id)" type="submit" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    Excluir
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

import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { schemaMealForm } from '../validations/meal.validations'
import { captureErrorYup } from '../utils/captureErrorYup'
import * as yup from 'yup'

export default {

    data: () => ({
        item: [],
        itemDia: [],
        diaDaSemana: "",
        idPlanoAlimentacao: "",
        planoAlimentacao: [],
        mealId: "",
        horario: "",
        titulo: "",
        descricao: "",
        errors: [],
        tab: null,
        isEditing: false,

        dialog: false,

        descriptionMeal: "",

    }),

    computed: {
        studentName() {
            return this.item.length > 0 ? this.item[0].student.name : '';
        }
    },

    mounted() {
        const diaDaSemana = format(new Date(), "eee", { locale: ptBR });
        this.diaDaSemana = this.removerAcentos(diaDaSemana);

        this.buscarDieta();
        this.buscarDietaDia();

        this.getMealPlans();

        

    },

    watch: {
        diaDaSemana() {
            this.buscarDieta();
        },

        dialog() {
            if (this.dialog == false) {
                this.buscarDieta();
            }
        }
    },

    methods: {
        addNewPlan() {
            const data = {
                student_id: this.$route.params.id,
                description: this.descriptionMeal
            };

            MealService.createMealPlan(data)
                .then(() => {
                    console.log("Cadastrado com sucesso");
                    this.dialog = false
                    this.buscarDieta();
                })
                .catch((error) => {
                    if (error.response?.data?.message) {
                        alert(error.response.data.message);
                    } else {
                        alert("Houve uma falha ao tentar cadastrar");
                    }
                });
        },


        editDieta(meal) {
            this.isEditing = true;
            this.mealId = meal.id;
            this.idPlanoAlimentacao = meal.meal_plan_id;
            this.horario = meal.hour;
            this.titulo = meal.title;
            this.descricao = meal.description;

            console.log(meal)
        },
        resetForm() {
            this.isEditing = false;
            this.mealId = '';
            this.idPlanoAlimentacao = '';
            this.horario = '';
            this.titulo = '';
            this.descricao = '';
            this.errors = []
        },


        getMealPlans() {
            MealService.getMealPlans()
                .then((data) => {
                    this.planoAlimentacao = data;
                    console.log(data)
                })
                .catch(() => {
                    console.log('dados não encontrados');
                });
        },

        handleSubmit() {
            try {
                console.log("entrei aqui")
                const data = {
                    student_id: this.$route?.params?.id,
                    meal_plan_id: this.idPlanoAlimentacao,
                    day: this.diaDaSemana.toUpperCase(),
                    hour: this.horario,
                    title: this.titulo,
                    description: this.descricao,
                };

                schemaMealForm.validateSync(data, { abortEarly: false })

                if (this.isEditing) {
                    MealService.updateMeal(this.mealId, data)
                        .then(() => {
                            this.resetForm()
                            this.buscarDieta()
                            alert('Refeição atualizada com sucesso');

                        })
                        .catch(() => alert('Houve um erro ao atualizar a refeição'));
                } else {

                    MealService.createMeal(data)
                        .then(() => {
                            console.log("Cadastrado com sucesso");
                            this.errors = [];
                            this.resetForm()
                            this.buscarDieta()
                        })
                        .catch(() => {
                            this.showError = true
                        })
                }
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    this.errors = captureErrorYup(error)
                }

            }
        },


        removerAcentos(info) {
            return info.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },


        buscarDieta() {
            MealService.getMealStudent(this.$route?.params?.id)
                .then((data) => {
                    this.item = data;
                    this.filtrarDieta();
                })
                .catch(() => {
                    console.log('dados não encontrados');
                });
        },



        filtrarDieta() {
            const dieta = this.diaDaSemana.toLocaleLowerCase();
            this.item = this.item.filter((data) =>
                data.day.toLocaleLowerCase().includes(dieta)
            );
        },

        buscarDietaDia() {
            MealService.getMealStudent(this.$route?.params?.id)
                .then((data) => {
                    this.itemDia = data;
                    this.filtrarDietaDia();
                })
                .catch(() => {
                    console.log('dados não encontrados');
                });
        },

        filtrarDietaDia() {
            const dietaDia = this.diaDaSemana.toLocaleLowerCase();
            this.itemDia = this.itemDia.filter((data) =>
                data.day.toLocaleLowerCase().includes(dietaDia)
            );
        },

        excluirDieta(id) {
            MealService.deleteMeal(id)
                .then(() => {
                    console.log("Excluído com sucesso");
                    this.buscarDieta()
                    this.resetForm()
                })
                .catch((error) => {
                    if (error.response?.data?.message) {
                        alert(error.response.data.message);
                    } else {
                        alert("Houve uma falha ao tentar excluir");
                    }
                });
        }


    }

};
</script>

<style>
.select {
    width: 100%;
    height: 60px;
    background-color: rgb(243, 243, 242);
    margin-bottom: 20px;
    padding-left: 20px;
    border-bottom: 1px solid rgb(180, 178, 178);
    color: rgb(136, 136, 136);
}

.select {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-bottom: 20px;
    width: 80%;
}

.linha {
    width: 25%;
}

.formulario {
    padding: 5px;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}

.actionCancel {
    margin-right: 10px;
}


@media (max-width: 650px) {
    .main {
        margin: 10px auto;
    }

    .linha {
        width: 10%;
    }

    h2 {
        margin: auto;
    }

    /* .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
    } */

    .tabelaDieta {
        width: 90%;
        margin: auto;
    }

}
</style>