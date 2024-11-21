import { useState, KeyboardEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addModule, 
  deleteModule, 
  updateModule, 
  editModule, 
  deleteLesson,
  updateLesson,
  setModules
} from './reducer';
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

interface Lesson {
  _id: string;
  name: string;
  module: string;
}

interface ModuleWithState {
  _id: string;
  name: string;
  course: string;
  description: string;
  lessons: Lesson[];
  expanded: boolean;
  editing: boolean;
}

export default function Modules() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();
  const modules = useSelector((state: any) => state.modulesReducer.modules) as ModuleWithState[];
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [moduleName, setModuleName] = useState("");
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingLessonName, setEditingLessonName] = useState("");
  const [editingModuleName, setEditingModuleName] = useState("");

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchModules = async () => {
    if (!courseId) return;
    const modules = await coursesClient.findModulesForCourse(courseId);
    dispatch(setModules(modules));
  };


  useEffect(() => {
    fetchModules();
  }, [courseId]);


  const createModuleForCourse = async () => {
    if (!courseId || !moduleName || !isFaculty) return;
    const newModule = { name: moduleName, course: courseId };
    const module = await coursesClient.createModuleForCourse(courseId, newModule);
    dispatch(addModule(module));
    setModuleName("");
  };

  // Remove module handler
  const removeModule = async (moduleId: string) => {
    if (!isFaculty) return;
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error(error);
    }
  };

  // Save module handler
  const saveModule = async (module: ModuleWithState) => {
    if (!isFaculty) return;
    try {
      await modulesClient.updateModule(module);
      dispatch(updateModule({
        ...module,
        editing: false
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditModule = (moduleId: string) => {
    if (!isFaculty) return;
    const module = modules.find(m => m._id === moduleId);
    if (module) {
      setEditingModuleName(module.name);
      dispatch(editModule(moduleId));
    }
  };

  const handleUpdateModule = async (module: ModuleWithState) => {
    if (!isFaculty) return;
    const updatedModule: ModuleWithState = {
      ...module,
      name: editingModuleName,
      editing: false
    };
    await saveModule(updatedModule);
    setEditingModuleName("");
  };

  const handleCancelModuleEdit = (module: ModuleWithState) => {
    dispatch(updateModule({
      ...module,
      editing: false
    }));
    setEditingModuleName("");
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (isFaculty) {
      dispatch(deleteLesson(lessonId));
    }
  };

  const handleLessonEdit = (lesson: Lesson) => {
    if (isFaculty) {
      setEditingLesson(lesson);
      setEditingLessonName(lesson.name);
    }
  };

  const handleSaveLesson = () => {
    if (editingLesson && editingLessonName.trim() && isFaculty) {
      dispatch(updateLesson({
        lessonId: editingLesson._id,
        name: editingLessonName.trim()
      }));
      setEditingLesson(null);
      setEditingLessonName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingLesson(null);
    setEditingLessonName("");
  };

  const handleLessonKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveLesson();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleModuleKeyDown = (e: KeyboardEvent<HTMLInputElement>, module: ModuleWithState) => {
    if (e.key === "Enter") {
      handleUpdateModule(module);
    } else if (e.key === "Escape") {
      handleCancelModuleEdit(module);
    }
  };

  const toggleModuleExpansion = (moduleId: string) => {
    const module = modules.find((mod) => mod._id === moduleId);
    if (module) {
      const updatedModule: ModuleWithState = {
        ...module,
        expanded: !module.expanded,
        editing: !!module.editing
      };
      dispatch(updateModule(updatedModule));
    }
  };

  const collapseAllModules = () => {
    modules.forEach((module: ModuleWithState) => {
      const updatedModule: ModuleWithState = {
        ...module,
        expanded: false,
        editing: !!module.editing
      };
      dispatch(updateModule(updatedModule));
    });
  };

  const expandAllModules = () => {
    modules.forEach((module: ModuleWithState) => {
      const updatedModule: ModuleWithState = {
        ...module,
        expanded: true,
        editing: !!module.editing
      };
      dispatch(updateModule(updatedModule));
    });
  };

  return (
    <div>
      {isFaculty && (
        <ModulesControls 
          onCollapseAll={collapseAllModules} 
          onExpandAll={expandAllModules}
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={createModuleForCourse}
        />
      )}
      <br /><br /><br />
      
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing ? (
                  <span onClick={() => toggleModuleExpansion(module._id)} style={{ cursor: 'pointer' }}>
                    {module.name} {module.expanded ? '▲' : '▼'}
                  </span>
                ) : (
                  <div className="d-flex align-items-center flex-grow-1">
                    <input
                      className="form-control me-2"
                      style={{ width: "300px" }}
                      value={editingModuleName}
                      onChange={(e) => setEditingModuleName(e.target.value)}
                      onKeyDown={(e) => handleModuleKeyDown(e, module)}
                      autoFocus
                    />
                    <div className="ms-2">
                      <button 
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdateModule(module)}
                      >
                        Save
                      </button>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleCancelModuleEdit(module)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {isFaculty && !module.editing && (
                <div className="ms-2">
                  <ModuleControlButtons 
                    moduleId={module._id}
                    deleteModule={removeModule}
                    editModule={handleEditModule}
                  />
                </div>
              )}
            </div>
            {module.expanded && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {editingLesson?._id === lesson._id ? (
                      <div className="d-flex align-items-center">
                        <input
                          className="form-control me-2"
                          style={{ width: "300px" }}
                          value={editingLessonName}
                          onChange={(e) => setEditingLessonName(e.target.value)}
                          onKeyDown={handleLessonKeyDown}
                          autoFocus
                        />
                        <div className="ms-2">
                          <button 
                            className="btn btn-success btn-sm me-2"
                            onClick={handleSaveLesson}
                          >
                            Save
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="ms-2">{lesson.name}</span>
                    )}
                    {isFaculty && editingLesson?._id !== lesson._id && (
                      <LessonControlButtons 
                        lesson={lesson}
                        setLesson={handleLessonEdit}
                        deleteLesson={handleDeleteLesson}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}