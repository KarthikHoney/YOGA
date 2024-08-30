import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDetails({ studentId }) {
    const [StudentData, setStudentData] = useState([]);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(`http://localhost/CURD/studentdetails.php?id=${studentId}`)
            .then((response) => {
                if (response.data.error) {
                    console.error('Error:', response.data.error);
                    alert('Failed to fetch data');
                } else {
                    // Ensure the data is an array
                    const data = Array.isArray(response.data) ? response.data : [response.data];
                    setStudentData(data);
                    console.log(data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to fetch data');
            });
    };

    if (StudentData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='d-flex justify-content-end'>
                <button className='ht_btn' onClick={logout}>Logout</button>
            </div>
            <h1 className='text-center'>Student Details</h1>
            <div>
                <ul>
                    {StudentData.length > 0 ? (
                        StudentData.map((eachStudent) => (
                            <li style={{listStyleType:'none'}} key={eachStudent.id}>
                                <h2>{eachStudent.name || 'N/A'}</h2>
                                <p><strong>Reg ID:</strong> {eachStudent.id || 'N/A'}</p>
                                <p><strong>Father's Name:</strong> {eachStudent.parentname || 'N/A'}</p>
                                <p><strong>Phone:</strong> {eachStudent.number || 'N/A'}</p>
                                <p><strong>Grade:</strong> {eachStudent.grade || 'N/A'}</p>
                                <p><strong>Email:</strong> {eachStudent.gmail || 'N/A'}</p>
                                <p><strong>Address:</strong> {eachStudent.address || 'N/A'}</p>
                            </li>
                        ))
                    ) : (
                        <p>No students found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
