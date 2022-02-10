import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    items: [],
    status: "idle",
    itemStatus: "idle",
    itemError: null,
    error: null,
  },
  reducers: {
    addProducts: (state, action) => {
      state.items = action.payload.items;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.itemStatus = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.itemStatus = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.itemStatus = "failed";
        state.itemError = action.error.message;
      });
  },
});

export const { increment, decrement, addProducts } = counterSlice.actions;

export default counterSlice.reducer;

// THUNK FUNCTION:

// export const getProducts = () => (dispatch, getState) => {
//   fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((result) => {
//       dispatch(addProducts({ items: result }));
//     });
// };

// CREATE ASYNC THUNK:

export const fetchPosts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    return result;
  }
);

export const addNewPost = createAsyncThunk(
  "products/addNewPost",
  async (post) => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post), // body data type must match "Content-Type" header
    });
    const result = response.json(); // parses JSON response into native JavaScript objects
    return result;
  }
);
