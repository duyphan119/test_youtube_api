import { useEffect, useState } from "react";
import { BsPencil, BsChevronDown } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiUpdatePlayList } from "../api/apiPlaylist";
import "./styles/PlayListInfo.css";

const maxLengthTitle = 150;

const PlayListInfo = ({ playList }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  console.log(playList);

  const [indexRandom, setIndexRadom] = useState(-1);
  const [showFormUpdateTitle, setShowFormUpdateTitle] = useState(false);
  const [showFormUpdateDescription, setShowFormUpdateDescription] =
    useState(false);
  const [newPlayList, setNewPlayList] = useState({
    title: "",
    description: "",
  });

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    const reqApi = {
      id: playList.id,
      snippet: {
        title: newPlayList.title,
      },
    };
    const data = await apiUpdatePlayList(user, reqApi, dispatch);
    console.log(data);
    setShowFormUpdateTitle(!showFormUpdateTitle);
  };

  console.log(newPlayList.title);

  useEffect(() => {
    let random = Math.floor(Math.random() * playList.items.length);
    setIndexRadom(random);
  }, [playList.items]);

  useEffect(() => {
    setNewPlayList((prev) => {
      return {
        ...prev,
        title: playList.snippet.title,
        description: playList.snippet.description,
      };
    });
  }, [playList]);

  return (
    <div className="PlayListInfo CustomScrollbar">
      <div className="PlayListInfoThumbnail">
        <img
          src={
            playList.items.length !== 0
              ? playList.items[0].snippet.thumbnails.medium.url
              : ""
          }
          width={playList.snippet.thumbnails.medium.width}
          height={playList.snippet.thumbnails.medium.height}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            width: "100%",
            left: 0,
            backgroundColor: "rgb(0,0,0,0.8)",
            textAlign: "center",
            paddingBlock: "10px",
            textTransform: "uppercase",
            color: "white",
          }}
        >
          Phát tất cả
        </div>
      </div>
      {showFormUpdateTitle ? (
        <form
          className="PlayListInfoTitleFormUpdate"
          onSubmit={handleUpdateTitle}
        >
          <input
            type="text"
            value={newPlayList.title}
            onChange={(e) =>
              setNewPlayList((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
          <div
            style={{
              width: "100%",
              textAlign: "right",
            }}
          >
            {newPlayList.title.length}/{maxLengthTitle}
          </div>
          <div className="PlayListInfoTitleFormUpdateActions">
            <button
              type="button"
              className="PlayListInfoTitleFormUpdateAction PlayListInfoTitleFormUpdateActionCancel"
              onClick={() => {
                setShowFormUpdateTitle(!showFormUpdateTitle);
                setNewPlayList((prev) => {
                  return { ...prev, title: playList.snippet.title };
                });
              }}
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="PlayListInfoTitleFormUpdateAction PlayListInfoTitleFormUpdateActionSave"
            >
              Lưu
            </button>
          </div>
        </form>
      ) : (
        <div className="PlayListInfoTitle">
          <span>{playList.snippet.title}</span>
          <BsPencil
            onClick={() => setShowFormUpdateTitle(!showFormUpdateTitle)}
          />
        </div>
      )}
      <div className="PlayListInfoStatistics">
        <div className="PlayListInfoTotalVideo">
          {playList.items.length} video
        </div>
        &nbsp;•&nbsp;
        <div className="PlayListInfoTotalView">6 lượt xem</div>
        &nbsp;•&nbsp;
        <div className="PlayListInfoLastUpdate">Cập nhật hôm nay</div>
      </div>
      <div className="PlayListInfoPrivacyStatus">
        <span>Riêng tư</span>
        <BsChevronDown />
      </div>
      <div className="PlayListInfoActions">
        {indexRandom !== -1 ? (
          <Link
            to={`/watch?v=${playList.items[indexRandom].snippet.resourceId.videoId}&list=${playList.items[indexRandom].snippet.playlistId}`}
            className="PlayListInfoAction"
          >
            <FaRandom />
          </Link>
        ) : (
          <div className="PlayListInfoAction">
            <FaRandom />
          </div>
        )}
        <div className="PlayListInfoAction">
          <FiMoreHorizontal />
        </div>
      </div>
      {showFormUpdateDescription ? (
        <form className="PlayListInfoFormUpdateDescription">
          <input
            type="text"
            value={newPlayList.description}
            onChange={(e) =>
              setNewPlayList((prev) => {
                return { ...prev, description: e.target.value };
              })
            }
          />
          <div
            style={{
              width: "100%",
              textAlign: "right",
            }}
          >
            {newPlayList.description.length}/{maxLengthTitle}
          </div>
          <div className="PlayListInfoTitleFormUpdateActions">
            <button
              type="button"
              className="PlayListInfoTitleFormUpdateAction PlayListInfoTitleFormUpdateActionCancel"
              onClick={() => {
                setShowFormUpdateDescription(!showFormUpdateDescription);
                setNewPlayList((prev) => {
                  return { ...prev, description: playList.snippet.description };
                });
              }}
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="PlayListInfoTitleFormUpdateAction PlayListInfoTitleFormUpdateActionSave"
            >
              Lưu
            </button>
          </div>
        </form>
      ) : (
        <div className="PlayListInfoDescription">
          <span>
            {playList.snippet.description === ""
              ? "Không có mô tả nào"
              : playList.snippet.description}
          </span>
          <BsPencil
            onClick={() => {
              setShowFormUpdateDescription(!showFormUpdateDescription);
            }}
          />
        </div>
      )}
      <div className="Separate"></div>
      <Link to="/" className="PlayListInfoAuthor">
        <img src={user.picture} alt="" />
        <span>{user.name}</span>
      </Link>
    </div>
  );
};

export default PlayListInfo;