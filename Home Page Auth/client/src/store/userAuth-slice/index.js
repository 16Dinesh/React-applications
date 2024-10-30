import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isVerified: false,
  Loading: true,
  role: null,
};

export const registerUser = createAsyncThunk(
  "/user/register",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/user/login",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/user/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

//check this
export const googleUser = createAsyncThunk(
  "/user/googleLogin",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/user/googleUser",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data
  }
)

export const checkUser = createAsyncThunk(
  "/user/check-user",

  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/user/check-user",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.Loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.Loading = false;
        state.role = null;
        state.isVerified = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.Loading = false;
        state.role = null;
        state.isVerified = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.Loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(`This is the LoginUser State ${action}`)
        console.log(action);

        state.Loading = false;
        state.role = action.payload.success ? action.payload.user : null;
        state.isVerified = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.Loading = false;
        state.role = null;
        state.isVerified = false;
      })
      .addCase(checkUser.pending, (state) => {
        state.Loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.Loading = false;
        state.role = action.payload.success ? action.payload.role : null;
        state.isVerified = action.payload.success;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.Loading = false;
        state.role = null;
        state.isVerified = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.Loading = false;
        state.role = null;
        state.isVerified = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
