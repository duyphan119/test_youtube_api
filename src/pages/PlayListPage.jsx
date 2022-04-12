import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { apiGetPlayListById } from "../api/apiPlaylist";
import { apiGetPlayListItemByPlayListId } from "../api/apiPlayListItem";
import PlayListInfo from "../components/PlayListInfo";
import PlayListItem from "../components/PlayListItem";
import { getCurrentPlayList } from "../redux/playlistSlice";
import "./styles/PlayListPage.css";

const PlayListPage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const playList = useSelector((state) => state.playList.currentPlaylist);
  const dispatch = useDispatch();

  const [queryString] = useSearchParams();
  const list = queryString.get("list");

  useEffect(() => {
    const api = async () => {
      if (list) {
        const item = await apiGetPlayListById(user, list, dispatch);
        const childrenItems = await apiGetPlayListItemByPlayListId(
          user,
          item.id,
          dispatch
        );
        item.items = childrenItems;
        dispatch(getCurrentPlayList(item));
      }
    };
    api();
  }, [list, user, dispatch]);

  console.log(playList);

  if (!playList) return "";

  return (
    <div className="PlayListPage Page">
      <PlayListInfo playList={playList} />
      <div className="PlayListPageItemsContainer CustomScrollbar">
        {playList.items.map((item, index) => {
          return <PlayListItem item={item} key={index} index={index} />;
        })}
      </div>
    </div>
  );
};

export default PlayListPage;
