import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import './CurrentCompanyJobPost.css';

function CurrentCompanyJobPost() {
  const [jobPosts, setJobPosts] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});

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

  return (
    <Container fluid>
      {jobPosts.map((job) => (
        <div key={job._id} className="job-post">
          <h2 className="job-title">{job.title}</h2>
          <p className="job-description">{job.description}</p>
          <div className="job-details">
            <p>Salary: {job.salary}</p>
            <p>Qualifications: {job.qualifications}</p>
            <p>Location: {job.location}</p>
            <p>Skills: {job.skills}</p>
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
                        />
                      )}
                    </Col>
                    <Col sm="8">
                      <h3>Name: {userDetails.name}</h3>
                      <p>Bio: {userDetails.bio}</p>
                      <p>Phone: {userDetails.phone}</p>
                      <p>Email: {userDetails.email}</p>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </Container>
  );
}

export default CurrentCompanyJobPost;
