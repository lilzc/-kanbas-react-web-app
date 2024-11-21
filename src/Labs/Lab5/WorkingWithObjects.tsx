import { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    const [module, setModule] = useState({
        id: "M123",
        name: "Web Development",
        description: "Introduction to Full Stack Development",
        course: "CS5610"
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            <h4>Assignment</h4>
            <a 
                id="wd-retrieve-assignments" 
                className="btn btn-primary me-2"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <a 
                id="wd-retrieve-assignment-title"
                className="btn btn-primary me-2"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>

            <div className="mt-3">
                <label>Score:</label>
                <input 
                    type="number"
                    className="form-control w-25 mb-2"
                    value={assignment.score}
                    onChange={(e) => setAssignment({
                        ...assignment,
                        score: parseInt(e.target.value)
                    })}
                />
                <a 
                    className="btn btn-success me-2"
                    href={`${REMOTE_SERVER}/lab5/assignment/score/${assignment.score}`}>
                    Update Score
                </a>
            </div>

            <div className="mt-3">
                <label>Completed:</label>
                <div className="form-check">
                    <input 
                        type="checkbox"
                        className="form-check-input"
                        checked={assignment.completed}
                        onChange={(e) => setAssignment({
                            ...assignment,
                            completed: e.target.checked
                        })}
                    />
                    <a 
                        className="btn btn-success ms-2"
                        href={`${REMOTE_SERVER}/lab5/assignment/completed/${assignment.completed}`}>
                        Update Completed Status
                    </a>
                </div>
            </div>

            <hr/>
            <h4>Module</h4>
            <a 
                className="btn btn-primary me-2"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <a 
                className="btn btn-primary me-2"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>

            <div className="mt-3">
                <label>Module Name:</label>
                <input 
                    className="form-control w-50 mb-2"
                    value={module.name}
                    onChange={(e) => setModule({
                        ...module,
                        name: e.target.value
                    })}
                />
                <a 
                    className="btn btn-success me-2"
                    href={`${REMOTE_SERVER}/lab5/module/name/${module.name}`}>
                    Update Module Name
                </a>
            </div>

            <div className="mt-3">
                <label>Module Description:</label>
                <input 
                    className="form-control w-50 mb-2"
                    value={module.description}
                    onChange={(e) => setModule({
                        ...module,
                        description: e.target.value
                    })}
                />
                <a 
                    className="btn btn-success me-2"
                    href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}>
                    Update Module Description
                </a>
            </div>
        </div>
    );
}