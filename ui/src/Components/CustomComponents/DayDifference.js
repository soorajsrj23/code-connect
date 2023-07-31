import React from 'react';

const DaysDifference = ({ appliedAt }) => {
  const getDaysDifference = (appliedAt) => {
    const appliedDate = new Date(appliedAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - appliedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const daysDifference = getDaysDifference(appliedAt);

  return <span>{daysDifference} days ago</span>;
};

export default DaysDifference;
