import React, { useState } from 'react';
import styles from './WriteUs.module.css';
import { server_ip_with_port } from '../utils/server-ip';

const WriteUs = () => {

    const initialData = {
        name: '',
        emailid: '',
        subject: '',
        message: '',
      }

  const [formData, setFormData] = useState(initialData);
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {    
      const response = await fetch(server_ip_with_port + '/feedback/postfeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();  
        setResponse(data);
        setFormData(initialData);
      } else {
        setResponse('Error submitting feedback');
      }
    } catch (error) {
      console.log(error);
      setResponse('Error submitting feedback');
      
    }
  };

  

  return (
    <div className={styles.container}>
      <h1>Write to Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="emailid"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default WriteUs;
