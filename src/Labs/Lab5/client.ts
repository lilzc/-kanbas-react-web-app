import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const TODOS_API = `${REMOTE_SERVER}/lab5/todos`;
const ASSIGNMENT_API = `${REMOTE_SERVER}/lab5/assignment`;

export const fetchWelcomeMessage = async () => {
    try {
        const response = await axios.get(`${REMOTE_SERVER}/lab5/welcome`);
        return response.data;
    } catch (error) {
        console.error("Error fetching welcome message:", error);
        throw error;
    }
};

export const fetchAssignment = async () => {
    try {
        const response = await axios.get(`${ASSIGNMENT_API}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching assignment:", error);
        throw error;
    }
};

export const updateTitle = async (title: string) => {
    try {
        const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
        return response.data;
    } catch (error) {
        console.error("Error updating title:", error);
        throw error;
    }
};

export const fetchTodos = async () => {
    try {
        const response = await axios.get(TODOS_API);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
};

export const removeTodo = async (todo: any) => {
    try {
        const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error removing todo:", error);
        throw error;
    }
};

export const deleteTodo = async (todo: any) => {
    try {
        const response = await axios.delete(`${TODOS_API}/${todo.id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
};

// New way - using PUT
export const updateTodo = async (todo: any) => {
    try {
        const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
        return response.data;
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
};

// Old way - using GET for specific updates
export const updateTodoTitle = async (todoId: string, title: string) => {
    try {
        const response = await axios.get(`${TODOS_API}/${todoId}/title/${title}`);
        return response.data;
    } catch (error) {
        console.error("Error updating todo title:", error);
        throw error;
    }
};

export const updateTodoDescription = async (todoId: string, description: string) => {
    try {
        const response = await axios.get(`${TODOS_API}/${todoId}/description/${description}`);
        return response.data;
    } catch (error) {
        console.error("Error updating todo description:", error);
        throw error;
    }
};

export const updateTodoCompleted = async (todoId: string, completed: boolean) => {
    try {
        const response = await axios.get(`${TODOS_API}/${todoId}/completed/${completed}`);
        return response.data;
    } catch (error) {
        console.error("Error updating todo completed status:", error);
        throw error;
    }
};

// Old way - using GET for creation
export const createTodo = async () => {
    try {
        const response = await axios.get(`${TODOS_API}/create`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error creating todo:", error);
        return [];
    }
};

// New way - using POST for creation
export const postTodo = async (todo: any) => {
    try {
        const response = await axios.post(TODOS_API, todo);
        return response.data;
    } catch (error) {
        console.error("Error posting todo:", error);
        throw error;
    }
};

// Fetch filtered todos
export const fetchCompletedTodos = async () => {
    try {
        const response = await axios.get(`${TODOS_API}?completed=true`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching completed todos:", error);
        return [];
    }
};

export const fetchIncompleteTodos = async () => {
    try {
        const response = await axios.get(`${TODOS_API}?completed=false`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching incomplete todos:", error);
        return [];
    }
};

export const fetchTodoById = async (todoId: string) => {
    try {
        const response = await axios.get(`${TODOS_API}/${todoId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching todo by id:", error);
        throw error;
    }
};

export const handleAxiosError = (error: any) => {
    if (error.response) {
        return error.response.data.message || "An error occurred";
    } else if (error.request) {
        return "No response from server";
    } else {
        return "Error making request";
    }
};

axios.defaults.baseURL = REMOTE_SERVER;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000; 

axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios Error:', error);
        return Promise.reject(error);
    }
);

export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    editing?: boolean;
}

export interface Assignment {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
    score: number;
}

export type ApiResponse<T> = {
    data: T;
    status: number;
    message?: string;
}