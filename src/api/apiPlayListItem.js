import axios from "axios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/playlistItem`;

export const apiCreatePlayListItem = async (user, playListItem) => {
   try {
      await axios.post(`${API_URL}`, playListItem, {
         headers: {
            authorization: `Bearer ${user.accessToken}`
         },
         withCredentials: true
      })
   } catch (error) {
      console.log(error)
   }
}