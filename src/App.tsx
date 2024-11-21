import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Kanbas/store';
import Kanbas from './Kanbas';
import Labs from './Labs';
import KanbasNavigation from './Kanbas/Navigation';
import AssignmentEditor from './Kanbas/Courses/Assignments/AssignmentEditor';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="app-container">
          <KanbasNavigation />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
              <Route path="/Kanbas/*" element={<Kanbas />} />
              <Route path="/Labs/*" element={<Labs />} />
              <Route 
                path="Courses/:courseId/Assignments/:assignmentId" 
                element={<AssignmentEditor />} 
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
}