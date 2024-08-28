import React from 'react'
import { CiLogout } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function StudentDetails() {
  const navigate = useNavigate();
    const logout = () =>{
        navigate('/')
    }
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Student Details</h2>
        <div>
          <a href='#' ><FaUser className='user-icon me-2' /></a>
          <a href='' onClick={logout}><CiLogout className='user-icon' /></a>
        </div>
      </div>
      <div className="border-table  d-block ms-auto me-auto">
        <table className='mt-5 table-fill'>
          <tr>
            <th>Name</th>
            <td>Prasath</td>
          </tr>
          <tr>
            <th>Parent's Name</th>
            <td>Father</td>
          </tr>
          <tr>
            <th>Gmail</th>
            <td>prasath@gmail.com</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>9123456789</td>
          </tr>
          <tr>
            <th>WhatsApp Number</th>
            <td>9123456789</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>Puducherry</td>
          </tr>
        </table>
      </div>
      
    </div>
  )
}
