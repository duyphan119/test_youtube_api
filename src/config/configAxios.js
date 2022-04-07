import axios from "axios";
import { showToast } from "../redux/toastSlice";

const instance = axios.create({
   withCredentials: true
})

export const configAxiosAuthorization = (user, dispatch) => {
   instance.interceptors.request.use((config) => {

      if (user) {
         if (user.accessToken) {
            config.headers["authorization"] = `Bearer ${user.accessToken}`
         } else {
            dispatch(showToast({
               type: "info",
               title: "Bạn cần đăng nhập để thực hiện thao tác",
               isVisible: true
            }))
         }
      } else {
         dispatch(showToast({
            type: "info",
            title: "Bạn cần đăng nhập để thực hiện thao tác",
            isVisible: true
         }))
      }

      return config;
   }, err => {Promise.reject(err)})

   instance.interceptors.response.use((response) => {
      if(response.data)
         return response.data;
      return response
   }, err => Promise.reject(err))

   return instance
}

export const configAxiosAuthorizationNoResponse = (user, dispatch) => {
   instance.interceptors.request.use((config) => {

      if (user) {
         if (user.accessToken) {
            config.headers["authorization"] = `Bearer ${user.accessToken}`
         } else {
            dispatch(showToast({
               type: "info",
               title: "Bạn cần đăng nhập để thực hiện thao tác",
               isVisible: true
            }))
         }
      } else {
         dispatch(showToast({
            type: "info",
            title: "Bạn cần đăng nhập để thực hiện thao tác",
            isVisible: true
         }))
      }

      return config;
   }, err => {Promise.reject(err)})

   return instance
}

export const configAxiosResponse = () => {

   instance.interceptors.response.use((response) => {
      return response.data;
   }, err => Promise.reject(err))

   return instance
}