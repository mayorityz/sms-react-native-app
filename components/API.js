import axios from "axios";
import URL from "./../constant";

export const login = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/users/login`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const newRecord = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/users/newuser`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getRecord = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/fetchrecord`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const Logs = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/newLog`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};
