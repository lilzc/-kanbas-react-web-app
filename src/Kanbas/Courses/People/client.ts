import axios from "axios";

const API_BASE = process.env.REACT_APP_REMOTE_SERVER;

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/api/courses/${courseId}/users`);
  return response.data;
};

export const createUser = async (courseId: string, user: any) => {
  const response = await axios.post(
    `${API_BASE}/api/courses/${courseId}/users`, 
    user
  );
  return response.data;
};

export const updateUser = async (userId: string, updates: any) => {
  const response = await axios.put(
    `${API_BASE}/api/users/${userId}`,
    updates
  );
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${API_BASE}/api/users/${userId}`);
  return response.data;
};