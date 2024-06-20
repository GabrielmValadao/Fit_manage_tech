import api from '../api'

class GetExercises {
  async getAllUserExercises() {
    const response = await api.get('http://localhost:8000/api/exercises/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@token')}`
      }
    })
    return response
  }
}

export default new GetExercises()
