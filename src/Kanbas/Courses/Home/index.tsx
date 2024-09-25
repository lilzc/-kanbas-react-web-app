import React from 'react';
import Modules from '../Modules';
import CourseStatus from './Status';

export default function Home() {
  return (
    <table id="wd-home" style={{ width: '100%' }}>
      <tbody>
        <tr>
          {/* First column: Modules */}
          <td valign="top" style={{ width: '60%', padding: '10px' }}>
            <Modules />
          </td>

          {/* Second column: Course Status */}
          <td valign="top" style={{ width: '40%', padding: '10px' }}>
            <CourseStatus />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
