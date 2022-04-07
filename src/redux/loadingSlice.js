import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: {
    type: "spin",
    isVisible: false,
    color: "#1a3fc1",
  },
};
const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    showLoading: (state) => {
      if (state.loading.isVisible === false) {
        state.loading.isVisible = true;
      }
    },
    hideLoading: (state) => {
      if (state.loading.isVisible === true) {
        state.loading.isVisible = false;
      }
    },
  },
});
export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
