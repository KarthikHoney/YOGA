import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { FaRegEye, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function StudentGrade() {

  const navigate = useNavigate();
  const logout = () => {
    navigate('/')
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialFormData = {
    grade: '',
    payment: ''
  }

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});


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
    12: 1200
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "grade") {
      
      const payment = paymentAmounts[value] || '';
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
      axios.post('http://localhost/CURD/backend_y/grade.php', formData)
        .then(response => {
          if(response.data){
            toast.success("Submitted Successfully");
            setFormData(initialFormData);
          }
          else{
            toast.warn('Fuck');
          }

        })
        .catch(error => {
          console.error("There was an error submitting the form!", error);
        });
    }
  };

  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <h2>Student Grade</h2>
        <div>
          <a href='#' ><FaUser className='user-icon me-2' /></a>
          <a href='' onClick={logout}><CiLogout className='user-icon' /></a>
        </div>
      </div>
      <p className="mb-5">You applied exam grade</p>
      <Button variant="primary shadow-none" onClick={handleShow} className="edit py-2 px-3 mb-4">Apply Grade</Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Form autoComplete='off' className='add-trainer p-3' onSubmit={handleSubmit}>
            <h2 className='text-center mb-3'>Register For Student</h2>
            <div className="row">
              <div className="col-12 form-controls">
                <label htmlFor="grade">Choose Exam Grade</label>
                <select
                  id="grade"
                  className='mb-2'
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                >
                  <option value="">Select Grade</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                {errors.grade && <div className="error text-light">{errors.grade}</div>}
              </div>

              <div className="col-12 form-controls">
                <label htmlFor="payment">Payment Amount</label>
                <input
                  type="text"
                  id="payment"
                  name="payment"
                  className='mb-2'
                  value={formData.payment}
                  readOnly
                />
              </div>
            </div>
            <button type='submit' className='mt-3 ht_btn'>Submit</button>
          </Form>
          <ToastContainer />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ overflowX: "scroll" }}>
        <table className="table-fill">
          <thead>
            <tr>
              <th className="text-left">Applied Date</th>
              <th className="text-left">Grade</th>
              <th className="text-left">Payment</th>
              <th className="text-left">Hall Ticket</th>
              <th className="text-left">Result</th>
              <th className="text-left">Certificate</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            <tr>
              <td className="text-left">09-07-2024</td>
              <td className="text-left">6</td>
              <td className="text-left">600</td>
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
            <tr>
              <td className="text-left">10-07-2024</td>
              <td className="text-left">7</td>
              <td className="text-left">700</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
