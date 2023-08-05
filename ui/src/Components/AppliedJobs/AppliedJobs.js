import React, { useState, useEffect,useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './AppliedJobs.css';
import axios from 'axios';
import SmallNavbar from '../Navbar/SmallNavbar'
import TimeLine from './TimeLine';

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
  const getDaysDifference = (appliedAt) => {
    const appliedDate = new Date(appliedAt);
    const currentDate = new Date();
  
    // Ignore the time of the day by setting hours, minutes, seconds, and milliseconds to 0
    appliedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    // Calculate the difference in days
    const differenceInTime = currentDate.getTime() - appliedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
    return differenceInDays;
  };
  

  return (
    <Container fluid className='ParentAppliedJob'>
      <SmallNavbar/>
      <h1 className="page-title">Applied Jobs</h1>
      <Row className="applied-jobs-container">
        {AppliedJobPosts.map((job) => (
          <Col key={job._id} xs="12" sm="6" lg="8" md="6" className="applied-job">
            <div className="company-info">
            <img
                    src={`data:${job.CompanyImage.contentType};base64,${job.CompanyImage.data}`}
                    alt={`Logo for ${job.companyName}`}
                    className="company-icon"
                  />
              <h3 className='company_Name'>{job.companyName}</h3>
              
            </div>
            <div className="job-details">
            <div className='group'>
            <i class="bi bi-briefcase-fill"></i>
            <h4>{job.title}</h4>
            </div>
            <div className='group'>
            <i class="bi bi-clock-fill"></i>
            <p className="duration">{job.employmentType}</p>
            </div>
            <div className='group'>
            <i class="bi bi-wallet2"></i>
            <p className="salary">{job.salary}</p>
            </div>
            <br/>
            <div>
            <h5 className='duty'>Description</h5>
            <p>{job.description}</p>
            </div>
              <p>job posted at : {new Date(job.createdAt).toLocaleDateString()}</p>
              <div>
 
    <div >
      <div className='start_point'>
   <p> you Applied for this {getDaysDifference(job.appliedAt)} days ago</p> 
   </div>
   <p>Application send on {new Date(job.appliedAt).toLocaleDateString() }</p>
   <TimeLine applicantInfo={job.applicantId} />
     <div className={`applicant-status ${job.jobStatus.toLowerCase()}`}>
      {job.jobStatus === 'New' ? ' Applied ' : <p>{job.jobStatus}</p>}
     
</div>

    </div>
 
</div>
<div>
</div>
             
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AppliedJobs;
