import React, { useEffect, useState } from 'react';
import './JobPost.css';
import SmallNavbar from '../Navbar/SmallNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';
function JobPost() {
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State to keep track of the selected job post
  const [showPopup, setShowPopup] = useState(false); // State to determine whether to show the popup or not

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/all-jobs' );
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


  const applyForJob = async (IdOfApplicant) => {
    const jobId = IdOfApplicant;
    console.log("jobId" + jobId);
    try {
      // Send a POST request to create a new post
      const response = await axios.post(
        'http://localhost:4000/selected-job',
        { jobId }, // Send the jobId as an object in the request body
        {
          headers: {
            Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
          },
        }
      );
      console.log(response.data);
      toast.info("Applied")
    } catch (error) {
      if (error.response && error.response.status === 400) {
       
        const errorMessage = error.response.data.error;
        console.log('Error:', errorMessage);
        toast.error(errorMessage);
      } else {
        console.log('Error:', error.message);
      }
    }
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
              </div>
              <div className="job-details">
              
                <h3>{job.title}</h3>
                <div className='location'>
                <i class="bi bi-geo-alt-fill"></i> 
                <p>{job.location}</p>   
                </div>   
              </div>           
            </div>
          ))
        )}
      </div>
      {showPopup && selectedJob && ( // Show the popup only when showPopup is true and a job post is selected
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
             <div className='group'>
            <i class="bi bi-building"></i>
            <h3>{selectedJob.companyName}</h3>
            </div>
            <div className='group'>
            <i class="bi bi-briefcase-fill"></i>
            <h4>{selectedJob.title}</h4>
            </div>
            <div className='group'>
            <i class="bi bi-clock-fill"></i>
            <p className="duration">{selectedJob.duration}</p>
            </div>
            <div className='group'>
            <i class="bi bi-wallet2"></i>
            <p className="salary">{selectedJob.salary}</p>
            </div>
            <div className='group'>
            <i class="bi bi-info-square-fill"></i>
            <p className='duty'>Description</p>
            <p className="job-description">{selectedJob.description}</p>
            </div>

            <button className="apply-button"  onClick={() => applyForJob(selectedJob._id)} >Apply</button>

          </div>
        </div>
      )}
    </div>
  );
}

export default JobPost;
