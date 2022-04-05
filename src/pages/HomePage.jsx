import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Video from "../components/Video";
import { getAllCategories } from "../redux/categorySlice";

const HomePage = () => {
   const categories = useSelector(state => state.category.list);
   const dispatch = useDispatch()

   useEffect(() => {
      const api = async () => {
         const res = await axios.get('http://localhost:5000/v1/api/video-category');
         dispatch(getAllCategories(res.data))
      }
      api();
   }, [dispatch])


   console.log(categories);
   return (
      <>
         {categories.map(category => {
            return <Fragment key={category.id}>
               {category.snippet.title}
               <div style={{
                  display: "flex"
               }}>
                  {category.snippet.videos.map(video => {
                     return <Video key={video.etag} video={video} direction={"column"} />
                  })}
               </div>
            </Fragment>
         })}
      </>
   )
}

export default HomePage
