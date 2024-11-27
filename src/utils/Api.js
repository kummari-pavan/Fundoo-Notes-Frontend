import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api/v1",
  });
  
  //Login
  export const loginApiCall = async (payload,END_POINT) => {
    try {
      const response = await API.post(`${END_POINT}`,payload );
      return response.data; // the token 
    } catch (error) {
      throw error.response?.data?.message || "User not Login due to backend Error";
    }
  };
// Registration
export const signupApiCall = async (payload,END_POINT) => {
    try {
    const response = await API.post(`${END_POINT}`,payload);
    return response.data; // Return success message or token
    } catch (error) {
    throw error.response?.data?.message || "Backend Error!!";
    }
}

// Fetch all notes
export const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Token missing from localStorage");
      }
      const response = await API.get("/notes/", {
        headers: {
          "Authorization": `Bearer ${token}`, // Send token in the Authorization header
        },      
      });
      console.log("Token in localStorage:", localStorage.getItem("token"));
  
      console.log("Fetched Notes:", response.data); // Log fetched notes
      return response.data; // Return fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error.response || error.message);
      throw error.response?.data?.message || error.message || "Error fetching notes";
    }
  }

//create a new note
export const createNoteApiCall = async (noteData) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          console.error("No token found in localStorage");
          throw new Error("Token missing from localStorage");
      }
      const response = await API.post("/notes", noteData, {
          headers: {
              "Authorization": `Bearer ${token}`,
          },
      });
      console.log("Note Created Successfully:", response.data); 
      return response.data; 
  } catch (error) {
      console.error("Error creating note:", error.response || error.message);
      throw error.response?.data?.message || error.message || "Error creating note";
  }
};





