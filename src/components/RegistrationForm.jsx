import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';
import { server_ip_with_port } from '../utils/server-ip';

const RegistrationForm = () => {

  const initialData = {
    name: '',
    role: 'student', // Default to 'student'
    organization: '',
    emailid: '',
  }

  const [formData, setFormData] = useState(initialData);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    console.log(formData);
    const { name, organization, emailid } = formData;        
    if (!name || !organization || !emailid) {
      setError('All fields are mandatory');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    console.log(formData);
    try {
      // Send a POST request to your API with formData
      const response = await fetch(server_ip_with_port + '/registration/userregistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (response.ok) {        
        const result = await response.json();
        setError(result);
      } else {        
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while processing your request.', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div>
          <label>Organization:</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
