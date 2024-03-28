import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLogin } from './LoginContext'; // Import useLogin hook

const Myaccount = () => {
  const { loggedIn } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate();
  const [userType, setUserType] = useState('standard');
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      // Fetch userType only if loggedIn is true
      getUserType();
    }
  }, [loggedIn]);

  const getUserType = async () => {
    try {
      const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
      const response = await fetch(`http://localhost:8000/userType/${loggedInUserEmail}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user type: ${response.statusText}`);
      }
      const data = await response.json();
      setUserType(data.userType);
    } catch (error) {
      console.error('Error fetching user type:', error);
    }
  };

  useEffect(() => {
    const loggedInUseremail = localStorage.getItem('loggedInUserEmail');
    if (!loggedInUseremail) {
      // If loggedInUseremail is not found, redirect to login page
      navigate('/login');
    } else {
      // Fetch memberships using the loggedInUseremail from the server
      axios.get(`http://localhost:8000/memberships/${loggedInUseremail}`)
        .then(response => {
          // Sort memberships based on purchase date in ascending order
          const sortedMemberships = response.data.memberships.sort((a, b) => {
            return new Date(a.purchasedate) - new Date(b.purchasedate);
          });
          // Update memberships state with the sorted data
          setMemberships(sortedMemberships);
        })
        .catch(error => {
          console.error('Error fetching memberships:', error);
        });
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <h1>Hey, you have successfully accessed your account</h1>
      {userType === 'admin' && (
        <>
          <Link to='/adddropvolunteer'>Add/Drop Volunteer</Link>
          <br />
          <Link to='/scanner'>Scanner</Link>
        </>
      )}
      {userType === 'volunteer' && (
        <Link to='/scanner'>Scanner</Link>
      )}
      <h2>Your Memberships:</h2>
      <table>
        <thead>
          <tr>
            <th>Membership Type</th>
            <th>Purchase Date</th>
            <th>Validity Date</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((membership, index) => (
            <tr key={index}>
              <td>{membership.memtype}</td>
              <td>{new Date(membership.purchasedate).toLocaleDateString()}</td>
              <td>{new Date(membership.validitydate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Myaccount;
