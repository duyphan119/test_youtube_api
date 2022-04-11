import React from "react";
import ReactLoading from "react-loading";
import "./styles/Loading.css";

const Loading = () => {
  return (
    <div className="Loading">
      <ReactLoading type="spin" color="#4faac4" />
    </div>
  );
};

export default Loading;
