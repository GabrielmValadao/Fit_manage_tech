import api from './api'

class StudentService {
  async getAllStudents(text = '') {
    const response = await api.get(`students?text=${text}`)
    return response.data
  }

  async deleteOneStudent(studentId) {
    const response = await api.delete(`students/${studentId}`)
    return response.data
  }
}

export default new StudentService()
