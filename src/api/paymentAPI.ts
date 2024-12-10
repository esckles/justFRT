import axios from "axios";

const URL: string = "http://localhost:22330/api";

export const payment = async (data: any) => {
  try {
    return await axios
      .post(`http://localhost:22330/api/fund-account-wallet/`, data)
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};

export const verifyPayment = async (reference: string) => {
  try {
    return await axios.get(`${URL}/verify-fund/${reference}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};
