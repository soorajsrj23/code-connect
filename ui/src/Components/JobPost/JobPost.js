import React, { useEffect, useState } from 'react';
import './JobPost.css';
import SmallNavbar from '../Navbar/SmallNavbar';

function JobPost() {
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State to keep track of the selected job post
  const [showPopup, setShowPopup] = useState(false); // State to determine whether to show the popup or not

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/all-jobs', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setJobPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle click on a job post and show the popup
  const handleJobPostClick = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='MainJobPost'>
      <SmallNavbar/>
      <div className="job-post-container">
        {jobPosts.length === 0 ? (
          <p className="loading-message">Loading job posts...</p>
        ) : (
          jobPosts.map((job, index) => (
            <div
              className="job-card"
              key={index}
              onClick={() => handleJobPostClick(job)} // Attach click event
            >
              <div className="company-info">
                {job.CompanyImage && (
                  <img
                    src={`data:${job.CompanyImage.contentType};base64,${job.CompanyImage.data}`}
                    alt={`Logo for ${job.companyName}`}
                    className="company-icon"
                  />
                )}
                <h2>{job.companyName}</h2>
                <p className="industry">{job.industry}</p>
              </div>
              <div className="job-details">
                <h3>{job.title}</h3>
                <p className="duration">{job.duration}</p>
                <p className="salary">{job.salary}</p>
              </div>
              <p className="job-description">{job.description}</p>
              
            </div>
          ))
        )}
      </div>
      {showPopup && selectedJob && ( // Show the popup only when showPopup is true and a job post is selected
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
            <h2>{selectedJob.companyName}</h2>
            <p className="industry">{selectedJob.industry}</p>
            <h3>{selectedJob.title}</h3>
            <p className="duration">{selectedJob.duration}</p>
            <p className="salary">{selectedJob.salary}</p>
            <p className="job-description">{selectedJob.description}</p>
            <button className="apply-button">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobPost;
