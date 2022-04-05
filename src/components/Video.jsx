import moment from 'moment';
import 'moment/locale/vi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatShortNumber } from '../utils';
import "./styles/Video.css";
moment.locale("vi");
const Video = (props) => {
   const { video, direction } = props;

   const [isPlaying, setIsPlaying] = useState(false);

   const handleMouseEnter = () => {
      setIsPlaying(true);
   }

   const handleMouseLeave = () => {
      setIsPlaying(false);
   }

   const renderThumbnail = () => {
      if (isPlaying) {
         return <iframe width={video.snippet.thumbnails.medium.width} height={video.snippet.thumbnails.medium.height}
            title={video.snippet.title}
            frameBorder="0"
            src={`https://www.youtube.com/embed/${video.id.videoId ? video.id.videoId : video.id}?autoplay=1&mute=1&showinfo=0&controls=0&autohide=0&modestbranding=0&rel=0`}
         ></iframe>
      } else {
         return <img src={video.snippet.thumbnails.medium.url} width={video.snippet.thumbnails.medium.width} height={video.snippet.thumbnails.medium.height} alt={video.snippet.title} />
      }
   }

   return (
      <div
         className={`Video ${direction}`}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <div className="VideoThumbnail">
            <Link to={`/watch?v=${video.id.videoId ? video.id.videoId : video.id}`}> </Link>
            {renderThumbnail()}
         </div>
         {
            direction === "row" ? <div className='VideoInfos'>
               <div className='VideoTitle'>{video.snippet.title}</div>
               <div className='VideoPublishedAtFromNow'>
                  {formatShortNumber(parseInt(video.statistics.viewCount))} Lượt Xem&nbsp;•&nbsp;
                  {moment(video.snippet.publishedAt).fromNow()}
               </div>
               <div className="VideoChannel">
                  <Link to={`/watch?v=${video.id.videoId ? video.id.videoId : video.id.videoId}`} className="VideoChannelThumbnail">
                     <img src={video.snippet.channel.snippet.thumbnails.default.url} alt={video.snippet.channel.snippet.title} />
                  </Link>
                  <Link to={`/watch?v=${video.id.videoId ? video.id.videoId : video.id.videoId}`} className='VideoChannelTitle'>{video.snippet.channelTitle}</Link>
               </div>
               <div className='VideoDescription'>{video.snippet.description}</div>
            </div> : <div className='VideoInfos column'>
               <div className="VideoInfosLeft">
                  <Link to={`/watch?v=${video.id.videoId ? video.id.videoId : video.id.videoId}`} className="VideoChannelThumbnail">
                     <img src={video.snippet.channel.snippet.thumbnails.default.url} alt={video.snippet.channel.snippet.title} />
                  </Link>
               </div>
               <div className="VideoInfosRight">
                  <div className='VideoTitle'>{video.snippet.title}</div>
                  <Link to={`/watch?v=${video.id.videoId ? video.id.videoId : video.id.videoId}`} className='VideoChannelTitle'>{video.snippet.channelTitle}</Link>
                  <div className='VideoPublishedAtFromNow'>
                     {formatShortNumber(parseInt(video.statistics.viewCount))} Lượt Xem&nbsp;•&nbsp;
                     {moment(video.snippet.publishedAt).fromNow()}
                  </div>
               </div>
            </div>
         }
      </div>
   )
}

export default Video