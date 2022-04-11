import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import playlistSlice from "./playlistSlice";
import toastSlice from "./toastSlice";
import videoSlice from "./videoSlice";
const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
    video: videoSlice,
    playList: playlistSlice,
    toast: toastSlice,
  },
});

export default store;
