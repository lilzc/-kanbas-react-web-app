import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image?: string;
  description?: string;
}

interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
}

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  assignmentGroup?: string;
  displayGrade?: string;
  submissionType?: string;
  onlineEntryOptions?: {
    textEntry: boolean;
    websiteUrl: boolean;
    mediaRecordings: boolean;
    studentAnnotation: boolean;
    fileUploads: boolean;
  };
  assignTo?: string;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const typedCourses = courses as Course[];
const typedModules = modules as Module[];
const typedAssignments = assignments as Assignment[];
const typedUsers = users as User[];
const typedEnrollments = enrollments as Enrollment[];

console.log("Assignments: ", typedAssignments);

export { 
  typedCourses as courses, 
  typedModules as modules, 
  typedAssignments as assignments,
  typedUsers as users,
  typedEnrollments as enrollments
};