import React, { useState, useEffect } from 'react';
import styles from './UserList.module.css';
import axios from 'axios';

function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3005/registration/getuserlist')
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2>User List</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Organisation</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td>{user.emailid}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.organisation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
