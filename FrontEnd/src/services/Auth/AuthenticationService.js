import api from "../api";

class AuthenticationService {
    
    async login(body){
        const response = await api.post('login', body)
        return response.data
    }

    async createUser(body){
        const response = await api.post('users', body)
        return response.data
    }

    async getsUsers(){
        const response = await api.get('users')
        return response.data
    }

    async fetchDashboardData(){
            const response = await api.get('dashboard/admin');
            return response.data.data;
    }

    async fetchStudentsData(){
        const response = await api.get('students');
        return response.data;
    }

    async logout(){
        const response = await api.post('logout')
        return response.data
    }
}

export default new AuthenticationService();