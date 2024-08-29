import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartUpdated: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state) => {
      state.cartUpdated = true;
    },
    resetCartUpdated: (state) => {
      state.cartUpdated = false;
    },
  },
});

export const { setCartCount, resetCartUpdated } = cartSlice.actions;

export default cartSlice.reducer;
