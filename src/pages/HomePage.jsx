import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllPlayLists } from "../api/apiPlaylist";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const playLists = useSelector((state) => state.playList.list);

  const dispatch = useDispatch();

  useEffect(() => {
    apiGetAllPlayLists(user, dispatch);
  }, [user, dispatch]);

  console.log(playLists);

  return (
    <div className="Page HomePage">
      <h1
        style={{
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        Danh sách phát của tôi
      </h1>
      <div
        style={{
          display: "flex",
        }}
      >
        {playLists.map((playList) => {
          return (
            <Link
              to={`/playlist?list=${playList.id}`}
              key={playList.id}
              style={{
                width: "calc(25% - 20px)",
                margin: "10px",
                cursor: "pointer",
                display: "block",
                position: "relative",
              }}
            >
              <img
                src={playList.snippet.thumbnails.medium.url}
                style={{
                  width: "100%",
                }}
                alt=""
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
