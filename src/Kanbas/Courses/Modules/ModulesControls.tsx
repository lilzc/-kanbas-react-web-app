import React from "react";
import { useSelector } from "react-redux";

interface ModulesControlsProps {
  onCollapseAll: () => void;
  onExpandAll: () => void;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}

function ModulesControls({
  onCollapseAll,
  onExpandAll,
  moduleName,
  setModuleName,
  addModule
}: ModulesControlsProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="d-flex justify-content-end align-items-center">
      <button className="btn btn-secondary me-2" onClick={onCollapseAll}>
        Collapse All
      </button>
      <button className="btn btn-secondary me-2" onClick={onExpandAll}>
        Expand All
      </button>
      
      {isFaculty && (
        <div className="d-flex">
          <input
            className="form-control me-2"
            placeholder="New Module"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addModule}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default ModulesControls;