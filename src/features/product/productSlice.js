import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Base URL from Platzi API
const BASE_URL = "https://api.escuelajs.co/api/v1";

// Initial state
export const initialState = {
  products: [],
  status: "idle",
  selectedProduct: null,
  error: null
};

// ✅ Fetch all products
export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json(); // returns an array of products
});

// ✅ Fetch single product by ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json(); // returns a single product object
  }
);

// ✅ Create product (optional, for admin use)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Required if authentication is enabled
        Authorization: "Bearer YOUR_ACCESS_TOKEN"
      },
      body: JSON.stringify(productData)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create product");
    }

    return await res.json();
  }
);

// ✅ Slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

    
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  }
});

export default productSlice.reducer; 