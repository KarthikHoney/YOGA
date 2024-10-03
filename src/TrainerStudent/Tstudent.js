import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, InputGroup, Modal } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { FaEdit, FaSearch, FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdDeleteOutline, MdOutlineGrade } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Tstudent({ trainerId, studentId }) {
  const initialFormData = {
    name: "",
    parentname: "",
    gmail: "",
    dob: "",
    number: "",
    wnumber: "",
    address: "",
    password: "",
    cpassword: "",
  };
  const [trainerStudents, setTrainerStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [add,setAdd] = useState(false);
  const [edit,setEdit] = useState(false);
  const [del,setDel] = useState(false);

  const goToLogin = () => {
    navigate("/");
  };
 


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Additional state for edit mode and student ID
  const [isEditMode, setIsEditMode] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  const handleShowDeleteModal = (id) => {
    setDeleteStudentId(id);
    setShowDeleteModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.parentname) tempErrors.parentname = "Parent name is required";
    if (!formData.gmail) tempErrors.gmail = "Gmail is required";
    if (!formData.dob) tempErrors.dob = "Date of Birth is required";
    if (!formData.number) tempErrors.number = "Number is required";
    if (!formData.wnumber) tempErrors.wnumber = "WhatsApp Number is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.cpassword)
      tempErrors.cpassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleShowEdit = (student) => {
    setFormData({
      name: student.name,
      parentname: student.parentname,
      gmail: student.gmail,
      dob: student.dob,
      number: student.number,
      wnumber: student.wnumber,
      address: student.address,
      password: "",
      cpassword: "",
    });
    setEditStudentId(student.id);
    setIsEditMode(true);
    setShow(true);
    setEdit(true)
  };

  const handleTSgrade = async (student)=>{
    const idtosend = {
      trainerId,
      studentId:student.id,
      action:'grade'
    }
   await axios.post('http://localhost/newyoga/getTrainerstudentGrade.php',idtosend)
    .then((res)=>{
      console.log(res.data);
      navigate("/trainer-student-grade", { state: { trainerId, studentId: student.id } }); // Pass state      
    })

  }

  const handleDelete = async () => {
    const deleteDatas = {
      action: "delete",
      trainerId,
      studentId : deleteStudentId,
    };
   await axios
      .post("http://localhost/newyoga/editTS.php", deleteDatas)
      .then((res) => {
        if (res.data.status === 1) {
          console.log("deleted");
          toast.success("Successfully student Deleted");
          setTrainerStudents((prev) =>
            prev.filter((student) => student.id !== deleteStudentId)
          );
          setDel(true);
          setShowDeleteModal(false);
        } else {
          toast.warn("something went worng");
          setShowDeleteModal(false);
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the student", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formDataToSend = {
        action: isEditMode ? "update" : "create",
        ...formData,
        trainerId,
        studentId: editStudentId,
      };

      const url = isEditMode
        ? "http://localhost/newyoga/editTS.php"
        : "http://localhost/newyoga/regTrainerStudent.php";

     await axios
        .post(url, formDataToSend)
        .then((response) => {
          if (response.data && response.data.status === 1) {
            if (isEditMode) {
              // Update student in the state
              setTrainerStudents((prev) =>
                prev.map((student) =>
                  student.id === editStudentId
                    ? response.data.updatedStudent
                    : student
                )
              );
              toast.success("Student updated successfully");
              setEdit(true)
            } else {
              toast.success("Student added successfully");
              setTrainerStudents((prev) => [...prev, response.data.newStudent]);
            }
            resetFormData();
            setShow(false);
            setAdd(true)
          } else {
            toast.warn("Form submission failed: " + response.data.message);
          }
        })
        .catch(() => {
          toast.error(isEditMode ? "Failed to update" : "Failed to create");
        });
    }
  };

  useEffect(  () => {
    axios
      .post("http://localhost/newyoga/regTrainerStudent.php", { trainerId })
      .then((res) => {
        if (res.data && res.data.status === 1) {
          const data = Array.isArray(res.data.newStudent)
            ? res.data.newStudent
            : [];
          setTrainerStudents(data);
        } 
        // else {
        //   toast.error("Failed to fetch");
        // }
      })
      .catch((error) => {
        toast.error("Error fetching newStudent",error);
      });
  }, [add,edit,del,trainerId]);

  // Call this function to reset the modal state when closing
  const resetFormData = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
    setEditStudentId(null);
  };
  return (
    <div className="student_section">
      <div className="d-flex justify-content-between mb-5">
        <div>
          <h2>Students Management</h2>
        </div>
        <div>
          <a href="#">
            <FaUser className="user-icon me-2" />
          </a>
          <a href="#" onClick={goToLogin}>
            <CiLogout className="user-icon" />
          </a>
        </div>
      </div>
      <InputGroup className="search-input mb-5">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="shadow-none"
        />
      </InputGroup>
      <Button
        variant="primary shadow-none"
        onClick={handleShow}
        className="edit py-2 px-3 mb-4"
      >
        Add Student
      </Button>
      {/* delete modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Body className="py-3 fs-5 text-center">Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={()=>{handleDelete()}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          resetFormData();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-around p-0">
          <Form
            autoComplete="off"
            className="add-trainer p-3"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center mb-3">
              {isEditMode ? "Update For Student" : "Register For Student"}
            </h2>
            <div className="row">
              {/* Name Input */}
              <div className="col-md-6 form-controls">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mb-2"
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              {/* Parent Name Input */}
              <div className="col-md-6 form-controls">
                <label htmlFor="parentname">
                  Father's/Husband's/Guardian's Name
                </label>
                <input
                  type="text"
                  id="parentname"
                  name="parentname"
                  value={formData.parentname}
                  onChange={handleChange}
                  className="mb-2"
                />
                {errors.parentname && (
                  <div className="error">{errors.parentname}</div>
                )}
              </div>
              {/* Gmail Input */}
              <div className="col-md-6 form-controls">
                <label htmlFor="gmail">Gmail</label>
                <input
                  type="text"
                  id="gmail"
                  name="gmail"
                  value={formData.gmail}
                  onChange={handleChange}
                  className="mb-2"
                />
                {errors.gmail && <div className="error">{errors.gmail}</div>}
              </div>
              {/* Date of Birth Input */}
              <div className="col-md-6 form-controls">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="mb-2"
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </div>
              {/* Password Input */}
              <div className="col-md-6 form-controls password">
                <label htmlFor="password">Create Password</label>
                <div className="input-group mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <span
                    className="input-group-text"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              {/* Confirm Password Input */}
              <div className="col-md-6 form-controls">
                <label htmlFor="cpassword">Confirm Password</label>
                <div className="input-group mb-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="cpassword"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <span
                    className="input-group-text"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>
                {errors.cpassword && (
                  <div className="error">{errors.cpassword}</div>
                )}
              </div>
              {/* Phone and WhatsApp Number Input */}
              <div className="col-md-6 form-controls">
                <label htmlFor="number">Number</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="mb-2"
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
                  className="mb-2"
                />
                {errors.wnumber && (
                  <div className="error">{errors.wnumber}</div>
                )}
              </div>
              {/* Address Input */}
              <div className="col-12 form-controls">
                <label htmlFor="address">Address</label>
                <textarea
                  name="address"
                  rows="1"
                  cols="25"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mb-2"
                ></textarea>
                {errors.address && (
                  <div className="error">{errors.address}</div>
                )}
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-3 ht_btn"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </Form>
          <ToastContainer />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              resetFormData();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-scroll">
        <table className="table-fill" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PARENTNAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>WHATSAPP</th>
              <th>CREATED DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {trainerStudents
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.parentname}</td>
                  <td>{item.gmail}</td>
                  <td>{item.number}</td>
                  <td>{item.wnumber}</td>
                  <td>{item.dob}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        variant="outline-success shadow-none"
                        className="edit py-2 px-3"
                        onClick={() => {
                          handleShowEdit(item);
                        }}
                      >
                        EDIT <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleShowDeleteModal(item.id)}
                      >
                        Delete <MdDeleteOutline />
                      </Button>
                      <Button
                        variant="outline-primary shadow-none"
                        className="apply"
                        onClick={()=>{
                          handleTSgrade(item)
                        }}
                      >
                        View Grade <MdOutlineGrade />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
