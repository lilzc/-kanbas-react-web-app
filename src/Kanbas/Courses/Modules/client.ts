import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const updateModule = async (module: any) => {
    const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
    return data;
};
  
export const deleteModule = async (moduleId: string) => {
    const response = await axios.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

export const createSubmodule = async (moduleId: string, submodule: any) => {
    const response = await axios.post(`${MODULES_API}/${moduleId}/submodules`, submodule);
    return response.data;
};

export const updateSubmodule = async (moduleId: string, submoduleId: string, submodule: any) => {
    const response = await axios.put(
        `${MODULES_API}/${moduleId}/submodules/${submoduleId}`, 
        submodule
    );
    return response.data;
};

export const deleteSubmodule = async (moduleId: string, submoduleId: string) => {
    const response = await axios.delete(
        `${MODULES_API}/${moduleId}/submodules/${submoduleId}`
    );
    return response.data;
};

export const getSubmodules = async (moduleId: string) => {
    const response = await axios.get(`${MODULES_API}/${moduleId}/submodules`);
    return response.data;
};