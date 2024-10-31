import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isVerified: false,
  Loading: true,
  role: null,
};

// Register User
export const registerUser = createAsyncThunk("/user/register", async (data) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/register",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// Login User
export const loginUser = createAsyncThunk("/user/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/login",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// Logout User
export const logoutUser = createAsyncThunk("/user/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// Google User Login
// export const googleUser = createAsyncThunk(
//   "/user/googleLogin",
//   async (googleData) => {
//     const response = await axios.post(
//       "http://localhost:5000/api/user/google",
//       googleData,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );

export const googleUser = createAsyncThunk(
  "user/googleLogin",
  async (userCredential) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/google",
      userCredential,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Firebase Anonymous Login
export const anonymousUser = createAsyncThunk(
  "/user/anonymousLogin",
  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/user/anonymous",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Firebase Facebook Login
export const facebookUser = createAsyncThunk(
  "/user/facebookLogin",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/user/facebookUser",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Check User
export const checkUser = createAsyncThunk("/user/check-user", async () => {
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
});

const userAuth = createSlice({
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
      .addCase(googleUser.pending, (state) => {
        state.Loading = true;
      })
      .addCase(googleUser.fulfilled, (state, action) => {
        state.Loading = false;
        state.role = action.payload.success ? action.payload.role : null;
        state.isVerified = action.payload.success;
      })
      .addCase(googleUser.rejected, (state, action) => {
        state.Loading = false;
        state.role = null;
        state.isVerified = false;
      })
      .addCase(anonymousUser.pending, (state) => {
        state.Loading = true;
      })
      .addCase(anonymousUser.fulfilled, (state, action) => {
        state.Loading = false;
        state.role = action.payload.success ? action.payload.role : null;
        state.isVerified = action.payload.success;
      })
      .addCase(anonymousUser.rejected, (state, action) => {
        state.Loading = false;
        state.role = null;
        state.isVerified = false;
      })
      .addCase(facebookUser.pending, (state) => {
        state.Loading = true;
      })
      .addCase(facebookUser.fulfilled, (state, action) => {
        state.Loading = false;
        state.role = action.payload.success ? action.payload.role : null;
        state.isVerified = action.payload.success;
      })
      .addCase(facebookUser.rejected, (state, action) => {
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

export const { setUser } = userAuth.actions;
export default userAuth.reducer;
