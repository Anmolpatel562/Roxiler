import axios from "axios";
const backend = process.env.REACT_APP_BACKENDURL;

export const createNormalUser = async ({
  name,
  email,
  password,
  address,
  role,
}) => {
  try {
    const response = await axios.post(
      `${backend}/normalUser/createNormalUser`,
      { name, email, password, address, role }
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const loginNormalUser = async ({ email, password,role }) => {
  try {
    console.log(role)
    const response = await axios.post(
        `${backend}/normalUser/loginNormalUser`, 
        { email, password }
    );
    console.log(response.data.message)
    return response.data.message;
    
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const totalUser = async () => {
  try{
    const response = await axios.get(`${backend}/normalUser/totalUser`);
    console.log(response.data.message);
    return response.data.totalUser;
  }catch(error){
    console.log(error);
    return error.response.data.message;
  }
}

export const calculateUsersSubmittedRating = async () => {
  try{
    const response = await axios.get(`${backend}/normalUser/calculateUsersSubmittedRating`);
    console.log(response.data.message);
    return response.data.usersWithRatings; 
  }catch(error){
    console.log(error);
    return error.response.data.message;
  }
}

export const getAllNormalUsers = async () => {
  try{
   const response = await axios.get(`${backend}/normalUser/getAllNormalUsers`);
   console.log(response.data.message);
   return response.data.normalUser;
  }catch(error){
    console.log(error);
  }
}