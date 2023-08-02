import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPostedJobs.css'
import { toast } from 'react-toastify';
const EditPostedjob = () => {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch jobs from MongoDB on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:4000/job-posts', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (job) => {
    setEditJob(job);
    setIsPopupOpen(true);
  };

  const handleSave = async () => {
    try {
      // Ensure that the editJob contains a valid _id field
      if (!editJob || !editJob._id) {
        console.error('Invalid _id for job:', editJob);
        return;
      }

      // Call your backend API here to save the updated job
      await axios.put(`http://localhost:4000/api/jobs/${editJob._id}`, editJob);
      setIsPopupOpen(false);
      setEditJob(null);
      toast.success("Updated");
      fetchJobs(); // Refresh the job list after saving
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error(error.message);
    }
  };


  const handleDelete = async (job) => {
   
    try {
      if (!job || !job._id) {
        console.error('Invalid _id for job:', job);
        return;
      }

      console.log(job)
      await axios.delete(`http://localhost:4000/api/jobs/${job._id}`);
      toast.success("deleted")
      fetchJobs(); // Refresh the job list after deleting
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  return (
    <div className="edit-posted-jobs-container">
    <table className="main-table">
      <thead>
        <tr>
          <th>Job Post</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job._id.$oid}>
            <td>{job.title}</td>
            <td>{new Date(job.createdAt).toLocaleDateString()}</td>
            <td>
              <button className="edit-button" onClick={() => handleEditClick(job)}>
                Edit
              </button>
            </td>
            <td>
              <button className="delete-button" onClick={() => handleDelete(job)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {isPopupOpen && (
      <div className="popup-container">
        <div className="popup">
          {editJob && (
            <div>
              <h2>Edit Job Details</h2>
              <label>
                Company Name:
                <input
                  type="text"
                  name="companyName"
                  value={editJob.companyName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Title:
                <input type="text" name="title" value={editJob.title} onChange={handleChange} />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={editJob.description}
                  onChange={handleChange}
                />
              </label>
              <label>
                Salary:
                <input type="text" name="salary" value={editJob.salary} onChange={handleChange} />
              </label>
              <label>
                Qualifications:
                <input
                  type="text"
                  name="qualifications"
                  value={editJob.qualifications}
                  onChange={handleChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={editJob.location}
                  onChange={handleChange}
                />
              </label>
              <label>
                Skills:
                <input type="text" name="skills" value={editJob.skills} onChange={handleChange} />
              </label>
              {/* Add additional input fields for editing */}
              <div className="buttons-container">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={() => setIsPopupOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
  );
};

export default EditPostedjob;
