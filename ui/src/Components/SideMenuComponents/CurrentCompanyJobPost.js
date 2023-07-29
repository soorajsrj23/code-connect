import React, { useEffect, useState } from 'react';
import {  Col, Container, Row } from 'reactstrap';
import './CurrentCompanyJobPost.css';

function CurrentCompanyJobPost() {
  const [jobPosts, setJobPosts] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('New'); // Set the default status to "New"
 
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
 

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/job-posts', {
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

  const fetchUserDetails = async (developerId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${developerId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserDetailsForApplicants = async () => {
      const userDetails = {};
      for (const job of jobPosts) {
        for (const developerInfo of job.applicantId) {
          const data = await fetchUserDetails(developerInfo.developerId);
          if (data) {
            userDetails[developerInfo.developerId] = data;
          }
        }
      }
      setUserDetailsMap(userDetails);
    };

    fetchUserDetailsForApplicants();
  }, [jobPosts]);

  const getDaysDifference = (appliedAt) => {
    const appliedDate = new Date(appliedAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - appliedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const updateJobStatus = async (applicantId,selectedTitle,desc) => {
    const description=desc;
    try {
      const response = await fetch(`http://localhost:4000/update-job-status/${applicantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ status: selectedStatus, title: selectedTitle,description:description }), // Send both status and title
      });
      const data = await response.json();
      console.log(data); // You can log the response for debugging or feedback purposes
      // Refresh the job posts after updating status
      fetchJobPosts();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Container fluid>
      {jobPosts.map((job) => (
        <div key={job._id} className="job-post">
          <h2 className="job-section-title">Job Details</h2>
          <div className='job-info'>
            <i class="bi bi-person-badge-fill"></i>
          <h4 className="job-title">{job.title}</h4>
          </div>
          <div className="job-details">
            <p>
              <span className="detail-label">Salary:</span> {job.salary}
            </p>
            <p>
              <span className="detail-label">Qualifications:</span> {job.qualifications}
            </p>
            <p>
              <span className="detail-label">Location:</span> {job.location}
            </p>
            <p>
              <span className="detail-label">Experience:</span> {job.experience}
            </p>
            <p>
              <span className="detail-label">Employment Type:</span> {job.employmentType}
            </p>
            <p>
              <span className="detail-label">Skills:</span> {job.skills}
            </p>
            <p>
              <span className="detail-label">Description:</span> {job.description}
            </p>
            <p>
              <span className="detail-label">Posted At</span> {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="applicant_info">
            <h1>Applicants</h1>
            {job.applicantId.map((developerInfo) => {
              const userDetails = userDetailsMap[developerInfo.developerId] || {};
              return (
                <div key={developerInfo.developerId} className="applicant">
                  <Row className="userInfo">
                    <Col sm="4">
                      {userDetails.image && (
                        <img
                          src={`data:${userDetails.image.contentType};base64,${btoa(
                            new Uint8Array(userDetails.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ''
                            )
                          )}`}
                          alt="Applicant"
                          className="Applicant-image"
                        />
                      )}
                    </Col>
                    <Col sm="8">
                      <h3>{userDetails.name}</h3>
                      <p className="user-bio">{userDetails.bio}</p>
                      <p>
                        <span className="contact-label">Phone:</span> {userDetails.phone}
                      </p>
                      <p>
                        <span className="contact-label">Email:</span> {userDetails.email}
                      </p>
                    </Col>
                    
                  </Row>
                </div>
              );
            })}
          </div>

          <div>

          {job.applicantId.map((applicantInfo) => (
    <div key={applicantInfo._id}>
     Applied {getDaysDifference(applicantInfo.appliedAt)} days ago
     <p>Status:{applicantInfo.jobStatus}</p>

     <div>
      <label htmlFor="status">Set Status:</label>
      <div className="custom-select-wrapper">
                      <select id="status" value={selectedStatus} onChange={handleStatusChange}>
                        <option value="New">New</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview-Scheduled">Interview Scheduled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
      <button  type="button" class="btn btn-outline-secondary btn-md" onClick={() => {   updateJobStatus(applicantInfo.developerId,job.title,job.description); }} > Set Status </button>
    </div>


    </div>
  ))}

            
          </div>
        </div>
      ))}
    </Container>
  );
}

export default CurrentCompanyJobPost;
