import React from "react";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

interface ModulesControlsProps {
  onCollapseAll: () => void;
  onExpandAll: () => void;
}

export default function ModulesControls({ onCollapseAll, onExpandAll }: ModulesControlsProps) {
  const handlePublishAll = () => {
    console.log("Publish all modules and items");
  };

  const handlePublishModules = () => {
    console.log("Publish modules only");
  };

  const handleUnpublishAll = () => {
    console.log("Unpublish all modules and items");
  };

  const handleUnpublishModules = () => {
    console.log("Unpublish modules only");
  };

  return (
    <div id="wd-modules-controls" className="d-flex flex-wrap justify-content-between align-items-center mb-3">
      <div className="d-flex flex-wrap">
        <button id="wd-view-progress" className="btn btn-secondary me-2 mb-2">
          View Progress
        </button>
        <div className="dropdown d-inline me-2 mb-2">
          <button id="wd-publish-all-btn" className="btn btn-secondary dropdown-toggle"
            type="button" data-bs-toggle="dropdown">
            <GreenCheckmark />
            Publish All
          </button>
          <ul className="dropdown-menu">
            <li>
              <button id="wd-publish-all-modules-and-items-btn" className="dropdown-item" onClick={handlePublishAll}>
                <GreenCheckmark />
                Publish all modules and items
              </button>
            </li>
            <li>
              <button id="wd-publish-modules-only-button" className="dropdown-item" onClick={handlePublishModules}>
                <GreenCheckmark />
                Publish modules only
              </button>
            </li>
            <li>
              <button id="wd-unpublish-all-modules-and-items" className="dropdown-item" onClick={handleUnpublishAll}>
                Unpublish all modules and items
              </button>
            </li>
            <li>
              <button id="wd-unpublish-modules-only" className="dropdown-item" onClick={handleUnpublishModules}>
                Unpublish modules only
              </button>
            </li>
          </ul>
        </div>
        <button id="wd-add-module-btn" className="btn btn-danger me-2 mb-2">
          <FaPlus className="me-1" />
          Module
        </button>
      </div>
      <div className="d-flex flex-wrap">
        <button id="wd-collapse-all" className="btn btn-secondary me-2 mb-2" onClick={onCollapseAll}>
          Collapse All
        </button>
        <button id="wd-expand-all" className="btn btn-secondary mb-2" onClick={onExpandAll}>
          Expand All
        </button>
      </div>
    </div>
  );
}