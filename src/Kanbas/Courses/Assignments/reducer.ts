import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as client from "./client";

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate?: string;         
  availableFrom?: string;   
  availableUntil?: string;
  course: string;
}

interface AssignmentsState {
  assignments: Assignment[];
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentsState = {
  assignments: [],
  loading: false,
  error: null
};

// Async thunks
export const fetchAssignmentsForCourse = createAsyncThunk(
  "assignments/fetchForCourse",
  async (courseId: string) => {
    const response = await client.findAssignmentsForCourse(courseId);
    return response;
  }
);

export const createAssignment = createAsyncThunk(
  "assignments/create",
  async ({ courseId, assignment }: { courseId: string; assignment: Assignment }) => {
    const response = await client.createAssignment(courseId, assignment);
    return response;
  }
);

export const updateAssignment = createAsyncThunk(
  "assignments/update",
  async (assignment: Assignment) => {
    const response = await client.updateAssignment(assignment._id, assignment);
    return response;
  }
);

export const deleteAssignment = createAsyncThunk(
  "assignments/delete",
  async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    return assignmentId;
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch assignments
    builder
      .addCase(fetchAssignmentsForCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentsForCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignmentsForCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch assignments";
      })

    // Create assignment
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })

    // Update assignment
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const index = state.assignments.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.assignments[index] = action.payload;
        }
      })

    // Delete assignment
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        );
      });
  },
});

export const { setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;