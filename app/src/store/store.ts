import {
  configureStore,
  combineReducers,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { slices } from "./slices";
import { mainAPISlice } from "./slices/api.slice";

// Add 3rd party reducers into this object
const reducers: ReducersMapObject = {
  [mainAPISlice.reducerPath]: mainAPISlice.reducer,
};

// Our reducers will be appended here
Object.keys(slices).forEach(
  (key) => (reducers[slices[key].name] = slices[key].reducer)
);

const rootReducer = combineReducers(reducers);
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPISlice.middleware),
  devTools: true,
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
