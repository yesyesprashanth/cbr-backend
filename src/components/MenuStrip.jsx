import React, { useState } from 'react';
import styles from './MenuStrip.module.css';

function MenuStrip({ onMenuItemClick }) {
  return (
    <div className={styles.MenuStrip}>
      <ul>
        <li onClick={() => onMenuItemClick('RegistrationForm')}>Registration Form</li>
        <li onClick={() => onMenuItemClick('UploadPayment')}>Upload Payment</li>
        <li onClick={() => onMenuItemClick('ManuscriptUpload')}>Manuscript Upload</li>
        <li onClick={() => onMenuItemClick('WriteUs')}>Write Us</li>
        <li onClick={() => onMenuItemClick('FeedbackList')}>Write To Us List</li>
        <li onClick={() => onMenuItemClick('PaymentList')}>Payment List</li>       
        <li onClick={() => onMenuItemClick('ManuscriptList')}>Manuscript List</li>
        <li onClick={() => onMenuItemClick('UserList')}>User List</li>
      </ul>
    </div>
  );
}

export default MenuStrip;
