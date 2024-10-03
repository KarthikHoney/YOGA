import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function TrainerStudentGrade() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  const viewStudentGrade = ()=>{
    navigate('/student-view-trainer')
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialFormData = {
    grade: "",
    payment: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [grades, setGrades] = useState([]);
  const [gradeView,setGradeView] = useState(false)

  const paymentAmounts = {
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    6: 600,
    7: 700,
    8: 800,
    9: 900,
    10: 1000,
    11: 1100,
    12: 1200,
  };

  const location = useLocation();
  
  // Get values from location.state or localStorage
  const studentId = location.state?.studentId || localStorage.getItem("studId");
  const trainerId = location.state?.trainerId || localStorage.getItem("trainId");

  // Store in localStorage if available from location.state
  useEffect(() => {
    if (location.state?.studentId && location.state?.trainerId) {
      localStorage.setItem("studId", location.state.studentId);
      localStorage.setItem("trainId", location.state.trainerId);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "grade") {
      const payment = paymentAmounts[value] || "";
      setFormData({ ...formData, grade: value, payment: payment });
    }

    if (value) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.grade) tempErrors.grade = "Grade is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSend = {
        action: "grade",
        grade: formData.grade,
        payment: formData.payment,
        studentId: studentId,
        trainerId: trainerId,
      };
  
      axios
        .post("http://localhost/newyoga/gradeTrainer.php", dataToSend)
        .then((response) => {
          if (response.data && response.data.status === 1) {
            toast.success("Grade Applied Successfully");
            setFormData(initialFormData);
  
            const gradeData = response.data.data; 
            console.log(gradeData);
            if (gradeData) {
              setGrades((previousData) => [...previousData, gradeData]); 
              setGradeView(true);
            }
          } else {
            toast.warn("Invalid data or no data returned");
          }
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
        });
    }
  };
  
  useEffect(() => {
    if (studentId && trainerId) {
        const metaGrade ={
            action: "fetchGrades",
            studentId,
            trainerId
        }
      axios.post("http://localhost/newyoga/gradeTrainer.php",metaGrade)
      .then((response) => {
        if (response.data && response.data.status === 1) {
          setGrades(response.data.grades || []);
        } else {
          console.log("No grades found or invalid data");
        }
      })
      .catch((error) => {
        console.error("Error fetching grades:", error);
      });
    }
  }, [studentId, trainerId]);

  

  return (
    <div>
      
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Form
            autoComplete="off"
            className="add-trainer p-3"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center mb-3">Register For Student</h2>
            <div className="row">
              <div className="col-12 form-controls">
                <label htmlFor="grade">Choose Exam Grade</label>
                <select
                    id="grade"
                    className="mb-2"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    >
                    <option value="">Select Grade</option>
                      {Object.keys(paymentAmounts)
                          .filter((grade) => {
                              // Ensure 'grades' is an array and has the necessary properties before filtering
                              return grades && Array.isArray(grades) &&
                                    !grades.some((item) => item && item.grade === parseInt(grade));
                          })
                          .map((grade) => (
                          <option key={grade} value={grade}>
                              {grade}
                          </option>
                      ))}

                </select>
                {errors.grade && <div className="error">{errors.grade}</div>}
              </div>
              <div className="col-12 form-controls">
                <label htmlFor="payment">Payment Amount</label>
                <input
                  type="text"
                  id="payment"
                  name="payment"
                  className="mb-2"
                  value={formData.payment}
                  readOnly
                />
              </div>
            </div>
            <button type="submit" className="mt-3 ht_btn">
              Submit
            </button>
          </Form>
          <ToastContainer />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-between">
      <a href onClick={viewStudentGrade}>
            <FaArrowLeft className="user-icon me-2 mb-3" />
          </a>
        <h2>Your Student Grade</h2>
        <div>
          <a href>
            <FaUser className="user-icon me-2" />
          </a>
          <a href onClick={logout}>
            <CiLogout className="user-icon" />
          </a>
        </div>
      </div>
      <p className="mb-5">Your Students applied exam grade</p>
      <Button
        variant="primary shadow-none mb-4"
        onClick={handleShow}
        className="delete"
      >
        ADD GRADE
      </Button>
      <div style={{ overflowX: "scroll" }}>
        <table className="table-fill">
          <thead>
            <tr>
              <th className="text-left">S.No</th>
              <th className="text-left">Grade</th>
              <th className="text-left">Applied Date</th>
              <th className="text-left">Payment</th>
              <th className="text-left">View Grade</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {grades.length > 0 ? ( // Check if grades is a valid array and has length
              grades.map((item, index) => (
                <tr key={index}>
                  <td className="text-left">{index + 1}</td>
                  <td className="text-left">{item.grade}</td>
                  <td className="text-left">{item.date}</td>
                  <td className="text-left">{item.payment}</td>
                  <td className="text-left">
                    <ButtonGroup>
                      <Button
                        variant="outline-primary shadow-none"
                        onClick={handleShow}
                        className="delete"
                      >
                        APPLY GRADE
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No grades applied yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}