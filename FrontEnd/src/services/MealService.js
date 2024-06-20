import api from './api';

class MealService {

    async getMealStudent(studentId) {
        const response = await api.get(`/meal/${studentId}`);
        return response.data;
    }

    async getStudents() {
        const response = await api.get(`/students`);
        return response.data;
    }

    async getMealPlans() {
        const response = await api.get(`/meal_plans`);
        return response.data;
    }

    async createMeal(data) {
        const response = await api.post('/cad_meal', data);
        return response.data;
    }

    async createMealPlan(data) {
        const response = await api.post('/meal_plans', data);
        return response.data;
    }

    async updateMeal(mealId, data) {
        const response = await api.put(`/update_meal/${mealId}`, data);
        return response.data;
    }

    async deleteMeal(studentId) {
        const response = await api.delete(`/delete_meal/${studentId}`);
        return response.data;
    }
}

export default new MealService();
