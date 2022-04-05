import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toast: {
    type: "success",
    title: "",
    isVisible: false
  }
};
const toastSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});
export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;