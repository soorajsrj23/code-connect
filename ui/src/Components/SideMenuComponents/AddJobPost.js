import React, { useState } from 'react';
import './AddJobPost.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    qualifications: '',
    location: '',
    skills: '',
    employmentType: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new post
      const response = await axios.post('http://localhost:4000/add-job-post', formData, {
        headers: {
          Authorization: localStorage.getItem('token'), // Send the JWT token for authentication
        },
      });
      console.log(response.data);
      toast.success('added new job post');

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='parent-add-job-post'>
      <h1 className='job-post-heading'>Post a job</h1>
      <form onSubmit={handleSubmit} className='add-job-post-form'>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="fields"
          />
        </label>
        <br />

        <label>
          Description:
          <br/>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='dark-textarea'
          />
        </label>
        <br />

        <label>
          Salary:
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="fields"
          />
        </label>
        <br />

        <label>
          Qualifications:
          <br/>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className='dark-textarea'
          />
        </label>
        <br />

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="fields"
          />
        </label>
        <br />

        <label>
          Skills:
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="fields"
          />
        </label>
        <br />

        <label>
          Employment Type:
          <input
            type="text"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="fields"
          />
        </label>
        <br />

        <label>
          Experience:
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="fields"
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SimpleForm;
