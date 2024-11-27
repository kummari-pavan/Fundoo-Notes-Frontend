import axios from "axios"
const BASE_URL=`http://localhost:4000/api/v1/`;

const getAuth =()=>{
    return `Bearer ${localStorage.getItem('token')}`
}

export const loginApiCall = async(payload,END_POINT) => {
    return await axios.post(`${BASE_URL}${END_POINT}`, payload)
}

export const signupApiCall = async(payload,END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const fetchNotes = async(END_POINT="/notes/")=>{
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { headers:{
            Authorization:getAuth()
         }
         }
    )
}

export const createNoteApiCall = async(payload,END_POINT="/notes") => {
  return await axios.post(`${BASE_URL}${END_POINT}`,payload,{
   headers:{
       Authorization:getAuth()
   }
  })
}

export const archiveApiCall = async(END_POINT) => {
  return await axios.put(`${BASE_URL}${END_POINT}`,{},{
   headers:{
       Authorization:getAuth()
   }
  })
}

export const fetchArchiveNotes = async(END_POINT="/notes/archive")=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
      { headers:{
          Authorization:getAuth()
       }
       }
  )
}

export const trashApiCall = async(END_POINT) => {
  return await axios.put(`${BASE_URL}${END_POINT}`,{},{
   headers:{
       Authorization:getAuth()
   }
  })
}

export const fetchTrashNotes = async(END_POINT="/notes/trash")=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
      { headers:{
          Authorization:getAuth()
       }
       }
  )
}

