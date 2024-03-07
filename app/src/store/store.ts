import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import { Context, createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export const store = (ctx: Context) =>
  configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: ctx,
        },
      }).concat(api.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store);
