import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    token: null,
    user: null,
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("[Login]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Sign In");
    }
  },
);
export const registerUser = createAsyncThunk(
  "register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("[Register]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create account.");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    (builder.addAsyncThunk(registerUser, {
      pending: (state) => {
        state.isPending = true;
        state.isRejected = false;
        state.isFulfilled = false;
      },
      fulfilled: (state) => {
        state.isFulfilled = true;
        state.isRejected = false;
        state.isPending = false;
      },
      rejected: (state, { payload }) => {
        state.isFulfilled = false;
        state.isRejected = true;
        state.isPending = false;
        state.error = payload;
      },
    }),
      builder.addAsyncThunk(loginUser, {
        pending: (state) => {
          state.isFulfilled = false;
          state.isPending = true;
          state.isRejected = false;
        },
        fulfilled: (state, { payload }) => {
          state.isFulfilled = true;
          state.isPending = false;
          state.isRejected = false;
          state.auth = {
            token: payload.result.token,
            user: payload.result.user,
          };
        },
        rejected: (state, { payload }) => {
          state.isFulfilled = false;
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      }));
  },
});

export default authSlice.reducer;
