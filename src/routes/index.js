import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const OAuthPage = lazy(() => import("../pages/OAuthPage"));
const PlayListPage = lazy(() => import("../pages/PlayListPage"));
const SearchResultPage = lazy(() => import("../pages/SearchResultPage"));
const WatchPage = lazy(() => import("../pages/WatchPage"));

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path="/oauth/success" element={<OAuthPage />} />
      <Route path="/watch" element={<WatchPage />} />
      <Route path="/playlist" element={<PlayListPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default routes;
