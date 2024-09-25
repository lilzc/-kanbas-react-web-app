import React from 'react';

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      <label htmlFor="wd-description">Assignment Description</label><br />
      <textarea id="wd-description">
        The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
        - Your full name and section
        - Links to each of the lab assignments
        - Link to the Kanbas application
        - Links to all relevant source code repositories
        The Kanbas application should include a link to navigate back to the landing page.
      </textarea><br /><br />

      <table>
        <tbody>
          <tr style={{ textAlign: 'right', verticalAlign: 'top' }}>
            <td><label htmlFor="wd-points">Points</label></td>
            <td><input id="wd-points" defaultValue={100} /></td>
          </tr>

          <tr style={{ textAlign: 'right', verticalAlign: 'top' }}>
            <td><label htmlFor="wd-group">Assignment Group</label></td>
            <td>
              <select id="wd-group">
                <option value="assignments">Assignments</option>
                <option value="quizzes">Quizzes</option>
                <option value="projects">Projects</option>
              </select>
            </td>
          </tr>

          <tr style={{ textAlign: 'right', verticalAlign: 'top' }}>
            <td><label htmlFor="wd-display-grade-as">Display Grade As</label></td>
            <td>
              <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
              </select>
            </td>
          </tr>

          <tr style={{ textAlign: 'right', verticalAlign: 'top' }}>
            <td><label htmlFor="wd-submission-type">Submission Type</label></td>
            <td>
              <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="paper">On Paper</option>
              </select>
              <br />
              <label>
                <input type="checkbox" id="wd-text-entry" /> Text Entry
              </label>
              <br />
              <label>
                <input type="checkbox" id="wd-website-url" /> Website URL
              </label>
              <br />
              <label>
                <input type="checkbox" id="wd-media-recordings" /> Media Recordings
              </label>
              <br />
              <label>
                <input type="checkbox" id="wd-file-upload" /> File Uploads
              </label>
            </td>
          </tr>

          <tr style={{ textAlign: 'right', verticalAlign: 'top' }}>
            <td><label htmlFor="wd-assign-to">Assign To</label></td>
            <td>
              <select id="wd-assign-to">
                <option value="everyone">Everyone</option>
                <option value="specific-group">Specific Group</option>
              </select>
            </td>
          </tr>

          <tr style={{ textAlign: 'right', verticalAlign: 'top' }}>
            <td><label htmlFor="wd-due-date">Due Date</label></td>
            <td><input id="wd-due-date" type="date" defaultValue="2024-05-13" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
