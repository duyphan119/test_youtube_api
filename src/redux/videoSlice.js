import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
  pageToken: null,
  currentVideo: null,
};
const videoSlice = createSlice({
  name: "video",
  initialState: initialState,
  reducers: {
    getAllVideos: (state, action) => {
      state.list = action.payload.data;
    },
    getCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
    getAllSearchVideos: (state, action) => {
      if (action.payload.next) {
        state.list = [...state.list, ...action.payload.items];
      } else {
        state.list = action.payload.items;
      }
      state.pageToken = action.payload.nextPageToken;
    },
  },
});
export const { getAllVideos, getCurrentVideo, getAllSearchVideos } =
  videoSlice.actions;
export default videoSlice.reducer;
