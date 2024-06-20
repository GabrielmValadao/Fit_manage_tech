import api from '../api'

class MealPlanService {
  async getAllMealPlans() {
    const response = await api.get(`student/meal_plans`)
    return response.data
  }
  async getPlanSchedule(planId) {
    const response = await api.get(`student/meal_plans/${planId}`)
    return response.data
  }
}

export default new MealPlanService()
