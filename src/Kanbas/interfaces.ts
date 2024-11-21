export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    description: string;
    image?: string;
  }
  
  export interface Enrollment {
    _id: string;
    user: string;
    course: string;
  }
  
  export interface DashboardProps {
    course: Course;
    setCourse: (course: Course) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
  }