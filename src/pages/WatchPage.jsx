import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getVideoById } from "../api/apiVideo";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { AppContext } from "../App";
import { getCurrentVideo } from "../redux/videoSlice";
import "./styles/WatchPage.css";
import { hideLoading, showLoading } from "../redux/loadingSlice";

const WatchPage = () => {
  const context = useContext(AppContext);

  const dispatch = useDispatch();

  const video = useSelector((state) => state.video.currentVideo);
  const user = useSelector((state) => state.auth.currentUser);

  const [queryParams] = useSearchParams();
  const videoId = queryParams.get("v");
  const list = queryParams.get("list");

  console.log(video);

  const handleClickPlayList = () => {
    context.setPlayListVisible(true);
  };

  useEffect(() => {
    dispatch(showLoading());
  }, [dispatch]);

  useEffect(() => {
    getVideoById(videoId, dispatch)
      .then((res) => {
        dispatch(getCurrentVideo(res));
        dispatch(hideLoading());
      })
      .catch((err) => console.log(err));
  }, [videoId, dispatch, user]);

  if (!video) return "";

  return (
    <div className="WatchPage Page">
      <div className="WatchPageVideo">
        <iframe
          width="720"
          height="480"
          title={videoId}
          frameBorder="0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
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
      <div className="WatchPageRelateVideo"></div>
    </div>
  );
};

export default WatchPage;
