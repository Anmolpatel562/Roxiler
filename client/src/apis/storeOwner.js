import axios from "axios";
const backend = process.env.REACT_APP_BACKENDURL;

export const loginStoreOwner = async ({email,password,role}) => {
    try {
        console.log(role)
        const response = await axios.post(
            `${backend}/storeOwner/loginStoreOwner`, 
            { email, password }
        );
        console.log(response.data.message)
        return response.data.message;
        
      } catch (error) {
        console.log(error);
        return error.response.data.message;
      }
}

export const calculateTotalStores = async () => {
  try{
    const response = await axios.get(`${backend}/storeOwner/calculateTotalStores`);
    console.log(response.data.message);
    return response.data.totalStores;
  }catch(error){
    console.log(error);
    return error.response.data.message;
  }
}

export const getAllStores = async () => {
  try{
    const response = await axios.get(`${backend}/storeOwner/getAllStores`);
    return response.data.response;
  }catch(error){
    console.log(error);
    return error.response.data.message;
  }
}

export const createStoreOwner = async ({
  name,
  email,
  password,
  address,
  role,
}) => {
  try {
    const response = await axios.post(
      `${backend}/storeOwner/registerStoreOwner`,
      { name, email, password, address, role }
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};