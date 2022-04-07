import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {

   const msg = useSelector(state => state.toast.toast)

   console.log(msg);

   useEffect(() => {
      if(msg.isVisible){
         toast[msg.type](msg.title, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   }, [msg])

   if(!msg.isVisible) return "";

   return (
      <ToastContainer />
   )
}

export default Toast