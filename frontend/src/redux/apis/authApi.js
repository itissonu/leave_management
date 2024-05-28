import axios from "axios";
import { URL } from "../../utils/serverurl";

const login = async (user) => {
  try {
    const response = await axios.post(`${URL}user/login`, user, {
      withCredentials: true,
    });
    if (response.data) {
      console.log(response.data)
      return response.data;
    }
  } catch (error) {
    throw error.response.data

  }
}
const logout = async () => {
  try {
    const response = await axios.post(`${URL}user/logout`, {
      withCredentials: true,
    });
    if (response.data) {
      console.log(response.data)
      return response.data;
    }

  } catch (error) {
    throw error.response.data

  }
}
const register = async (user) => {
  try {
    const response = await axios.post(`${URL}user/register`, user, {
      withCredentials: true,
    });
    if (response.data) {
     
      return response.data;
    }
  } catch (error) {
    throw error.response.data

  }
}
const getalluser = async () => {
  try {
    const response = await axios.get(`${URL}user/allemployee`, {
      withCredentials: true,
    });
    console.log(response)
    if (response.data) {
     
      return response.data;
    }
  } catch (error) {
    throw error.response.data

  }
}
const getauser = async (id) => {
  try {
    const response = await axios.get(`${URL}user/getanemployee/${id}`, {
      withCredentials: true,
    });
    
    if (response.data) {
     
      return response.data;
    }
  } catch (error) {
    throw error.response.data

  }
}

const userFunctions = {
  login, logout, register,getalluser,getauser
}
export default userFunctions;

