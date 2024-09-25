import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { FaRegEye, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function StudentGrade({ studentId }) {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
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
  const [grades, setGrades] = useState([]);

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

  useEffect(() => {
    // Fetching grades for a particular student
    axios
      .post("http://localhost/newyoga/gradeStudent.php", { studentId })
      .then((res) => {
        if (res.data && res.data.status === 1) {
          const data = Array.isArray(res.data.gradess) ? res.data.gradess : [];
          setGrades(data);
        } else {
          toast.warn("Failed to fetch data");
        }
      })
      .catch((e) => {
        toast.error("Error fetching grades",e);
      });
  }, [studentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSend = {
        action: "grade",
        grade: formData.grade,
        payment: formData.payment,
        studentId: studentId, 
      };
  
      axios
        .post("http://localhost/newyoga/gradeStudent.php", dataToSend)
        .then((response) => {
          if (response.data && response.data.status === 1 && response.data.newGrade) {
            toast.success("Grade Applied Successfully");
            setFormData(initialFormData);
            setGrades([...grades, response.data.newGrade]);
          } else {
            toast.warn("Failed to apply grade.");
          }
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
          toast.error("Error submitting grade");
        });
    }
  };
  

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Student Grade</h2>
        <div>
          <a href="#">
            <FaUser className="user-icon me-2" />
          </a>
          <a href="" onClick={logout}>
            <CiLogout className="user-icon" />
          </a>
        </div>
      </div>
      <Button
        variant="primary shadow-none"
        onClick={handleShow}
        className="edit py-2 px-3 mb-4"
      >
        Apply Grade
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Grade</Modal.Title>
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
                        .filter((grade) => !grades.some((item) => item.grade === parseInt(grade))) // Filter out already applied grades
                        .map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                        ))}
                </select>

                {errors.grade && (
                  <div className="error text-light">{errors.grade}</div>
                )}
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
      <table className="table-fill">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Payment</th>
            <th>Hall Ticket</th>
            <th>Result</th>
            <th>Certificate</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item, index) => (
            <tr key={index}>
              <td>{index +1}</td>
              <td>{item.date}</td>
              <td>{item.grade}</td>
              <td>{item.payment}</td>
              <td className="text-left">
                <Button
                    variant="outline-primary shadow-none"
                    className="edit py-2 px-3"
                >
                    <FaRegEye /> View Hall Ticket
                </Button>
                </td>
                <td className="text-left">
                <Button
                    variant="outline-success shadow-none"
                    className="edit py-2 px-3"
                >
                    <FaRegEye /> View Result
                </Button>
                </td>
                <td className="text-left">
                <Button
                    variant="outline-success shadow-none"
                    className="edit py-2 px-3"
                >
                    <FaRegEye /> View Certificate
                </Button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}