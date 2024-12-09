import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return data;
};

export const createSubmodule = async (moduleId: string, submodule: any) => {
  const { data } = await axiosWithCredentials.post(`${MODULES_API}/${moduleId}/submodules`, submodule);
  return data;
};

export const updateSubmodule = async (moduleId: string, submoduleId: string, submodule: any) => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${moduleId}/submodules/${submoduleId}`, 
    submodule
  );
  return data;
};

export const deleteSubmodule = async (moduleId: string, submoduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}/submodules/${submoduleId}`
  );
  return data;
};

export const getSubmodules = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.get(`${MODULES_API}/${moduleId}/submodules`);
  return data;
};