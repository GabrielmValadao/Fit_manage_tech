import api from '../api';

class UpdateWorkoutService {
  async updateWorkout(body, workoutId) {
    const response = await api.put(`workouts/${workoutId}`, body, {
      headers: {
        token: localStorage.getItem('@token'),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
}

export default new UpdateWorkoutService();