interface ModuleControlButtonsProps {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}

function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: ModuleControlButtonsProps) {
  return (
    <div className="d-flex">
      <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => editModule(moduleId)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteModule(moduleId)}
      >
        Delete
      </button>
    </div>
  );
}


export default ModuleControlButtons;