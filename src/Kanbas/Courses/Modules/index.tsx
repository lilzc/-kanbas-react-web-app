import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import * as db from '../../Database'; 

export default function Modules() {
  const { cid } = useParams();  
  const initialModules = db.modules.filter((module) => module.course === cid); 


  const [modules, setModules] = useState(
    initialModules.map((mod) => ({ ...mod, expanded: false })) 
  );

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
                  {module.name} {module.expanded ? '▲' : '▼'}
                </span>
              </div>
              <ModuleControlButtons />
            </div>
            {module.expanded && (
              <>
                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                        <LessonControlButtons />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
