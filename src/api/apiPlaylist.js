import axios from "axios";
import { configAxiosAuthorization } from "../config/configAxios";
import * as constants from "../constants";
import { getAllPlayLists } from "../redux/playlistSlice";
import { showToast } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/playlist`;

export const apiGetAllPlayLists = async (user, dispatch) => {
   try {
      const res = await configAxiosAuthorization(user, dispatch).get(`${API_URL}`, {
         withCredentials: true
      })
      dispatch(getAllPlayLists(res))
   } catch (error) {
      console.log(error)
      const code = error.response.data.code;
      if(code === 401){
         dispatch(showToast({
            type: "info",
            title: "Bạn cần đăng nhập để thực hiện thao tác",
            isVisible: true
         }))
      }
   }
}

export const apiCreatePlayList = async (user, playList, dispatch) => {
   try {
      const res = await  configAxiosAuthorization(user, dispatch).post(`${API_URL}`, playList, {
         withCredentials: true
      })
      return res;
   } catch (error) {
      const code = error.response.data.code;
      if(code === 401){
         dispatch(showToast({
            type: "info",
            title: "Bạn cần đăng nhập để thực hiện thao tác",
            isVisible: true
         }))
      }
   }
}