import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PaymentList.module.css';
import { server_ip_with_port } from '../utils/server-ip';

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    axios.get(server_ip_with_port + '/payment/getpaymentlist')
      .then((response) => {    
        if(Array.isArray(response.data))
        setPaymentList(response.data);
        else 
          console.log(response.data);             
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, []);

  const downloadReceipt = async(emailid, filename) => {
    console.log(emailid);
    try {
      const response = await axios.get(server_ip_with_port + `/payment/downloadreceipt?emailid=${emailid}`, {
        responseType: 'blob',        
      });

      const blob = new Blob([response.data]); 

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an <a> element for downloading the file
      const a = document.createElement('a');
      a.href = url;

      const newFilename = "file." + filename.split('.')[1];
    
      a.download = newFilename; 

      // Programmatically trigger the download
      a.click();

      // Revoke the object URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  }


  return (
    <div className={styles.container}>
      <h2>Payment List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>UID</th>
            <th>filename</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentList.map((payment, index) => (
            <tr key={index}>
              <td>{payment.emailid}</td>
              <td>{payment.uid}</td>
              <td>{payment.filename}</td>
              <td>
                <button onClick={() => downloadReceipt(payment.emailid, payment.filename)}>
                  Download Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default PaymentList;
