import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetPlayListById } from "../api/apiPlaylist";
import { apiDeletePlayListItem } from "../api/apiPlayListItem";
import { getCurrentPlayList } from "../redux/playlistSlice";
import "./styles/PlayListItem.css";

const PlayListItem = ({ item, index, classNameImg, isActive }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const playList = useSelector((state) => state.playList.currentPlayList);
  console.log(playList);
  const dispatch = useDispatch();

  const handleDeleteItem = async () => {
    console.log(item);
    apiDeletePlayListItem(user, item.id, dispatch);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Link
        to={`/watch?v=${item.snippet.resourceId.videoId}&list=${
          item.snippet.playlistId
        }&index=${index + 1}`}
        className={`PlayListItem ${isActive ? "active" : ""}`}
      >
        <div className={"PlayListItemThumbnail " + classNameImg}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
        </div>
        <div className={`PlayListItemInfo ${classNameImg ? "" : "IsPlaying"}`}>
          <div className="PlayListItemTitle">{item.snippet.title}</div>
          <div className="PlayListItemChannelTitle">
            {item.snippet.videoOwnerChannelTitle}
          </div>
        </div>
      </Link>
      {!classNameImg && (
        <span
          onClick={handleDeleteItem}
          style={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          x
        </span>
      )}
    </div>
  );
};

export default PlayListItem;
