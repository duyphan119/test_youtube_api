import axios from "axios";

const instance = axios.create({
   withCredentials: true
})

export const configAxiosAuthorization = (user, dispatch) => {

   instance.interceptors.request((config) => {

      if (user) {
         config.headers["authorization"] = `Bearer ${user.accessToken}`
      }

      return config;
   }, err => Promise.reject(err))

   instance.interceptors.response((response) => {
      return response.data;
   }, err => Promise.reject(err))

   return instance
}
export const configAxiosResponse = () => {

   instance.interceptors.response((response) => {
      return response.data;
   }, err => Promise.reject(err))

   return instance
}