import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartLength: JSON.parse(localStorage.getItem("cartLength")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLength: (state, action) => {
      state.cartLength = action.payload;
      localStorage.setItem("cartLength", JSON.stringify(state.cartLength));
    },
  },
});

export const { setCartLength } = cartSlice.actions;

export default cartSlice.reducer;
