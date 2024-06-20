<template>
    <div class="container">
        <v-container>
            <header class="d-flex align-center">
                <h1 class="py-12">Alimentação</h1>
            </header>
            <v-divider class="mt-2 mb-2" color="black" :thickness="3"></v-divider>
            <v-select data-test="select-plans" label="Selecione um plano" variant="outlined"
                v-model="selectedDescription" :items="plans.map(plan => plan.description)"
                no-data-text="Nenhum item disponível"></v-select>
            <div class="rounded bg-grey-darken-3 py-2">
                <div class="d-flex align-center flex-column">
                    <div>
                        <v-icon class="my-3 disable mr-2">mdi-calendar-blank</v-icon>
                        <v-btn-toggle color=amber variant="elevated" v-model="toggleDay" divided elevation="3">
                            <v-btn class="text-capitalize" data-test="day-segunda" value="segunda">Segunda</v-btn>
                            <v-btn class="text-capitalize" data-test="day-terca" value="terca">Terça</v-btn>
                            <v-btn class="text-capitalize" value="quarta">Quarta</v-btn>
                            <v-btn class="text-capitalize" value="quinta">Quinta</v-btn>
                            <v-btn class="text-capitalize" value="sexta">Sexta</v-btn>
                            <v-btn class="text-capitalize" value="sabado">Sábado</v-btn>
                            <v-btn class="text-capitalize" value="domingo">Domingo</v-btn>
                        </v-btn-toggle>
                    </div>
                </div>
            </div>
            <div class="d-flex">
                <v-timeline align="start" side="end">
                    <template v-slot:icon><v-icon icon=item.></v-icon></template>
                    <v-timeline-item dot-color="grey-darken-3" size="small" fill-dot>
                        <div>
                            <div>
                                <strong>Café da manhã</strong>
                            </div>
                        </div>
                    </v-timeline-item>
                    <v-timeline-item v-for="(meals, day) in filteredMealPlans" :key="day" dot-color="amber"
                        size="x-small">
                        <div v-for="meal in meals" :key="meal.id">
                            <v-card class="mb-2" v-if="meal.hour < '10:59'">
                                <v-card-title class="bg-amber">
                                    <h4>{{ FormatHour(meal.hour) }}</h4>
                                </v-card-title>
                                <v-card-text class="py-2">
                                    {{ meal.description }}
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-timeline-item>
                    <v-timeline-item dot-color="grey-darken-3" size="small" fill-dot>
                        <div>
                            <div>
                                <strong>Almoço</strong>
                            </div>
                        </div>
                    </v-timeline-item>
                    <v-timeline-item v-for="(meals, day) in filteredMealPlans" :key="day" dot-color="amber"
                        size="x-small">
                        <div v-for="meal in meals" :key="meal.id">
                            <v-card class="mb-2" v-if="meal.hour > '11:00' && meal.hour < '16:00'">
                                <v-card-title class="bg-amber">
                                    <h4>{{ FormatHour(meal.hour) }}</h4>
                                </v-card-title>
                                <v-card-text class="py-2">
                                    {{ meal.description }}
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-timeline-item>
                    <v-timeline-item dot-color="grey-darken-3" size="small" fill-dot>
                        <div>
                            <div>
                                <strong>Jantar</strong>
                            </div>
                        </div>
                    </v-timeline-item>
                    <v-timeline-item v-for="(meals, day) in filteredMealPlans" :key="day" dot-color="amber"
                        size="x-small">
                        <div v-for="meal in meals" :key="meal.id">
                            <v-card class="mb-2" v-if="meal.hour > '16:00' && meal.hour < '24:00'">
                                <v-card-title class="bg-amber">
                                    <h4>{{ FormatHour(meal.hour) }}</h4>
                                </v-card-title>
                                <v-card-text class="py-2">
                                    {{ meal.description }}
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </div>
            <v-snackbar data-test="snackbar" vertical v-model="snackbar" timeout=2000 :color="colorSnack" elevation="5"
                variant="outlined">
                {{ this.snackText }}
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
import MealPlanService from '@/services/Student/MealPlanService';
import moment from 'moment';

export default {
    data() {
        return {
            selectedDescription: null,
            plans: [],
            planSchedule: '',
            day: '',
            toggleDay: "",
            snackText: 'Erro ao buscar planos de alimentação',
            snackbar: false,
            colorSnack: 'red-darken-2',
        }
    },
    methods: {
        getPlans() {
            MealPlanService.getAllMealPlans()
                .then((data) => {
                    this.plans = data
                })
                .catch(() => this.snackbar = true)
        },
        getPlanSchedule() {
            MealPlanService.getPlanSchedule(this.selectedPlanId)
                .then((data) => {
                    this.planSchedule = data
                })
                .catch(() => this.snackbar = true)
        },
        getDay() {
            let today = moment().format('dddd');
            this.day = today === "Sunday" ? "domingo" :
                today === "Saturday" ? "sabado" :
                    today === "Monday" ? "segunda" :
                        today === "Tuesday" ? "terca" :
                            today === "Wednesday" ? "quarta" :
                                today === "Thursday" ? "quinta" :
                                    today === "Friday" ? "sexta" :
                                        this.day;
        }
    },

    mounted() {
        this.getPlans()
        this.getDay()
        this.toggleDay = this.day
    },
    computed: {
        selectedPlanId() {
            const selectedPlan = this.plans.find(plan => plan.description === this.selectedDescription);
            return selectedPlan ? selectedPlan.id : null;
        },
        filteredMealPlans() {
            if (!this.planSchedule || !this.planSchedule.meal_plans || !this.toggleDay) {
                return {};
            }
            const selectedDay = this.toggleDay.toLowerCase();
            return Object.keys(this.planSchedule.meal_plans)
                .filter(day => day.toLowerCase() === selectedDay)
                .reduce((obj, key) => {
                    obj[key] = this.planSchedule.meal_plans[key];
                    return obj;
                }, {});
        },
        FormatHour() {
            return function (Mealhour) {
                return moment(Mealhour, 'HH:mm:ss').format('HH:mm');
            };
        },
    },
    watch: {
        selectedDescription(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.getPlanSchedule();
            }
        },

    }
}
</script>