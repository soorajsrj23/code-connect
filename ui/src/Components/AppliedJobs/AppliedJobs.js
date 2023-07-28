import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './AppliedJobs.css';
import axios from 'axios';
import SmallNavbar from '../Navbar/SmallNavbar'

function AppliedJobs() {
  const [AppliedJobPosts, setAppliedJobPosts] = useState([]);

  useEffect(() => {
    fetchAppliedJobPosts();
  }, []);

  const fetchAppliedJobPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/get-applied-job-by-developer', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

        // If the API call is successful, set the data to the state
        setAppliedJobPosts(response.data);
        console.log("data fetched successfully"+response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid className='ParentAppliedJob'>
      <SmallNavbar/>
      <h1 className="page-title">Applied Jobs</h1>
      <Row className="applied-jobs-container">
        {AppliedJobPosts.map((job) => (
          <Col key={job._id} xs="12" sm="6" lg="5" md="6" className="applied-job">
            <div className="company-info">
            <img
                    src={`data:${job.CompanyImage.contentType};base64,${job.CompanyImage.data}`}
                    alt={`Logo for ${job.companyName}`}
                    className="company-icon"
                  />
              <h3>{job.companyName}</h3>
            </div>
            <div className="job-details">
              <h4>{job.title}</h4>
              <p>Salary: {job.salary}</p>
              <p>Location: {job.location}</p>
              <p>Date Applied: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AppliedJobs;
