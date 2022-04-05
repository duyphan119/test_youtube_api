import React, { useContext, useEffect, useState } from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { apiCreatePlayList, apiGetAllPlayLists } from '../api/apiPlaylist'
import { apiCreatePlayListItem } from '../api/apiPlayListItem'
import { AppContext } from '../App'
import "./styles/PlayList.css"

const PlayList = () => {

   const context = useContext(AppContext);

   const user = useSelector(state => state.auth.currentUser);
   const playLists = useSelector(state => state.playList.list);
   const video = useSelector(state => state.video.currentVideo);

   const dispatch = useDispatch();

   const [showForm, setShowForm] = useState(false);
   const [playList, setPlayList] = useState({
      title: "",
      privacyStatus: "public"
   })
   console.log(video);
   const handleSubmit = async (e) => {
      e.preventDefault();
      const newPlayList = await apiCreatePlayList(user, playList);
      console.log(newPlayList);
      const newPlayListItem = {
         playlistId: newPlayList.id,
         videoId: video.id,
         channelId: video.snippet.channelId,
         kind: video.kind
      }
      await apiCreatePlayListItem(user, newPlayListItem)
      context.setPlayListVisible(false);
   }

   const handleClose = () => {
      context.setPlayListVisible(false);
   }

   useEffect(() => {
      if (context.playListVisible) {
         apiGetAllPlayLists(user, dispatch);
      }
   }, [context.playListVisible, user, dispatch])

   console.log(playLists);

   return (
      <>
         <div className="OverLay"></div>
         <div className='PlayList'>
            <div className="PlayListClose" onClick={handleClose}>
               X
            </div>
            <div className="PlayListTitle">
               Danh sách phát
            </div>
            <div className="PlayListItems">
               {playLists.map((playList, index) => {
                  return <label htmlFor={"Playlist" + index} className="PlayListItem" key={index}>
                     <input hidden type="checkbox" name={"Playlist" + index} id={"Playlist" + index} value={playList.snippet.id} />
                     <div className='CustomCheckBox'></div>
                     {playList.snippet.title}
                  </label>
               })}
            </div>
            {showForm ? <form className="PlayListForm" onSubmit={handleSubmit}>
               <div className="FormGroup">
                  <label htmlFor="playlistTitle">Tên</label>
                  <input type="text" name="playlistTitle" id="playlistTitle" value={playList.title} onChange={(e) => setPlayList({ ...playList, title: e.target.value })} />
               </div>
               <div className="FormGroup">
                  <label htmlFor="privacyStatus">Quyền</label>
                  <select name="privacyStatus" value={playList.privacyStatus} id="privacyStatus" onChange={(e) => setPlayList({ ...playList, privacyStatus: e.target.value })}>
                     <option value="public">Công khai</option>
                     <option value="unlisted">Không công khai</option>
                     <option value="private">Riêng tư</option>
                  </select>
               </div>
               <div className="FormGroup">
                  <button type="submit">Tạo</button>
               </div>
            </form> : <div className="PlayListCreate" onClick={() => {
               setShowForm(true);
            }}>
               <MdPlaylistAdd />
               Tạo danh sách phát
            </div>}
         </div>
      </>
   )
}

export default PlayList