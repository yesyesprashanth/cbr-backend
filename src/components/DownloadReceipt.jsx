import React from 'react';
import axios from 'axios';

const DownloadReceipt = () => {
  const downloadReceipt = async () => {
    try {
      const response = await axios.get('http://localhost:3005/payment/readreceipt', {
        responseType: 'blob',
      });

      // Create a blob object from the response data with the 'application/msword' MIME type
      console.log("response_blob", response.data)
      const blob = new Blob([response.data]); 

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an <a> element for downloading the file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receipt.docx'; // Set the desired file name and extension (docx)

      // Programmatically trigger the download
      a.click();

      // Revoke the object URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };

  return (
    <div>
      <h2>Download Receipt</h2>
      <button onClick={downloadReceipt}>Download Receipt</button>     
    </div>
  );
};

export default DownloadReceipt;
