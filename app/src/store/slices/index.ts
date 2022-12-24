import { Slice } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";

type SlicesDictionary = {
  [sliceName: string]: Slice;
};

export const slices: SlicesDictionary = {
  authSlice,
};
