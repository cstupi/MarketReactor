import axios from 'axios';
const endpoint = "http://localhost:3001/api/user/login";
const UserAuth = {
    isAuthenticated: false,
    async refresh() {
        try {
            const res = await axios.get(endpoint);
            this.isAuthenticated = res && res.data && res.data.userid;
        }catch(ex){
            console.log(ex);
            this.isAuthenticated = false;
        }
    },
    async login(username, password){
        try {
            const res = await axios.post(endpoint, {username: username, password: password});
        }catch(ex){
            console.log(ex);
            this.isAuthenticated = false;
        }
    },
    async logout(){
        try{
            const res = await axios.get(endpoint + '/logout');
            console.log('Logged out: ' + endpoint)
        }catch(ex){
            console.log('Error logging out');
            console.log(ex);
        }
        this.isAuthenticated = false;
    }
}
export default UserAuth;