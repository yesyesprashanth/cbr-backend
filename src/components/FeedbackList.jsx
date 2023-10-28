import React, { useEffect, useState } from 'react';
import styles from './FeedbackList.module.css';
import { server_ip_with_port } from '../utils/server-ip';

const FeedbackList = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the API endpoint
    fetch(server_ip_with_port + '/feedback/getfeedback')
      .then((response) => response.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error('Error fetching feedback data:', error));
  }, []);

  return (
    <div className={styles.container}>
    <h2>Write to us List</h2>
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Subject</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {feedbackData.map((feedback, index) => (
          <tr key={index}>
            <td>{feedback.emailid}</td>
            <td>{feedback.name}</td>
            <td>{feedback.subject}</td>
            <td>{feedback.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default FeedbackList;
