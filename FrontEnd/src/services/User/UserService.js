import api from '../api'

class UserService {
  async createUser(body, config) {
    const response = await api.post('users', body, config)
    return response.data
  }

  async getOneUser(id, config) {
    const response = await api.get(`users/${id}`, config)
    return response.data
  }

  async updateUser(id, body, config) {
    const response = await api.put(`users/${id}`, body, config)
    return response.data
  }

  async getAllUsers() {
    const response = await api.get('users')
    return response
  }

  async updateStatusUserDelete(userId, body) {
    const response = await api.put(`users/${userId}`, body)
    return response
  }

  async getImage(){
    const response = await api.get('user/image')
    return response.data
  }
}

export default new UserService()
