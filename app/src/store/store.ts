import {
  configureStore,
  combineReducers,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { slices } from "./slices";
import { mainAPI } from "./slices/api.slice";

// Add 3rd party reducers into this object
const reducers: ReducersMapObject = {
  [mainAPI.reducerPath]: mainAPI.reducer,
};

// Our reducers will be appended here
Object.keys(slices).forEach(
  (key) => (reducers[slices[key].name] = slices[key].reducer)
);

const rootReducer = combineReducers(reducers);
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware),
  devTools: true,
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
