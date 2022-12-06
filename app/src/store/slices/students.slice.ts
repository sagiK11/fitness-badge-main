import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Student } from "@models";

const sliceName = "students";

const studentsAdapter = createEntityAdapter<Student>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (student) => student.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});
export const studentsSlice = createSlice({
  name: sliceName,
  initialState: studentsAdapter.getInitialState(),
  reducers: {
    someAction: (state, action: PayloadAction<number>) => {},
  },
});

// Action creators are generated for each case reducer function
export const { someAction } = studentsSlice.actions;

export default studentsSlice;
