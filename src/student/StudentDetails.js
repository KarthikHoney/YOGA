import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function StudentDetails() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost/CURD/studentDetails.php')
      .then((response) => {
        if (response.data.error) {
          console.error('Error:', response.data.error);
          alert('Failed to fetch data');
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to fetch data');
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Student Details</h2>
        <div>
          <a href='#'><FaUser className='user-icon me-2' /></a>
          <a href='' onClick={logout}><CiLogout className='user-icon' /></a>
        </div>
      </div>
      <div className="border-table d-block ms-auto me-auto">
        <table className='mt-5 table-fill'>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Parent's Name</th>
              <td>{data.parentname}</td>
            </tr>
            <tr>
              <th>Gmail</th>
              <td>{data.gmail}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{data.number}</td>
            </tr>
            <tr>
              <th>WhatsApp Number</th>
              <td>{data.wnumber}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{data.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
