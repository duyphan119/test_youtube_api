import axios from "axios";
import * as constants from "../constants";
import { getAllPlayLists } from "../redux/playlistSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/playlist`;

export const apiGetAllPlayLists = async (user, dispatch) => {
   try {
      const res = await axios.get(`${API_URL}`, {
         headers: {
            authorization: `Bearer ${user.accessToken}`
         },
         withCredentials: true
      })
      dispatch(getAllPlayLists(res.data))
   } catch (error) {
      console.log(error)
   }
}

export const apiCreatePlayList = async (user, playList) => {
   try {
      const res = await axios.post(`${API_URL}`, playList, {
         headers: {
            authorization: `Bearer ${user.accessToken}`
         },
         withCredentials: true
      })
      return res.data;
   } catch (error) {
      console.log(error)
   }
}