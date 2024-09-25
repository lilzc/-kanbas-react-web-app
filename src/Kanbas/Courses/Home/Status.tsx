import React, { useState } from 'react';

export default function CourseStatus() {
  const [isPublished, setIsPublished] = useState(false);
  const [progress] = useState(60);  

  const handlePublish = () => setIsPublished(true);
  const handleUnpublish = () => setIsPublished(false);

  return (
    <div id="wd-course-status" style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
      <h2>Course Status</h2>
      <p>Status: {isPublished ? 'Published' : 'Unpublished'}</p>
      <p>Overall Course Progress: {progress}% complete</p>
      <div style={{ width: '100%', backgroundColor: '#eee', marginBottom: '10px' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: progress === 100 ? 'green' : 'blue',
            height: '10px',
          }}
        />
      </div>
      <button onClick={handlePublish} disabled={isPublished} style={{ marginRight: '10px' }}>
        Publish
      </button>
      <button onClick={handleUnpublish} disabled={!isPublished}>
        Unpublish
      </button>

      <button style={{ display: 'block', marginTop: '10px' }}>
        View Course Notifications
      </button>
    </div>
  );
}
