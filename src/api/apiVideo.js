import axios from "axios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/video`;

export const getVideoById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
