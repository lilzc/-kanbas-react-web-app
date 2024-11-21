import { useLocation } from "react-router";
import './TOC.css';

export default function TOC() {
  const { pathname } = useLocation();

  return (
    <div>
      <h2>Table of Contents</h2>
      <nav aria-label="Table of Contents">
        <ul className="nav nav-pills" id="wd-toc">
          <li className="nav-item">
            <a id="wd-a" href="#/Labs" 
               className="nav-link">
              Labs
            </a>
          </li>
        </ul>

        <div className="d-flex justify-content-start align-items-center gap-2 my-2">
          <a id="wd-a1" href="#/Labs/Lab1"
             className={`nav-link rounded-pill px-3 ${pathname.includes("Lab1") ? "active" : ""}`}>
            Lab 1
          </a>
          <a id="wd-a2" href="#/Labs/Lab2"
             className={`nav-link rounded-pill px-3 ${pathname.includes("Lab2") ? "active" : ""}`}>
            Lab 2
          </a>
          <a id="wd-a3" href="#/Labs/Lab3"
             className={`nav-link rounded-pill px-3 ${pathname.includes("Lab3") ? "active" : ""}`}>
            Lab 3
          </a>
          <a id="wd-a4" href="#/Labs/Lab4"
             className={`nav-link rounded-pill px-3 ${pathname.includes("Lab4") ? "active" : ""}`}>
            Lab 4
          </a>
          <a id="wd-a4" href="#/Labs/Lab5"
             className={`nav-link rounded-pill px-3 ${pathname.includes("Lab5") ? "active" : ""}`}>
            Lab 5
          </a>
        </div>

        <ul className="nav nav-pills" id="wd-toc">
          <li className="nav-item">
            <a id="wd-k" href="#/Kanbas" 
               className="nav-link">
              Kanbas
            </a>
          </li>
          <li className="nav-item">
            <a id="wd-github" 
               href="https://github.com/lilzc/kanbas-react-web-app"
               target="_blank"
               rel="noopener noreferrer"
               className="nav-link">
              React App Repository
            </a>
          </li>
          <li className="nav-item">
            <a id="wd-node-server" 
               href="https://github.com/lilzc/-kanbas-node-server-app"
               target="_blank"
               rel="noopener noreferrer"
               className="nav-link">
              Node Server Repository
            </a>
          </li>
          <li className="nav-item">
            <a id="wd-server-api" 
               href="https://kanbas-node-server-app-lilzc-18dd5f08439b.herokuapp.com/"
               target="_blank"
               rel="noopener noreferrer"
               className="nav-link">
              Node Server API
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}