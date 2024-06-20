import api from './api'

class InstructorListWorkoutsService {

    async ListWorkouts(studentId) {

        const response = await api.get(`students/${studentId}/workouts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('@token')}`
            }
        })
        return response.data
    }

}

export default new InstructorListWorkoutsService()