import React, { useEffect, useState } from 'react';
import './JobPost.css';
import SmallNavbar from '../Navbar/SmallNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import DaysDifference from '../CustomComponents/DayDifference';
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


  const applyForJob = async (IdOfApplicant,company_name,job_roll) => {
    const jobId = IdOfApplicant;
    const companyName=company_name;
    const jobRoll=job_roll;
    console.log("jobId" + jobId);
    try {
      // Send a POST request to create a new post
      const response = await axios.post(
        'http://localhost:4000/selected-job',
        { jobId,companyName,jobRoll }, // Send the jobId as an object in the request body
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
              
                <h3 className='designation'>{job.title}</h3>
                <div className='location'>
                <i class="bi bi-geo-alt-fill"></i> 
                <p>{job.location}</p>   
                </div>  
                <div className='applicants'>
                <i class="bi bi-people-fill"></i>
                <p>{job.applicantId.length} has applied for this job</p> 
                </div> 
                <div className='applicants'>
                <i class="bi bi-calendar2-week-fill"></i>
                <p>posted</p> 
                <DaysDifference appliedAt={job.createdAt}/>
                </div> 
              </div>           
            </div>
          ))
        )}
      </div>
      {showPopup && selectedJob && ( 
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
            
            <div className='group'>
            <i class="bi bi-briefcase-fill"></i>
            <h4 className='job-title-pop-up'>{selectedJob.title}</h4>
            </div>
            <div className='group'>
            <i class="bi bi-building"></i>
            <p>{selectedJob.companyName}</p>
            </div>
            <div className='group'>
            <i class="bi bi-clock-fill"></i>
            <p className="duration">{selectedJob.employmentType}</p>
            </div>
            <div className='group'>
            <i class="bi bi-wallet2"></i>
            <p className="salary">{selectedJob.salary}</p>
            </div>
            <div className='group'>
            <i class="bi bi-mortarboard-fill"></i>
            <p className="salary">{selectedJob.qualifications}</p>
            </div>
            <div className='group'>
            <i class="bi bi-clipboard2-data-fill"></i>
            <p className="salary">{selectedJob.skills}</p>
            </div>
            <div className='group'>
            <i class="bi bi-info-square-fill"></i>
            <p className='duty'>Description</p>      
            </div>
            <p className="job-description">{selectedJob.description}</p>

            <button className="apply-button"  onClick={() => applyForJob(selectedJob._id,selectedJob.companyName,selectedJob.title)} >Apply</button>

          </div>
        </div>
      )}
    </div>
  );
}

export default JobPost;
