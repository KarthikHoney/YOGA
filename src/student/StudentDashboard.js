import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard({ studentName }) { 
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
  };

  return (
    <div>
      <div className='d-flex justify-content-between mb-5'>
        <h2>Welcome {studentName}</h2> 
        <div>
          <a ><FaUser className='user-icon me-2' /></a>
          <a  onClick={logout}><CiLogout className='user-icon' /></a>
        </div>
      </div>
      <div className='dashboard-box'>
        <div className='total-members'>
          <h3>Total Grade</h3>
          <h1 className='num-text'>12</h1>
        </div>
        <div className='total-members'>
          <h3>Applied Grade</h3>
          <h1 className='num-text'>6</h1>
        </div>
        <div className='total-members'>
          <h3>Not Applied Grade</h3>
          <h1 className='num-text'>7</h1>
        </div>
      </div>
    </div>
  );
}
