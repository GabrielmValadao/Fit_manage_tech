import api from './api'

class DeleteWorkoutService{

async DeleteWorkout(workoutId) {
        
    const response = await api.delete(`workouts/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`
        }
    })
    return response.data
}

}

export default new DeleteWorkoutService()