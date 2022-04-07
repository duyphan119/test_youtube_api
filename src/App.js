import React, { useState } from "react";
import Header from "./components/Header";
import PlayList from "./components/PlayList";
import routes from "./routes";
import "./App.css";
import Toast from "./components/Toast";
import Loading from "./components/Loading";

export const AppContext = React.createContext();

function App() {
  const [playListVisible, setPlayListVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        playListVisible: playListVisible,
        setPlayListVisible: setPlayListVisible,
      }}
    >
      <div className="App">
        <Header />
        {routes()}
        {playListVisible && <PlayList />}
      </div>
      <Toast />
      <Loading />
    </AppContext.Provider>
  );
}

export default App;
