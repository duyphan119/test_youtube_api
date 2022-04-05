import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./styles/Header.css";

const Header = () => {

   const user = useSelector(state => state.auth.currentUser)

   const [q, setQ] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (q !== "") {
         navigate(`/search?q=${q}`)
      }
   }

   console.log(user);

   return (
      <header className='Header'>
         <div className="HeaderContainer Container">
            <Link to="/" className="HeaderLeft">YOUTUBE_API</Link>
            <div className="HeaderMiddle">
               <form className='HeaderForm' onSubmit={handleSubmit}>
                  <input
                     name="q"
                     id="q"
                     placeholder="Tìm kiếm"
                     autoComplete='off'
                     value={q}
                     onChange={e => setQ(e.target.value)}
                  />
                  <button type="submit">
                     <BsSearch />
                  </button>
               </form>
            </div>
            {user ? <div className="HeaderRight">
               <div className="HeaderRightUser">
                  <span>{user.name}</span>
                  <img src={user.picture} alt={user.name} />
               </div>
            </div> : <Link to="/login">Đăng nhập</Link>}

         </div>
      </header>
   )
}

export default Header