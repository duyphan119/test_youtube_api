import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
  page: {
    next: "",
    prev: ""
  },
  currentVideo: null
};
const videoSlice = createSlice({
  name: "video",
  initialState: initialState,
  reducers: {
    getAllVideos: (state, action) => {
      state.page.prev = action.payload.prevPageToken;
      state.page.next = action.payload.nextPageToken;
      state.list = action.payload.data;
    },
    getCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    }
  },
});
export const { getAllVideos, getCurrentVideo } = videoSlice.actions;
export default videoSlice.reducer;