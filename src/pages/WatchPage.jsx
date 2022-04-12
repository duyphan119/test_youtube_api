import { useContext, useEffect } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { apiGetPlayListById } from "../api/apiPlaylist";
import { apiGetPlayListItemByPlayListId } from "../api/apiPlayListItem";
import { getVideoById } from "../api/apiVideo";
import { AppContext } from "../App";
import PlayListItem from "../components/PlayListItem";
import { getCurrentPlayList } from "../redux/playlistSlice";
import { getCurrentVideo } from "../redux/videoSlice";
import "./styles/WatchPage.css";

const WatchPage = () => {
  const context = useContext(AppContext);

  const dispatch = useDispatch();

  const video = useSelector((state) => state.video.currentVideo);
  const user = useSelector((state) => state.auth.currentUser);
  const playList = useSelector((state) => state.playList.currentPlaylist);

  const [queryParams] = useSearchParams();
  const videoId = queryParams.get("v");
  // const list = queryParams.get("list");
  const list = queryParams.get("list");
  const index = queryParams.get("index");

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

  const handleClickPlayList = () => {
    context.setPlayListVisible(true);
  };

  useEffect(() => {
    getVideoById(videoId, dispatch)
      .then((res) => {
        dispatch(getCurrentVideo(res));
      })
      .catch((err) => console.log(err));
  }, [videoId, dispatch, user]);

  if (!video) return "";

  return (
    <div
      className="WatchPage Page"
      style={{
        display: "flex",
      }}
    >
      <div className="WatchPageVideo">
        <iframe
          width="800"
          height="480"
          title={videoId}
          frameBorder="0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        ></iframe>
        <div className="WatchPageVideoInfo">
          <div className="WatchPageVideoTitle">{video.snippet.title}</div>
          <div className="WatchPageVideoBottom">
            <div className="WatchPageVideoViewCount">
              {video.statistics.viewCount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              lượt xem &nbsp;•&nbsp;
              {new Date(video.snippet.publishedAt)
                .toLocaleDateString("vi-VN")
                .replaceAll("/", "-")}
            </div>
            <div className="WatchPageVideoLikeAndDislikeCount">
              <div className="WatchPageVideoLikeCount">
                <AiOutlineLike />
                {video.statistics.likeCount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="WatchPageVideoDislikeCount">
                <AiOutlineDislike />
                Không thích
              </div>
            </div>
            <div
              className="WatchPageVideoPlayList"
              onClick={handleClickPlayList}
            >
              <MdPlaylistAdd />
              Lưu
            </div>
          </div>
        </div>
      </div>
      <div
        className="WatchPageRight"
        style={{
          marginLeft: "20px",
        }}
      >
        {list && (
          <div
            className="PlayListPageItemsContainer"
            style={{
              padding: "10px",
              height: "530px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 4px 0 lightgray",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "25px",
                padding: "0 10px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {playList?.snippet.title}
            </div>
            <div
              style={{
                height: "25px",
                padding: "0 10px",
                fontSize: "14px",
              }}
            >
              {index ? index : 1}/{playList?.items.length}
            </div>
            <div
              className="CustomScrollbar"
              style={{
                height: "480px",
                overflowY: "scroll",
              }}
            >
              {playList?.items.map((item, i) => {
                return (
                  <PlayListItem
                    isActive={i === index - 1}
                    classNameImg="WatchPagePlayListItem"
                    item={item}
                    key={i}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        )}
        {/* <div className="WatchPageRelateVideo"></div> */}
      </div>
    </div>
  );
};

export default WatchPage;
