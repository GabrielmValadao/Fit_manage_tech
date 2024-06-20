import api from "./api"

class StudentRegistrationService {

    async createStudent(formData) {
        const response = await api.post('students', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}

export default new StudentRegistrationService();