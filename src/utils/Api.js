import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:4000/api/v1",
  });




export const loginApiCall = async(payload,END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const signupApiCall = async(payload,END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}



