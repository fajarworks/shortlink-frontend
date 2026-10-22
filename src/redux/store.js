import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import linkReducer from './slices/linkSlice'

const storage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key, value) => {
    return Promise.resolve(window.localStorage.setItem(key, value));
  },
  removeItem: (key) => {
    return Promise.resolve(window.localStorage.removeItem(key));
  },
};

const persistUserConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
};

const store = configureStore({
  reducer: { 
    userState: persistReducer(persistUserConfig, authReducer),
    linkState : linkReducer
  },
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    })
});

export const persistor = persistStore(store);

export default store;