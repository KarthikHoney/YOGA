import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard({ studentName, studentId }) {
  const [totalGrade, setTotalGrade] = useState("");
  const [notApplied, setNotApplied] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchTotalGrade = async () => {
      try {
        const response = await fetch(
          "http://localhost/newyoga/studentDashboard.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "Application.json",
            },
            body: JSON.stringify({ studentId }),
          }
        );
        const data = await response.json();
        if (data.status === 1) {
          setTotalGrade(data.total_grade);
          setNotApplied(12 - data.total_grade);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchTotalGrade();
  }, [studentId]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-5">
        <h2>Welcome {studentName}</h2>
        <div>
          <a>
            <FaUser className="user-icon me-2" />
          </a>
          <a onClick={logout}>
            <CiLogout className="user-icon" />
          </a>
        </div>
      </div>
      <div className="dashboard-box">
        <div className="total-members">
          <h3>Total Grade</h3>
          <h1 className="num-text">12</h1>
        </div>
        <div className="total-members">
          <h3>Applied Grade</h3>
          <h1 className="num-text">{totalGrade}</h1>
        </div>
        <div className="total-members">
          <h3>Not Applied Grade</h3>
          <h1 className="num-text">{notApplied}</h1>
        </div>
      </div>
    </div>
  );
}
