import React, { useState } from 'react';
import styles from './ManuscriptUpload.module.css';
import { server_ip_with_port } from '../utils/server-ip';

function ManuscriptUpload() {
  const [emailid, setEmailid] = useState('');
  const [abstract, setAbstract] = useState(null);
  const [plagiarismReport, setPlagiarismReport] = useState(null);
  const [fullPaper, setFullPaper] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitAbstract = async () => {

    if(emailid==='' || abstract===null) {
      setResponseMessage('Please fill in email and select a file for abstract.');
      return;
    }

    const formData = new FormData();
    formData.append('emailid', emailid);
    formData.append('file', abstract);
   
    try {
      const response = await fetch(server_ip_with_port + '/manuscript/postabstract', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseMessage = await response.json();
        setResponseMessage(responseMessage);
      } else {
        console.error('Failed to submit abstract');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSubmitFullPaper = async () => {

    if(emailid==='' || plagiarismReport===null || fullPaper===null) {
      setResponseMessage('Please fill in email and select a file for plagiarism report and full paper.');
      return;
    }

    const formData = new FormData();
    formData.append('emailid', emailid);
    formData.append('plagiarismReport', plagiarismReport);
    formData.append('fullPaper', fullPaper);

    try {
      const response = await fetch(server_ip_with_port + '/manuscript/postfullpaper', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseMessage = await response.json();
        setResponseMessage(responseMessage);
      } else {
        console.error('Failed to submit full paper');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className={styles.container}>
    <h2>Manuscript Upload</h2>
    <div>
      <label>Email:</label>
      <input type="email" value={emailid} onChange={(e) => setEmailid(e.target.value)} />
    </div>
    <div>
      <label>Abstract:</label>
      <input type="file" onChange={(e) => handleFileChange(e, setAbstract)} />
    </div>
    <button onClick={handleSubmitAbstract}>Submit Abstract</button>
    <div>
      <label>Plagiarism Report:</label>
      <input type="file" onChange={(e) => handleFileChange(e, setPlagiarismReport)} />
    </div>
    <div>
      <label>Full Paper:</label>
      <input type="file" onChange={(e) => handleFileChange(e, setFullPaper)} />
    </div>
    <button onClick={handleSubmitFullPaper}>Submit Full Paper</button>
    {responseMessage && <p>{responseMessage}</p>}
  </div>
  );
}

export default ManuscriptUpload;
