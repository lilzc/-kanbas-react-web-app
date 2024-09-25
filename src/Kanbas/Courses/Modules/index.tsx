import React, { useState } from 'react';

export default function Modules() {
  const [modules, setModules] = useState([
    { title: 'Week 1: Introduction to the course', progress: 100, expanded: true },
    { title: 'Week 2: Learning Objectives', progress: 50, expanded: false },
    { title: 'Week 3: Web Development Basics', progress: 0, expanded: false },
  ]);

  // Function to toggle module expansion
  const toggleModule = (index: number) => {
    setModules(
      modules.map((mod, modIndex) =>
        modIndex === index ? { ...mod, expanded: !mod.expanded } : mod
      )
    );
  };

  // Function to collapse all modules
  const collapseAll = () => {
    setModules(modules.map((mod) => ({ ...mod, expanded: false })));
  };

  // Function to expand all modules
  const expandAll = () => {
    setModules(modules.map((mod) => ({ ...mod, expanded: true })));
  };

  return (
    <div>
      <h2>Course Modules</h2>

      {/* Expand/Collapse Buttons */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={expandAll}>Expand All</button>
        <button onClick={collapseAll} style={{ marginLeft: '10px' }}>
          Collapse All
        </button>
      </div>

      <ul>
        {modules.map((module, index) => (
          <li key={index}>
            <div>
              <strong onClick={() => toggleModule(index)} style={{ cursor: 'pointer' }}>
                {module.title} {module.expanded ? '▲' : '▼'}
              </strong>

              {module.expanded && (
                <div style={{ marginTop: '5px', paddingLeft: '10px' }}>
                  {/* Progress Bar */}
                  <div style={{ width: '100%', backgroundColor: '#eee' }}>
                    <div
                      style={{
                        width: `${module.progress}%`,
                        backgroundColor: module.progress === 100 ? 'green' : 'blue',
                        height: '10px',
                      }}
                    />
                  </div>
                  <p>{module.progress}% complete</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
