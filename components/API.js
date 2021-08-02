import axios from "axios";
import URL, { userid, apikey } from "./../constant";

export const login = async (params) => {
  try {
    console.log(params);
    const { data } = await axios.post(`${URL}/users/login`, params);
    return data;
  } catch (error) {
    console.log(error);
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

export const updateWallet = async (params) => {
  console.log(params);
  try {
    const { data } = await axios.post(`${URL}/payment/newpayment`, params);
    return data;
  } catch (error) {}
};

// external api...
export const sendAirtimeToOne = async ({ amt, mobile, ntw }) => {
  const externalApi = `https://www.nellobytesystems.com/APIAirtimeV1.asp?UserID=${userid}&APIKey=${apikey}&MobileNetwork=${ntw}&Amount=${amt}&MobileNumber=${mobile}&CallBackURL=http://www.your-website.com`;
  try {
    const { data } = await axios.get(externalApi);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

// deduct from wallet.
export const balaceAdjustment = async ({ amount, userid }) => {
  const balanceAdjApi = "";
  try {
    const { data } = await axios.post(balanceAdjApi, { amount, userid });
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
