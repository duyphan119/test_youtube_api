import React from "react";
import { Link } from "react-router-dom";
import "./styles/PlayListItem.css";

const PlayListItem = ({ item, index }) => {
  console.log(item);
  return (
    <Link
      to={`/watch?v=${item.snippet.resourceId.videoId}&list=${
        item.snippet.playlistId
      }&index=${index + 1}`}
      className="PlayListItem"
    >
      <div className="PlayListItemThumbnail">
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
