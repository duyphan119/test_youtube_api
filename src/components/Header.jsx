import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiLogout } from "../api/apiAuth";
import "./styles/Header.css";

const Header = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [q, setQ] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (q !== "") {
      navigate(`/search?q=${q}`);
    }
  };

  const handleLogout = () => {
    apiLogout(dispatch);
  };

  console.log(user);

  return (
    <header className="Header">
      <div className="HeaderContainer Container">
        <Link to="/" className="HeaderLeft">
          YOUTUBE_API
        </Link>
        <div className="HeaderMiddle">
          <form className="HeaderForm" onSubmit={handleSubmit}>
            <input
              name="q"
              id="q"
              placeholder="Tìm kiếm"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit">
              <BsSearch />
            </button>
          </form>
        </div>
        {user ? (
          <div className="HeaderRight">
            <label
              htmlFor="HeaderRightUserNotificationInput"
              className="HeaderRightUser"
            >
              <span>{user.name}</span>
              <img src={user.picture} alt={user.name} />
              <input
                type="checkbox"
                id="HeaderRightUserNotificationInput"
                hidden
              />
              <div className="HeaderRightUserNotification">
                <Link to={`/`} className="HeaderRightUserNotificationItem">
                  Danh sách phát
                </Link>
                <div
                  className="HeaderRightUserNotificationItem"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            </label>
          </div>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
