import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { apiSearch } from '../api/apiSearch';
import Video from '../components/Video';

const SearchResultPage = () => {
  const dispatch = useDispatch();

  const videos = useSelector(state => state.video.list);

  const [queryParams] = useSearchParams();
  const q = queryParams.get("q")

  useEffect(() => {
    apiSearch(dispatch, q);
  }, [q, dispatch])
  console.log(videos);
  return (
    <div className='SearchResultPage Page'>
      <div className='SearchResults'>
        {videos.map(video => {
          return <Video key={video.etag} video={video} direction={"row"} />
        })}
      </div>
    </div>
  )
}

export default SearchResultPage