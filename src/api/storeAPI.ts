import axios from "axios";

const URL = "https://6750661d69dc1669ec1afa55.mockapi.io/api/my-product";

export const viewProduct = async () => {
  try {
    return await axios.get(`${URL}`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};
