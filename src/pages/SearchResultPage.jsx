import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { apiSearch, apiSearchNext } from "../api/apiSearch";
import Video from "../components/Video";

const SearchResultPage = () => {
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.video.list);
  const pageToken = useSelector((state) => state.video.pageToken);

  const [queryParams] = useSearchParams();
  const q = queryParams.get("q");

  useEffect(() => {
    apiSearch(dispatch, q);
  }, [q, dispatch]);

  const handleSearchVideo = () => {
    apiSearchNext(dispatch, q, pageToken);
  };
  console.log(videos);
  return (
    <div className="SearchResultPage Page">
      <div className="SearchResults">
        {videos.map((video) => {
          return <Video key={video.etag} video={video} direction={"row"} />;
        })}
        {pageToken && (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#4ab4ad",
                borderRadius: "5px",
                padding: "6px 18px",
                cursor: "pointer",
                border: "none",
              }}
              onClick={handleSearchVideo}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
