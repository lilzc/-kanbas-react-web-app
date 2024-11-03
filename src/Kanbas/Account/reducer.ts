// Account/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  user: string;
  course: string;
}

interface AccountState {
  currentUser: any;
  enrollments: Enrollment[];
  unenrolledDbCourses: string[];
}

const initialState: AccountState = {
  currentUser: null,
  enrollments: [],
  unenrolledDbCourses: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    enrollInCourse: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
      state.unenrolledDbCourses = state.unenrolledDbCourses.filter(
        courseId => courseId !== action.payload.course
      );
    },
    unenrollFromCourse: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        enrollment => 
          !(enrollment.user === action.payload.user && 
            enrollment.course === action.payload.course)
      );
      state.unenrolledDbCourses.push(action.payload.course);
    },
  },
});

export const { setCurrentUser, enrollInCourse, unenrollFromCourse } = accountSlice.actions;
export default accountSlice.reducer;