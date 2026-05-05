import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  approvalStatus: "",
};

export const userSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      (state.user = null), localStorage.removeItem("user");
    },
  },
});
export const { logout } = userSlice.actions;

export const { setUserDetail } = userSlice.actions;

export const { approvalStatus } = userSlice.actions;

export default userSlice.reducer;
