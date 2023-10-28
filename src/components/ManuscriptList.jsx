import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManuscriptList.module.css'
import { server_ip_with_port } from '../utils/server-ip';

function ManuscriptList() {
  const [manuscriptData, setManuscriptData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get(server_ip_with_port + '/manuscript/getmanuscriptlist')
      .then((response) => {     
        console.log(response.data);
        if(Array.isArray(response.data))
          setManuscriptData(response.data);
        else 
          console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching manuscript data:', error);
      });
  }, []);

  const handleDownload = async (email, filename, fieldName) => {
    try {
      // Send a request to download the manuscript file
      const response = await axios.get(server_ip_with_port + `/manuscript/downloadmanuscript?emailid=${email}&fieldname=${fieldName}`, {
        responseType: 'blob',
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data]);

      // Trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Error downloading manuscript:', error);
    }
  };

  return (
<div className={styles.container}>
      <h2>Manuscript List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>absctract</th>
            <th>plagiarism report</th>
            <th>full paper</th>
          </tr>
        </thead>
        <tbody>
          { manuscriptData && manuscriptData.length > 0 ?          
              (manuscriptData.map((row, index) => (
                <tr key={index}>
                  <td>{row.emailid}</td>
                  <td>
                    {row.filename1 && (
                      <button onClick={() => handleDownload(row.emailid, row.filename1, "abstractpaper")}>
                        Download
                      </button>
                    )}
                  </td>
                  <td>
                    {row.filename2 && (
                      <button onClick={() => handleDownload(row.emailid, row.filename2, "plagiarismreport")}>
                        Download
                      </button>
                    )}
                  </td>
                  <td>
                    {row.filename3 && (
                      <button onClick={() => handleDownload(row.emailid, row.filename3, "fullpaper")}>
                        Download
                      </button>
                    )}
                  </td>
                </tr>
                ))
              ):(
                <tr>
                  <td colSpan={4}>No data available</td>
                </tr>
              )      
        }
        </tbody>
      </table>
    </div>
  );
}

export default ManuscriptList;
