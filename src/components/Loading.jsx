import React from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Loading.css";

const Loading = () => {
  const loading = useSelector((state) => state.loading.loading);

  const dispatch = useDispatch();

  if (!loading.isVisible) return "";

  return (
    <>
      <div className="OverLay"></div>
      <div
        className="Loading"
        style={{
          zIndex: 12,
        }}
      >
        <ReactLoading type={loading.type} color={loading.color} />
      </div>
    </>
  );
};

export default Loading;
