import React, { lazy, Suspense, useState } from "react";
import Loading from "./components/Loading";
import routes from "./routes";
import "./App.css";
const PlayList = lazy(() => import("./components/PlayList"));
const Toast = lazy(() => import("./components/Toast"));
const Header = lazy(() => import("./components/Header"));

export const AppContext = React.createContext();

function App() {
  const [playListVisible, setPlayListVisible] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
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
      </AppContext.Provider>
    </Suspense>
  );
}

export default App;
