import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  user: string;
  course: string;
}

interface AccountState {
  currentUser: any;
  enrollments: Enrollment[];
  unenrolledDbCourses: string[];
  enrolledCourses: string[];
}

const initialState: AccountState = {
  currentUser: null,
  enrollments: [],
  unenrolledDbCourses: [],
  enrolledCourses: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    setEnrollments: (state, action: PayloadAction<string[]>) => {
      state.enrolledCourses = action.payload;
    },
    enrollInCourse: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
      state.enrolledCourses.push(action.payload.course);
      state.unenrolledDbCourses = state.unenrolledDbCourses.filter(
        id => id !== action.payload.course
      );
    },
    unenrollFromCourse: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        enrollment => 
          !(enrollment.user === action.payload.user && 
            enrollment.course === action.payload.course)
      );
      state.enrolledCourses = state.enrolledCourses.filter(
        id => id !== action.payload.course
      );
      state.unenrolledDbCourses.push(action.payload.course);
    },
  },
});

export const { 
  setCurrentUser, 
  setEnrollments, 
  enrollInCourse, 
  unenrollFromCourse 
} = accountSlice.actions;
export default accountSlice.reducer;