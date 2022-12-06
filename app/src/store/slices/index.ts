import { Slice } from "@reduxjs/toolkit";
import { default as studentsSlice } from "./students.slice";

type SlicesDictionary = {
  [sliceName: string]: Slice;
};

export const slices: SlicesDictionary = {
  studentsSlice,
};
