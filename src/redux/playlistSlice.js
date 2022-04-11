import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
  currentPlaylist: null,
  page: {
    prev: "",
    next: "",
  },
};
const playListSlice = createSlice({
  name: "playList",
  initialState: initialState,
  reducers: {
    getAllPlayLists: (state, action) => {
      state.list = action.payload.items;
      state.page.next = action.payload.nextPageToken;
      state.page.prev = action.payload.prevPageToken;
    },
    getCurrentPlayList: (state, action) => {
      state.currentPlaylist = action.payload;
    },
  },
});
export const { getAllPlayLists, getCurrentPlayList } = playListSlice.actions;
export default playListSlice.reducer;
