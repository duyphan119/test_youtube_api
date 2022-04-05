import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
  page: {
    prev: "",
    next: ""
  }
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
  },
});
export const { getAllPlayLists } = playListSlice.actions;
export default playListSlice.reducer;