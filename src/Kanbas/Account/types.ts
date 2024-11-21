export type UserRole = 'FACULTY' | 'STUDENT' | 'TA';

export interface User {
   _id?: string;
   username: string; 
   password: string;
   firstName: string;
   lastName: string;
   email: string;
   role: UserRole;
   loginId?: string;
   section?: string;
   lastActivity?: string;  
   totalActivity?: string;
}