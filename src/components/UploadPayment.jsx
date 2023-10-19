import React, { useState } from 'react';
import styles from './UploadPayment.module.css';

function UploadPayment() {
  const [emailid, setEmailId] = useState('');
  const [UID, setUID] = useState('');
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation (you can add more validation logic)
    if (!emailid || !UID || !file) {
      setResponseMessage('Please fill in all fields and select a file.');
        return;
    }

    // Create a FormData object to send the data and file to the server
    const formData = new FormData();
    formData.append('emailid', emailid);
    formData.append('UID', UID);
    formData.append('file', file);

     try {
      const response = await fetch('http://localhost:3005/payment/postpayment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data);
      } else {
        setResponseMessage('Error while uploading payment details.');
      }
    } catch (error) {
      console.log(error);
      setResponseMessage('An error occurred. Please try again.');
    }

    // If everything is valid, you can proceed with form submission
    setIsSubmitting(true);

    // Example: Simulating a form submission (remove this in your actual code)
    setTimeout(() => {
      setIsSubmitting(false);
      setResponseMessage('Payment uploaded successfully!');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h1>Upload Payment</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email ID:</label>
          <input type="email" value={emailid} onChange={(e) => setEmailId(e.target.value)} />
        </div>
        <div>
          <label>UID:</label>
          <input type="text" value={UID} onChange={(e) => setUID(e.target.value)} />
        </div>
        <div>
          <label>Receipt:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default UploadPayment;
