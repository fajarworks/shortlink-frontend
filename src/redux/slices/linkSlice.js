import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  links: [],
  shortenLink: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getMyLinks = createAsyncThunk(
  "links/getLinks",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().userState.auth.token;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/links`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteMyLinks = createAsyncThunk(
  "links/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().userState.auth.token;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/links/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to delete link. Status: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const createLinks = createAsyncThunk(
  "links/create",
  async ({ destination_url, slug }, { rejectWithValue, getState }) => {
    try {
      const token = getState().userState.auth.token;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination_url: destination_url,
          slug: slug,
        }),
      });
      if (!res.ok) {
        throw new Error("failed to create link");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(getMyLinks, {
      pending: (state) => {
        state.isPending = true;
        state.isRejected = false;
        state.isFulfilled = false;
      },
      fulfilled: (state, { payload }) => {
        state.isFulfilled = true;
        state.isRejected = false;
        state.isPending = false;
        state.links = payload.result;
      },
      rejected: (state, { payload }) => {
        state.isFulfilled = false;
        state.isRejected = true;
        state.isPending = false;
        state.error = payload;
      },
    });
    builder.addAsyncThunk(deleteMyLinks, {
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
    });
    builder.addAsyncThunk(createLinks, {
      pending: (state) => {
        state.isPending = true;
        state.isRejected = false;
        state.isFulfilled = false;
      },
      fulfilled: (state, payload) => {
        state.isFulfilled = true;
        state.isRejected = false;
        state.isPending = false;
        state.shortenLink = payload.result;
      },
      rejected: (state)=> {
        state.isFulfilled = false
        state.isRejected = true
        state.isPending = false
        state.error = null
      }
    });

  },
});
export default linkSlice.reducer;
