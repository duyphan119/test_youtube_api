import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import * as constants from '../constants';
import "./styles/LoginPage.css";

const LoginPage = () => {

  const user = useSelector(state => state.auth.currentUser)

  const handleOnclick = () => {
    window.open(`${constants.SERVER_URL}/v1/api/auth/google`, "_self");
  }
  
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className='LoginPage Page'>
      <div className='LoginForm'>
        <div className="LoginFormTitle">Đăng nhập</div>
        <button className='Btn BtnLogin' onClick={handleOnclick}>
          <span><FcGoogle /></span>
          Đăng nhập với Google
        </button>
      </div>
    </div>
  )
}

export default LoginPage