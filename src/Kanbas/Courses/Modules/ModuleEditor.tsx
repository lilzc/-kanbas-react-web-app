interface ModuleEditorProps {
  dialogTitle: string;
  moduleName: string;
  moduleSubtitle: string;
  setModuleName: (name: string) => void;
  setModuleSubtitle: (subtitle: string) => void;
  addModule: () => void;
}

export default function ModuleEditor({
  dialogTitle,
  moduleName,
  moduleSubtitle,
  setModuleName,
  setModuleSubtitle,
  addModule,
}: ModuleEditorProps) {
  return (
    <div
      id="wd-add-module-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Module Name</label>
              <input
                className="form-control"
                value={moduleName}
                placeholder="Module Name"
                onChange={(e) => setModuleName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Module Subtitle (Optional)</label>
              <input
                className="form-control"
                value={moduleSubtitle}
                placeholder="Module Subtitle"
                onChange={(e) => setModuleSubtitle(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={addModule}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              {dialogTitle === "Edit Module" ? "Update" : "Add"} Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}