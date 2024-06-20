import api from '../api'

class CreateWorkoutService {
  async createWorkout(body) {
    const response = await api.post('workouts', body, {
      headers: {
        token: localStorage.getItem('@token'),
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

export default new CreateWorkoutService()
