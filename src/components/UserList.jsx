import React, { useState, useEffect } from 'react';
import styles from './UserList.module.css';
import axios from 'axios';
import { server_ip_with_port } from '../utils/server-ip';


function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    
    // Fetch data from the API
    axios.get(server_ip_with_port +'/registration/getuserlist')
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
          {userList && userList.length > 0 ? (
            userList.map((user, index) => (
              <tr key={index}>
                <td>{user.emailid}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.organisation}</td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>  
            )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
