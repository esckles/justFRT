import axios from "axios";

const URL = "http://localhost:22330/api";

export const createAccount = async (data: any) => {
  try {
    const config: any = {
      headers: {
        "content-type": "multipart-formdata",
      },
    };
    return await axios
      .post(`${URL}/register-account`, data, config)
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginAccount = async (data: any) => {
  try {
    return await axios.post(`${URL}/login`, data).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const readUser = async (userID: string) => {
  try {
    return await axios.get(`${URL}/get-one-user/${userID}`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const verifyAccount = async (userID: string) => {
  try {
    return await axios
      .get(`${URL}/verify-account/${userID}`)
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};

export const forgetPassword = async (email: string) => {
  try {
    return await axios
      .patch(`${URL}/forget-account-password`, { email })
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (userID: string, password: string) => {
  try {
    return await axios
      .patch(`${URL}/reset-account-password/${userID}`, { password })
      .then((res: any) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};
