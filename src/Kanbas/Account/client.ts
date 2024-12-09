import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_REMOTE_SERVER;

const axiosWithCredentials = axios.create({
    withCredentials: true
  });

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000",
    withCredentials: true
  });

export const createUser = async (user: any) => {
   const response = await axiosWithCredentials.post(`${USERS_API}`, user);
   return response.data;
};

export const signup = async (user: any) => {
   try {
       const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
       return response.data;
   } catch (error) {
       console.error("Error signing up:", error);
       throw error;
   }
};

export const signin = async (credentials: any) => {
   try {
       const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
       return response.data;
   } catch (error) {
       console.error("Error signing in:", error);
       throw error;
   }
};

export const updateUser = async (userId: string, updates: any) => {
   try {
       const response = await axiosWithCredentials.put(`${USERS_API}/${userId}`, updates);
       return response.data;
   } catch (error) {
       console.error("Error updating user:", error);
       throw error;
   }
};

export const findUserById = async (userId: string) => {
   try {
       const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
       return response.data;
   } catch (error) {
       console.error("Error finding user by ID:", error);
       throw error;
   }
};

export const findMyCourses = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

export const findAllUsers = async () => {
   try {
       const response = await axiosWithCredentials.get(USERS_API);
       return response.data;
   } catch (error) {
       console.error("Error finding all users:", error);
       throw error;
   }
};

export const signout = async () => {
   try {
       const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
       return response.data;
   } catch (error) {
       console.error("Error signing out:", error);
       throw error;
   }
};

export const findUsersByRole = async (role: string) => {
   const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
   return response.data;
};

export const findUsersByPartialName = async (name: string) => {
   const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
   return response.data;
};

export const findCoursesForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

export const deleteUser = async (userId: string) => {
   const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
   return response.data;
};


  export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
   };
   export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
   };
   
   export const profile = async () => {
    try {
      const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


axiosWithCredentials.interceptors.response.use(
   (response) => response,
   (error) => {
       if (error.response?.status === 401) {
           console.log("Unauthorized access");
       }
       return Promise.reject(error);
   }
);