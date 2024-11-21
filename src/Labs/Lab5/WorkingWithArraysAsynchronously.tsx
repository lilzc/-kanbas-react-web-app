import  { useState, useEffect } from "react";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<Array<any>>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => {
        try {
            const todosData = await client.fetchTodos();
            setTodos(Array.isArray(todosData) ? todosData : []);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error fetching todos:", error);
            setTodos([]);
            setErrorMessage("Error fetching todos");
        }
    };

    const editTodo = (todo: any) => {
        const updatedTodos = todos.map((t) => 
            t.id === todo.id ? { ...todo, editing: true } : t
        );
        setTodos(updatedTodos);
    };

    const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
            setErrorMessage(null);
        } catch (error: any) {
            console.error("Error updating todo:", error);
            setErrorMessage(error.response?.data?.message || "Error updating todo");
        }
    };

    const removeTodo = async (todo: any) => {
        try {
            await client.removeTodo(todo);
            setTodos(todos.filter(t => t.id !== todo.id));
            setErrorMessage(null);
        } catch (error) {
            console.error("Error removing todo:", error);
            setErrorMessage("Error removing todo");
        }
    };

    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
            setErrorMessage(null);
        } catch (error: any) {
            console.error("Error deleting todo:", error);
            setErrorMessage(error.response?.data?.message || "Error deleting todo");
        }
    };

    const createTodo = async () => {
        try {
            const newTodos = await client.createTodo();
            setTodos(newTodos);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error creating todo:", error);
            setErrorMessage("Error creating todo");
        }
    };

    const postTodo = async () => {
        try {
            const newTodo = await client.postTodo({ 
                title: "New Posted Todo", 
                completed: false,
                description: "This is a new posted todo"
            });
            setTodos(prevTodos => [...prevTodos, newTodo]);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error posting todo:", error);
            setErrorMessage("Error posting todo");
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div id="wd-asynchronous-arrays" className="container">
            <h3 className="mb-4">Working with Arrays Asynchronously</h3>
            
            {errorMessage && (
                <div id="wd-todo-error-message" 
                     className="alert alert-danger mb-2">
                    {errorMessage}
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Todos</h4>
                <div>
                    <FaPlusCircle 
                        onClick={postTodo} 
                        className="text-primary me-2"
                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                        id="wd-post-todo" 
                        title="Add New Todo (POST)"
                    />
                    <FaPlusCircle 
                        onClick={createTodo} 
                        className="text-success"
                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                        id="wd-create-todo" 
                        title="Add New Todo (GET)"
                    />
                </div>
            </div>

            <ul className="list-group">
                {todos.map((todo) => (
                    <li key={todo.id} 
                        className="list-group-item">
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center flex-grow-1">
                                <input 
                                    type="checkbox"
                                    className="form-check-input me-3"
                                    checked={todo.completed}
                                    onChange={(e) => updateTodo({ 
                                        ...todo, 
                                        completed: e.target.checked 
                                    })}
                                />
                                {!todo.editing ? (
                                    <span style={{
                                        textDecoration: todo.completed ? "line-through" : "none"
                                    }}>
                                        {todo.title}
                                    </span>
                                ) : (
                                    <input 
                                        className="form-control"
                                        style={{ maxWidth: '300px' }}
                                        value={todo.title}
                                        onChange={(e) => updateTodo({
                                            ...todo,
                                            title: e.target.value
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateTodo({
                                                    ...todo,
                                                    editing: false
                                                });
                                            }
                                        }}
                                        autoFocus
                                    />
                                )}
                            </div>
                            <div className="d-flex align-items-center">
                                <FaPencil 
                                    onClick={() => editTodo(todo)}
                                    className="text-primary ms-2 me-2"
                                    style={{ cursor: 'pointer' }}
                                    id="wd-edit-todo"
                                />
                                <FaTrash 
                                    onClick={() => removeTodo(todo)}
                                    className="text-danger ms-2 me-2"
                                    style={{ cursor: 'pointer' }}
                                    id="wd-remove-todo"
                                />
                                <TiDelete 
                                    onClick={() => deleteTodo(todo)}
                                    className="text-danger ms-2"
                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                    id="wd-delete-todo"
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {todos.length === 0 && (
                <div className="text-center text-muted mt-4">
                    No todos yet. Click the plus button to add one!
                </div>
            )}
            
            <hr className="mt-4" />
        </div>
    );
}