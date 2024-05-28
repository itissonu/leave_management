import axios from "axios";
import { URL } from "../../utils/serverurl";

const submitLeaveRequest = async (data) => {
  try {
    const response = await axios.post(`${URL}leave/submit`, data, {
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
const getLeaveForEmployee = async (id) => {
  try {
    const response = await axios.get(`${URL}leave/employee/${id}`, {
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
const getAbsentDatesforuser = async (id) => {
  try {
    const response = await axios.get(`${URL}leave/absent-dates/${id}`, {
      withCredentials: true,
    });
    if (response.data) {

      return response.data;
    }
  } catch (error) {
    throw error.response.data

  }
}
const getallleavesadmin = async (name) => {
  try {
    const response = await axios.get(`${URL}leave/manager?name=${name}`, {
      withCredentials: true,
    });
    if (response.data) {

      return response.data;
    }
  } catch (error) {
    throw error.response.data

  }
}
const updateLeave = async (data) => {
  try {
    const {id,...datas}=data
    const response = await axios.put(`${URL}leave/update/${id}`,datas, {
      withCredentials: true,
    });
    if (response.data) {

      return response.data;
    }
  } catch (error) {
    throw error.response.data

  }
}

const leaveFunctions = {
  submitLeaveRequest, getLeaveForEmployee, getAbsentDatesforuser,getallleavesadmin,updateLeave
}
export default leaveFunctions;
