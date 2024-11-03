import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments as db } from "../../Database";


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
}

const typedDb: Assignment[] = db.map(assignment => ({
  _id: assignment._id || "",
  title: assignment.title || "",
  description: assignment.description || "",
  points: Number(assignment.points) || 0,
  dueDate: assignment.dueDate,          
  availableFrom: assignment.availableFrom, 
  availableUntil: assignment.availableUntil, 
  course: assignment.course || ""
}));

const initialState: AssignmentsState = {
  assignments: typedDb
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        assignment => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map(assignment =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    }
  }
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;