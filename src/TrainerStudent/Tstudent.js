import React, { useState } from 'react'
import { Button, ButtonGroup, Form, InputGroup, Modal } from 'react-bootstrap'
import { CiLogout } from 'react-icons/ci';
import { FaArrowLeft, FaEdit, FaSearch, FaUser } from 'react-icons/fa'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Tstudent() {
    const navigate = useNavigate();
    const logoutAdmin = () =>{
      navigate('/')
    }
    const viewStudentGrade = () =>{
        navigate('/trainer-student-grade');
    }
  const totalStudents = [
    {
      id:1,
      name:"Madhan",
      phone:9874563210,
      email:"madhan@gmail.com",
      registere_by:"Prasath Trainer",
      create_date:"07-07-2024"
    },
    {
      id:2,
      name:"Vinoth",
      phone:9874563210,
      email:"vinoth@gmail.com",
      registere_by:"Prasath Trainer",
      create_date:"03-07-2024"

    },
    {
      id:3,
      name:"Mohan",
      phone:9874563210,
      email:"mohan@gmail.com",
      registere_by:"Prasath Trainer",
      create_date:"06-07-2024"

    },
    {
      id:4,
      name:"Hemachandran",
      phone:9874563210,
      email:"hema@gmail.com",
      registere_by:"Prasath Trainer",
      create_date:"06-07-2024"

    },
    {
      id:5,
      name:"Vicky",
      phone:9874563210,
      email:"vicky@gmail.com",
      registere_by:"Prasath Trainer",
      create_date:"06-07-2024"

    },
    {
      id:6,
      name:"Harish Kumar",
      phone:9874563210,
      email:"harish@gmail.com",
      registere_by:"Prasath Trainer",
      create_date:"06-07-2024"

    }
  ]
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search,setSearch] = useState('');

    const initialFormData = {
        name: '',
        parentname: '',
        dob: '',
        number: '',
        wnumber: '',
        address: '',
        grade: '',
        password: '',
        cpassword: ''
    }
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if(value){
            setErrors({...errors, [name] : ""});
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.parentname) tempErrors.parentname = "Parent name is required";
        if (!formData.dob) tempErrors.dob = "Date of Birth is required";
        if (!formData.number) tempErrors.number = "Number is required";
        if (!formData.wnumber) tempErrors.wnumber = "WhatsApp Number is required";
        if (!formData.address) tempErrors.address = "Address is required";
        if (!formData.grade) tempErrors.grade = "Grade is required";
        if (!formData.password) tempErrors.password = "Password is required";
        if (formData.password !== formData.cpassword) tempErrors.cpassword = "Passwords do not match";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Submit form data
            // console.log("Form data submitted: ", formData);
            toast("Submitted Successfully");
            setFormData(initialFormData);
        }
    };

  return (
    <div className='student_section'>
      <div className='d-flex justify-content-between mb-5'>
        <div>
          <a href='#' onClick={viewStudentGrade}><FaArrowLeft className='user-icon me-2 mb-3' /></a>
          <h2>Students Management</h2>
        </div>
        <div>
          <a href='#' ><FaUser className='user-icon me-2' /></a>
          <a href='' onClick={logoutAdmin}><CiLogout className='user-icon' /></a>
        </div>
      </div>
      <InputGroup className='search-input mb-5'>
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control 
        placeholder='Search...'
        onChange={(e)=>{setSearch(e.target.value)}}
        className='shadow-none'
          />
      </InputGroup>
      <Button
        variant="primary shadow-none"
        onClick={handleShow}
        className="edit py-2 px-3 mb-4"
      >
        Add Student
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Trainer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-around p-0">
        <Form autoComplete='off' className='add-trainer p-3' onSubmit={handleSubmit}>
            <h2 className='text-center mb-3'>Register For Student</h2>
            <div className="row">
                <div className="col-md-6 form-controls">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='mb-2'
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div className="col-md-6 form-controls">
                    <label htmlFor="parentname" className='parentname'>Father's/Husband's/Guardian's Name</label>
                    <input
                        type="text"
                        id="parentname"
                        name="parentname"
                        value={formData.parentname}
                        onChange={handleChange}
                        className='mb-2'
                    />
                    {errors.parentname && <div className="error">{errors.parentname}</div>}
                </div>
                <div className="col-md-6 form-controls">
                    <label htmlFor="gmail">Gmail</label>
                    <input
                        type="text"
                        id="gmail"
                        name="gmail"
                        value={formData.gmail}
                        onChange={handleChange}
                        className='mb-2'
                    />
                    {errors.gmail && <div className="error">{errors.gmail}</div>}
                </div>
                <div className="col-md-6 form-controls">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className='mb-2'
                    />
                    {errors.dob && <div className="error">{errors.dob}</div>}
                </div>
                <div className="col-md-6 form-controls password">
                    <label htmlFor="password">Create Password</label>
                    <div className='input-group mb-2'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='form-control'
                        />
                        <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>
                    </div>
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div className="col-md-6 form-controls ">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <div className='input-group mb-2'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="cpassword"
                            name="cpassword"
                            value={formData.cpassword}
                            onChange={handleChange}
                            className='form-control'
                        />
                        <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>
                    </div>
                    {errors.cpassword && <div className="error">{errors.cpassword}</div>}
                </div>
                <div className="col-md-6 form-controls">
                    <label htmlFor="number">Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className='mb-2'
                    />
                    {errors.number && <div className="error">{errors.number}</div>}
                </div>
                <div className="col-md-6 form-controls">
                    <label htmlFor="wnumber">WhatsApp Number</label>
                    <input
                        type="text"
                        id="wnumber"
                        name="wnumber"
                        value={formData.wnumber}
                        onChange={handleChange}
                        className='mb-2'
                    />
                    {errors.wnumber && <div className="error">{errors.wnumber}</div>}
                </div>
                <div className="col-md-6 form-controls">
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
                    {errors.grade && <div className="error">{errors.grade}</div>}
                </div>
                <div className="col-md-6 form-controls">
                    <label htmlFor="address">Address</label>
                    <textarea
                        name="address"
                        rows="1"
                        cols="25"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className='mb-2'
                    ></textarea>
                    {errors.address && <div className="error">{errors.address}</div>}
                </div>
                </div>
                <button type='submit' onClick={handleSubmit} className='mt-3 ht_btn'>Submit</button>
            </Form>
            <ToastContainer />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-scroll">
        <table className='table-fill' striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>REGISTER BY</th>
              <th>CREATE DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {totalStudents.filter((item) => {
              return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search) ||
              item.registere_by.toLowerCase().includes(search);
            }).map((item,index) =>
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.registere_by}</td>
                <td>{item.create_date}</td>
                <td>
                  <ButtonGroup>
                    <Button variant="outline-success shadow-none" className='edit py-2 px-3'>EDIT <FaEdit /></Button>
                    <Button variant="outline-danger shadow-none" className='delete'>DELETE <MdDeleteOutline /></Button>
                  </ButtonGroup>
                </td>
              </tr>
          )}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}
