import React, { useState } from 'react';
import styles from './ManuscriptUpload.module.css';

function ManuscriptUpload() {
  const [email, setEmail] = useState('');
  const [abstract, setAbstract] = useState(null);
  const [plagiarismReport, setPlagiarismReport] = useState(null);
  const [fullPaper, setFullPaper] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitAbstract = async () => {
    const formData = new FormData();
    formData.append('emailid', email);
    formData.append('file', abstract);

    console.log(email, abstract);

    try {
      const response = await fetch('http://localhost:3005/manuscript/postabstract', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseMessage = await response.json();
        console.log(responseMessage);
      } else {
        console.error('Failed to submit abstract');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSubmitFullPaper = async () => {
    const formData = new FormData();
    formData.append('emailid', email);
    formData.append('plagiarismReport', plagiarismReport);
    formData.append('fullPaper', fullPaper);

    try {
      const response = await fetch('http://localhost:3005/manuscript/postfullpaper', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseMessage = await response.json();
        console.log(responseMessage);
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
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
  </div>
  );
}

export default ManuscriptUpload;
