import React, { useContext, useEffect, useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { apiCreatePlayList, apiGetAllPlayLists } from "../api/apiPlaylist";
import {
  apiCreatePlayListItem,
  apiDeletePlayListItem,
  apiGetPlayListItemByPlayListId,
} from "../api/apiPlayListItem";
import { AppContext } from "../App";
import { showToast } from "../redux/toastSlice";
import "./styles/PlayList.css";

const PlayList = () => {
  const context = useContext(AppContext);

  const user = useSelector((state) => state.auth.currentUser);
  const playLists = useSelector((state) => state.playList.list);
  const video = useSelector((state) => state.video.currentVideo);

  const dispatch = useDispatch();

  const [isInPlayList, setIsInPlayList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [playList, setPlayList] = useState({
    title: "",
    privacyStatus: "public",
  });
  // console.log(video);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlayList = await apiCreatePlayList(user, playList, dispatch);
    console.log(newPlayList);
    const newPlayListItem = {
      playlistId: newPlayList.id,
      videoId: video.id,
      channelId: video.snippet.channelId,
      kind: video.kind,
    };
    await apiCreatePlayListItem(user, newPlayListItem, dispatch);
    context.setPlayListVisible(false);
  };

  const handleClose = () => {
    context.setPlayListVisible(false);
  };

  const handleChange = async (e, index) => {
    console.log(e.target.checked, playLists[index]);
    let title = "";
    let array = [...isInPlayList];
    if (e.target.checked) {
      const newPlayListItem = {
        playlistId: playLists[index].id,
        videoId: video.id,
        channelId: video.snippet.channelId,
        kind: video.kind,
      };
      const data = await apiCreatePlayListItem(user, newPlayListItem, dispatch);
      array[index] = data.id;
      title = `Đã thêm vào ${playLists[index].snippet.title}`;
    } else {
      await apiDeletePlayListItem(user, isInPlayList[index], dispatch);
      array[index] = "";
      title = `Đã xoá khỏi vào ${playLists[index].snippet.title}`;
    }
    setIsInPlayList(array);
    dispatch(
      showToast({
        type: "success",
        title: title,
        isVisible: true,
      })
    );
  };

  useEffect(() => {
    const api = async () => {
      if (context.playListVisible) {
        await apiGetAllPlayLists(user, dispatch);
      }
    };
    api();
  }, [context.playListVisible, user, dispatch]);

  // console.log(isInPlayList);
  useEffect(() => {
    const api = async () => {
      let array = [];
      for (let i = 0; i < playLists.length; i++) {
        let data = await apiGetPlayListItemByPlayListId(
          user,
          playLists[i].id,
          dispatch
        );
        console.log(data);
        if (data) {
          let findData = data.find(
            (item) => item.snippet.resourceId.videoId === video.id
          );
          array.push(findData ? findData.id : "");
        } else {
          array.push("");
        }
      }
      setIsInPlayList(array);
    };
    api();
  }, [playLists, user, dispatch, video]);

  // console.log(playLists);
  return (
    <>
      <div className="OverLay"></div>
      <div className="PlayList">
        <div className="PlayListClose" onClick={handleClose}>
          X
        </div>
        <div className="PlayListTitle">Danh sách phát</div>
        <div className="PlayListItems">
          {isInPlayList.length !== 0 &&
            playLists.map((playList, index) => {
              return (
                <label
                  htmlFor={"Playlist" + index}
                  className="PlayListItem"
                  key={index}
                >
                  <input
                    hidden
                    type="checkbox"
                    defaultChecked={
                      isInPlayList.length !== 0 && isInPlayList[index] !== ""
                    }
                    onChange={(e) => handleChange(e, index)}
                    name={"Playlist" + index}
                    id={"Playlist" + index}
                    value={playList.id}
                  />
                  <div className="CustomCheckBox"></div>
                  {playList.snippet.title}
                </label>
              );
            })}
        </div>
        {showForm ? (
          <form className="PlayListForm" onSubmit={handleSubmit}>
            <div className="FormGroup">
              <label htmlFor="playlistTitle">Tên</label>
              <input
                type="text"
                name="playlistTitle"
                id="playlistTitle"
                value={playList.title}
                onChange={(e) =>
                  setPlayList({ ...playList, title: e.target.value })
                }
              />
            </div>
            <div className="FormGroup">
              <label htmlFor="privacyStatus">Quyền</label>
              <select
                name="privacyStatus"
                value={playList.privacyStatus}
                id="privacyStatus"
                onChange={(e) =>
                  setPlayList({ ...playList, privacyStatus: e.target.value })
                }
              >
                <option value="public">Công khai</option>
                <option value="unlisted">Không công khai</option>
                <option value="private">Riêng tư</option>
              </select>
            </div>
            <div className="FormGroup">
              <button type="submit" className="FormBtnSubmit">
                Tạo
              </button>
            </div>
          </form>
        ) : (
          <div
            className="PlayListCreate"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <MdPlaylistAdd />
            Tạo danh sách phát
          </div>
        )}
      </div>
    </>
  );
};

export default PlayList;
