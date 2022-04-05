import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { getVideoById } from '../api/apiVideo';
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { AppContext } from '../App';
import { getCurrentVideo } from '../redux/videoSlice';
import "./styles/WatchPage.css";

const WatchPage = () => {

   const context = useContext(AppContext);

   const dispatch = useDispatch();

   const video = useSelector(state => state.video.currentVideo);

   const [queryParams] = useSearchParams();
   const videoId = queryParams.get("v");

   console.log(video);

   const handleClickPlayList = () => {
      context.setPlayListVisible(true);
   }

   useEffect(() => {
      getVideoById(videoId, dispatch).then(res => {
         dispatch(getCurrentVideo(res));
      }).catch(err => console.log(err));
   }, [videoId, dispatch])

   if (!video) return ""

   return (
      <div className='WatchPage Page'>
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
                  <div className="WatchPageVideoViewCount">{video.statistics.viewCount} lượt xem</div>
                  <div className="WatchPageVideoLikeAndDislikeCount">
                     <div className="WatchPageVideoLikeCount">
                        <AiFillLike />
                        {video.statistics.likeCount}
                     </div>
                     <div className="WatchPageVideoDislikeCount">
                        <AiFillDislike />
                        Không thích
                     </div>
                  </div>
                  <div className="WatchPageVideoPlayList" onClick={handleClickPlayList}>
                     <MdPlaylistAdd />
                     Lưu
                  </div>
               </div>
            </div>
         </div>
         <div className="WatchPageRelateVideo">
            
         </div>
      </div>
   )
}

export default WatchPage