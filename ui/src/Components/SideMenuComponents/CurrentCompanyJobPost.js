import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import './CurrentCompanyJobPost.css';

function CurrentCompanyJobPost() {
  const [jobPosts, setJobPosts] = useState([]); // Initialize with an empty array

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
      console.log(jobPosts);
    } catch (error) {
      console.error(error);
    }
  };

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
            <p>Skills: {job.skills},</p>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default CurrentCompanyJobPost;
