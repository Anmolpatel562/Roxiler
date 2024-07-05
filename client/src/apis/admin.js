import axios from "axios";
const backend = process.env.REACT_APP_BACKENDURL;

export const loginAdmin = async ({ email, password, role }) => {
    try {
      console.log(role)
      const response = await axios.post(
          `${backend}/admin/loginAdmin`, 
          { email, password }
      );
      console.log(response.data.message)
      return response.data.message;
      
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  };
  
  export const getAllUsers = async () => {
    try{
      const response = await axios.get(`${backend}/admin/getAllUsers`);
      console.log(response.data.message);
      return response.data.adminUsers;
    }catch(error){
      console.log(error);
      return error.response.data.message;
    }
  }