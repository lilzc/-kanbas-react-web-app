export type UserRole = "STUDENT" | "FACULTY" | "ADMIN" | "USER" | "TA";

export interface User {
    _id?: string;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    section?: string;
    loginId?: string;
    lastActivity?: Date;
    totalActivity?: string;
}

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    description: string;
    image?: string;
    enrolled?: boolean;
    department?: string;
    credits?: number;
}

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
    grade?: number;
    letterGrade?: string;
    enrollmentDate?: Date;
    status?: "ENROLLED" | "DROPPED" | "COMPLETED";
}


export interface DashboardProps {
    course: Course;
    courses: Course[];
    setCourse: (course: Course) => void;
    addNewCourse: () => Promise<void>;
    deleteCourse: (courseId: string) => Promise<void>;
    updateCourse: () => Promise<void>;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => Promise<void>;
}