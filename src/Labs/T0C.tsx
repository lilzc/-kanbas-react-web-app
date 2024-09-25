import React from 'react';

export default function TOC() {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#/Lab1">Lab 1</a></li>
        <li><a href="#/Lab2">Lab 2</a></li>
        <li><a href="#/Lab3">Lab 3</a></li>
        <li><a href="#/Kanbas">Kanbas</a></li>
        {/* Add link to your GitHub repository */}
        <li>
          <a 
            href="https://github.com/lilzc/kanbas-react-web-app" 
            id="wd-github" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            My GitHub Repository
          </a>
        </li>
      </ul>
    </div>
  );
}
