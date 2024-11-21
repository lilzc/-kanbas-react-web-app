import { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithArrays() {
    const API = `${REMOTE_SERVER}/lab5/todos`;
    
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>

            <h4>Retrieving Arrays</h4>
            <a 
                id="wd-retrieve-todos" 
                className="btn btn-primary me-2"
                href={API}>
                Get Todos
            </a>
            <hr/>

            <h3>Creating new Items in an Array</h3>
            <a 
                id="wd-retrieve-completed-todos" 
                className="btn btn-primary"
                href={`${API}/create`}>
                Create Todo
            </a>
            <hr/>

            <h4>Retrieving an Item from an Array by ID</h4>
            <input 
                id="wd-todo-id"
                className="form-control w-50 mb-2"
                defaultValue={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: e.target.value
                })}
            />
            <a 
                id="wd-retrieve-todo-by-id"
                className="btn btn-primary float-end"
                href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <br/>
            <hr/>

            <h3>Deleting from an Array</h3>
            <a 
                id="wd-delete-todo"
                className="btn btn-danger float-end"
                href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>
            <hr/>

            <h3>Updating an Item in an Array</h3>
            {/* Title Update */}
            <div className="mb-3">
                <input 
                    className="form-control w-25 float-start me-2"
                    defaultValue={todo.id}
                    onChange={(e) => setTodo({
                        ...todo,
                        id: e.target.value
                    })}
                />
                <input 
                    defaultValue={todo.title}
                    className="form-control w-50 float-start"
                    onChange={(e) => setTodo({
                        ...todo,
                        title: e.target.value
                    })}
                />
                <a 
                    className="btn btn-primary float-end"
                    href={`${API}/${todo.id}/title/${todo.title}`}>
                    Update Title
                </a>
            </div>

            {/* Description Update */}
            <div className="mb-3 clearfix">
                <input 
                    className="form-control w-25 float-start me-2"
                    defaultValue={todo.id}
                    onChange={(e) => setTodo({
                        ...todo,
                        id: e.target.value
                    })}
                />
                <input 
                    defaultValue={todo.description}
                    className="form-control w-50 float-start"
                    onChange={(e) => setTodo({
                        ...todo,
                        description: e.target.value
                    })}
                />
                <a 
                    className="btn btn-primary float-end"
                    href={`${API}/${todo.id}/description/${todo.description}`}>
                    Update Description
                </a>
            </div>

            {/* Completed Status Update */}
            <div className="mb-3 clearfix">
                <input 
                    className="form-control w-25 float-start me-2"
                    defaultValue={todo.id}
                    onChange={(e) => setTodo({
                        ...todo,
                        id: e.target.value
                    })}
                />
                <div className="form-check float-start mt-2">
                    <input 
                        type="checkbox"
                        className="form-check-input"
                        checked={todo.completed}
                        onChange={(e) => setTodo({
                            ...todo,
                            completed: e.target.checked
                        })}
                    />
                    <label className="form-check-label">Completed</label>
                </div>
                <a 
                    className="btn btn-primary float-end"
                    href={`${API}/${todo.id}/completed/${todo.completed}`}>
                    Update Completed Status
                </a>
            </div>
            <hr/>

            <h3>Filtering Array Items</h3>
            <a 
                id="wd-retrieve-completed-todos"
                className="btn btn-primary"
                href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
        </div>
    );
}