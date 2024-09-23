import React, { useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { FaRegEye, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrainerStudentGrade({ studentId, trainerId }) {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  const studentDashboard = () => {
    navigate("/student-view-trainer");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialFormData = {
    grade: "",
    payment: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [grade, setGrade] = useState([]);

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
        studentId: studentId, // Sending studentId
        trainerId: trainerId, // Sending trainerId
      };

      axios
        .post("http://localhost/newyoga/gradeTrainer.php", dataToSend)
        .then((response) => {
          if (response.data) {
            toast.success("Grade Applied Successfully");
            setFormData(initialFormData);
            const gradeData = Array.isArray(response.data)
              ? response.data
              : [response.data];
            setGrade((previousData) => [...previousData, ...gradeData]);
          } else {
            toast.warn("Invalid data or no data returned");
          }
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
        });
    }
  };

  return (
    <div>
      {/* Apply Grade Modal */}
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
                  {Object.keys(paymentAmounts).map((grade) => (
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
        <h2>Your Student Grade</h2>
        <div>
          <a href="#">
            <FaUser className="user-icon me-2" />
          </a>
          <a href="" onClick={logout}>
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
            {grade.length > 0 ? (
              grade.map((item, index) => (
                <tr key={index}>
                  <td className="text-left">{index + 1}</td>
                  <td className="text-left">{item.grade}</td>
                  <td className="text-left">{item.date}</td>
                  <td className="text-left">{item.payment}</td>
                  <td className="text-left">
                    <ButtonGroup>
                      <Button
                        variant="outline-success shadow-none"
                        onClick={studentDashboard}
                        className="edit py-2 px-3"
                      >
                        <FaRegEye /> VIEW GRADE
                      </Button>
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
