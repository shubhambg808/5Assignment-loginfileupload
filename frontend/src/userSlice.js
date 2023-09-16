import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
  userData: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialvalue,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload[0];
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
