import React, { useState } from 'react';
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  const [modules, setModules] = useState([
    { 
      title: 'Week 1: Introduction to the course', 
      progress: 100, 
      expanded: true,
      lessons: [
        "LEARNING OBJECTIVES",
        "Introduction to the course",
        "Learn what is Web Development",
        "LESSON 1",
        "LESSON 2"
      ]
    },
    { 
      title: 'Week 2: Learning Objectives', 
      progress: 50, 
      expanded: false,
      lessons: [
        "LEARNING OBJECTIVES",
        "LESSON 1",
        "LESSON 2"
      ]
    },
    { 
      title: 'Week 3: Web Development Basics', 
      progress: 0, 
      expanded: false,
      lessons: [
        "LEARNING OBJECTIVES",
        "LESSON 1",
        "LESSON 2"
      ]
    },
  ]);

  const toggleModule = (index: number) => {
    setModules(
      modules.map((mod, modIndex) =>
        modIndex === index ? { ...mod, expanded: !mod.expanded } : mod
      )
    );
  };

  const collapseAll = () => {
    setModules(modules.map((mod) => ({ ...mod, expanded: false })));
  };

  const expandAll = () => {
    setModules(modules.map((mod) => ({ ...mod, expanded: true })));
  };

  return (
    <div>
      <ModulesControls onCollapseAll={collapseAll} onExpandAll={expandAll} /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module, index) => (
          <li key={index} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                <span onClick={() => toggleModule(index)} style={{ cursor: 'pointer' }}>
                  {module.title} {module.expanded ? '▲' : '▼'}
                </span>
              </div>
              <ModuleControlButtons />
            </div>
            {module.expanded && (
              <>
                <div className="p-3">
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{
                        width: `${module.progress}%`,
                        backgroundColor: module.progress === 100 ? 'green' : 'blue'
                      }} 
                      aria-valuenow={module.progress} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <p className="mt-2">{module.progress}% complete</p>
                </div>
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson}
                      <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}