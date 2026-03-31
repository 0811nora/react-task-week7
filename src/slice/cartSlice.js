import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, putCartItem } from "../api/Api";

export const getCartAsync = createAsyncThunk(
  "cart/getAddCartList",
  async () => {
    const res = await getCart();
    return res.data.data.carts;
  },
);

export const addCartAction = createAsyncThunk(
  "cart/addCartAction",
  async ({ id, data }, { dispatch }) => {
    try {
      await putCartItem(id, data);
      dispatch(getCartAsync());
    } catch (err) {
      console.error("修改購物車失敗", err);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
