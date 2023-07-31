
import React from 'react';
import './TimeLine.css'; // Import the CSS file for styling

const TimeLine = () => {
 

  return (
    <div className="timeline-container">
     
        <div className="timeline-item">
          <div className="timeline-point"></div>
          <div className="timeline-content">
            <p></p>
            <div className="applicant-status">
          <p>  </p>
            </div>
          </div>
        </div>

      <div className="timeline-line"></div>
    </div>
  );
};

export default TimeLine;
