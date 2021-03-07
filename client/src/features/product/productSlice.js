import { createSlice } from "@reduxjs/toolkit";
import store from "../../store.json";

export const productSlice = createSlice({
  name: "user",
  initialState: {
    // all categories are active by default
    categories: [
      ...store.categories.map((category) => ({ ...category, active: true })),
    ],
    cart: [],
  },
  reducers: {
    // disable<->enable category
    toggleCategory(state, action) {
      const { id, disable } = action.payload;
      for (let category of state.categories) {
        if (category.id === id) {
          category.active = disable ? false : true;
        }
      }
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeProductFromCart(state, action) {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },
    updateCart(state) {
      const disabledCategoriesId = state.categories.reduce((ids, cat) => {
        if (cat.active === false) {
          ids.push(cat.id);
        }
        return ids;
      }, []);
      for (let i = 0; i < state.cart.length; i++) {
        const product = state.cart[i];
        // check if product category is disabled
        if (disabledCategoriesId.includes(product.categoryId)) {
          // remove product
          state.cart.splice(i, 1);
        }
      }
    },
  },
});

export const {
  toggleCategory,
  addToCart,
  removeProductFromCart,
  updateCart,
} = productSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default productSlice.reducer;
