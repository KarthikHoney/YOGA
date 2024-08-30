import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDetails({ studentId }) {
  const [StudentData, setStudentData] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost/CURD/studentdetails.php?id=${studentId}`)
      .then((response) => {
        if (response.data.error) {
          console.error("Error:", response.data.error);
          alert("Failed to fetch data");
        } else {
          // Ensure the data is an array
          const data = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setStudentData(data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch data");
      });
  };

  if (StudentData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="ht_btn" onClick={logout}>
          Logout
        </button>
      </div>
      <h1 className="text-center">Student Details</h1>
      <div>
        <ul>
          {StudentData.length > 0 ? (
            StudentData.map((eachStudent) => (
              <div className="border-table  d-block ms-auto me-auto">
                <table className="mt-5 table-fill">
                  <tr>
                    <th>Name</th>
                    <td>{eachStudent.name}</td>
                  </tr>
                  <tr>
                    <th>Parent's Name</th>
                    <td>{eachStudent.parentname}</td>
                  </tr>
                  <tr>
                    <th>Gmail</th>
                    <td>{eachStudent.gmail}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{eachStudent.number}</td>
                  </tr>
                  <tr>
                    <th>WhatsApp Number</th>
                    <td>{eachStudent.wnumber}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{eachStudent.address}</td>
                  </tr>
                </table>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
