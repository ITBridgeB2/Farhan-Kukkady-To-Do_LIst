import axios from 'axios'
class UserDetailService{
    saveUserDetails(userdetails){
        return axios.post("http://localhost:7070/tasks",userdetails)

    }
}
export default new UserDetailService()