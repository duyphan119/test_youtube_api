import React from "react";
import { Link } from "react-router-dom";
import "./styles/PlayListItem.css";

const PlayListItem = ({ item, index, classNameImg, isActive }) => {
  console.log(item);
  return (
    <Link
      to={`/watch?v=${item.snippet.resourceId.videoId}&list=${
        item.snippet.playlistId
      }&index=${index + 1}`}
      className={`PlayListItem ${isActive ? "active" : ""}`}
    >
      <div className={"PlayListItemThumbnail " + classNameImg}>
        <img src={item.snippet.thumbnails.medium.url} alt="" />
      </div>
      <div className="PlayListItemInfo">
        <div className="PlayListItemTitle">{item.snippet.title}</div>
        <div className="PlayListItemChannelTitle">
          {item.snippet.videoOwnerChannelTitle}
        </div>
      </div>
    </Link>
  );
};

export default PlayListItem;
