
import React from 'react';
import './TimeLine.css'; // Import the CSS file for styling

const TimeLine = ({ applicantInfo }) => {
  const getDaysDifference = (appliedAt) => {
    const appliedDate = new Date(appliedAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - appliedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

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
