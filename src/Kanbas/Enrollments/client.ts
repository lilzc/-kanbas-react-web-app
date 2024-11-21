import axios from "axios";
const API_BASE = process.env.REACT_APP_REMOTE_SERVER;

export const findEnrollmentsByUser = async (userId: string) => {
  const response = await axios.get(`${API_BASE}/api/users/${userId}/enrollments`);
  return response.data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(
    `${API_BASE}/api/users/${userId}/enrollments/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${API_BASE}/api/users/${userId}/enrollments/${courseId}`
  );
  return response.data;
};