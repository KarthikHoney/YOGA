import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function TrainerPage({trainerName,trainerId}) {
  const [studentCount,setStudentCount]=useState(0)
  const navigate = useNavigate();
    const logout = () =>{
        navigate('/')
    }

    useEffect(()=>{
      axios.post('http://localhost/newyoga/trainerDashboard.php',{trainerId})
      .then((res)=>{
          if(res.data.total_Students){
            setStudentCount(res.data.total_Students)
          }
      }).catch((error)=>{
        console.log('error:',error);
      })
  },[trainerId])
  return (
    <div>
      <div className='d-flex justify-content-between mb-5'>
        <h2>Welcome {trainerName}</h2>
        <div>
          <a ><FaUser className='user-icon me-2' /></a>
          <a  onClick={logout}><CiLogout className='user-icon' /></a>
        </div>
      </div>
      <div className='dashboard-box'>
        <div className='total-members'>
          <h3>Total Student</h3>
          <h1 className='num-text'>{studentCount}</h1>
        </div>
        <div className='total-members'>
          <h3>Applied Grade</h3>
          <h1 className='num-text'>4</h1>
        </div>
        <div className='total-members'>
          <h3>Not Applied Grade</h3>
          <h1 className='num-text'>7</h1>
        </div>
      </div>
    </div>
  )
}