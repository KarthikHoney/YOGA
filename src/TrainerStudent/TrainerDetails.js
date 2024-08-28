import React from 'react'
import { Table } from 'react-bootstrap'
import { CiLogout } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function TrainerDetails() {
  const navigate = useNavigate();
    const logout = () =>{
        navigate('/')
    }
  return (
    <div>
      <div className='d-flex justify-content-between mb-5'>
        <h2>Trainer Details</h2>
        <div>
          <a href='#' ><FaUser className='user-icon me-2' /></a>
          <a href='' onClick={logout}><CiLogout className='user-icon' /></a>
        </div>
      </div>
      <Table className='mt-5'>
        <tr>
          <th>Name</th>
          <td>Madhan</td>
        </tr>
        <tr>
          <th>Studio Name</th>
          <td>Legends Studio</td>
        </tr>
        <tr>
          <th>Gmail</th>
          <td>madhan@gmail.com</td>
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
          <td>Chennai</td>
        </tr>
      </Table>
    </div>
  )
}
