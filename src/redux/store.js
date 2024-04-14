// // only using redux toolkit
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userDetail";
// export const store = configureStore({
//   reducer: {
//     userDetail: userReducer,
//   },
// });

// using with redux persist
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userDetail";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persitConfig = {
  key: "storeTookit",
  version: 1,
  storage,
  timeout: 10,
};

const reducer = combineReducers({
  userDetail: userReducer,
});

const persistedReducer = persistReducer(persitConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
