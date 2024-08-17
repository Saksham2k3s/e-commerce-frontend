import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "productSlice/fetchProducts",
  async ({page = 1, query = ''}, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://localhost:3001/api/v1/product/all?page=${page}&keyword=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);



const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    isLoading: false,
    isError: false,
    products: [],
    errorMessage: '',
    totalProducts : 0,
    resultPerPage : 0,
    page : 1
  },
  reducers: {
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    decrementPage: (state) => {
      if (state.page > 1) state.page = state.page - 1; // Ensure page doesn't go below 1
    },
    setPage : (state,action) => {
      state.page = action.payload
    },
    removeProduct : (state, action) => {
      const productId = action.payload;
      const filterProducts = state.products.filter((item) => item._id !== productId);
      state.products = filterProducts;
  }
   },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalProducts = action.payload.totalProducts;
      state.resultPerPage = action.payload.resultPerPage;
      state.products = action.payload.products || [];
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
  }
});

export const { incrementPage, decrementPage, setPage, removeProduct } = productSlice.actions;

export default productSlice.reducer;
