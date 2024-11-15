import axios from "axios";

export const loginApiCall = ()=>{
    return axios.post("http://localhost:3000/api/v1/users/login",{email:"kpavansolutions@gmail.com",password:"PavanPavanPavanR180185"})
}  