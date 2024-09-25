import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { FaArrowLeft, FaSearch, FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Form component for student registration
const StudentForm = ({ formData, handleChange, handleSubmit, errors, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => (
  <Form autoComplete="off" className="add-trainer p-3" onSubmit={handleSubmit}>
    <h2 className="text-center mb-3">Register For Student</h2>
    <div className="row">
      <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <InputField label="Father's/Husband's/Guardian's Name" name="parentname" value={formData.parentname} onChange={handleChange} error={errors.parentname} />
      <InputField label="Gmail" name="gmail" value={formData.gmail} onChange={handleChange} error={errors.gmail} />
      <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} error={errors.dob} />
      <PasswordField
        label="Create Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        error={errors.password}
      />
      <PasswordField
        label="Confirm Password"
        name="cpassword"
        value={formData.cpassword}
        onChange={handleChange}
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
        error={errors.cpassword}
      />
      <InputField label="Number" name="number" value={formData.number} onChange={handleChange} error={errors.number} />
      <InputField label="WhatsApp Number" name="wnumber" value={formData.wnumber} onChange={handleChange} error={errors.wnumber} />
      <TextareaField label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
    </div>
    <Button type="submit" onClick={handleSubmit} className="mt-3 ht_btn">Submit</Button>
  </Form>
);

const InputField = ({ label, name, value, onChange, error, type = "text" }) => (
  <div className="col-md-6 form-controls">
    <label htmlFor={name}>{label}</label>
    <input type={type} id={name} name={name} value={value} onChange={onChange} className="mb-2" />
    {error && <div className="error">{error}</div>}
  </div>
);

const PasswordField = ({ label, name, value, onChange, showPassword, setShowPassword, error }) => (
  <div className="col-md-6 form-controls password">
    <label htmlFor={name}>{label}</label>
    <div className="input-group mb-2">
      <input type={showPassword ? "text" : "password"} id={name} name={name} value={value} onChange={onChange} className="form-control" />
      <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
      </span>
    </div>
    {error && <div className="error">{error}</div>}
  </div>
);

const TextareaField = ({ label, name, value, onChange, error }) => (
  <div className="col-12 form-controls">
    <label htmlFor={name}>{label}</label>
    <textarea name={name} rows="1" cols="25" id={name} value={value} onChange={onChange} className="mb-2"></textarea>
    {error && <div className="error">{error}</div>}
  </div>
);

// Main Component for managing students
export default function Tstudent({ trainerId }) {
  const [trainerStudents, setTrainerStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const goToLogin = () => navigate("/");
  const viewStudentGrade = () => navigate("/trainer-student-grade");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) setErrors({ ...errors, [name]: "" });
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
    if (formData.password !== formData.cpassword) tempErrors.cpassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formDataToSend = {
        action: "create",
        ...formData,
        trainerId,
      };
      axios.post("http://localhost/newyoga/regTrainerStudent.php", formDataToSend)
        .then((response) => {
          if (response.data && response.data.status === 1 && response.data.newStudent) {
            setTrainerStudents((prev) => [...prev, response.data.newStudent]);
            toast.success("Submitted Successfully");
            resetFormData();
          } else {
            toast.warn("Form not submitted: " + response.data.message);
          }
        })
        .catch((e) => {
          toast.error("Failed to create");
        });
    }
  };

  useEffect(() => {
    axios.post("http://localhost/newyoga/regTrainerStudent.php", { trainerId })
      .then((res) => {
        if (res.data && res.data.status === 1) {
          const data = Array.isArray(res.data.newStudent) ? res.data.newStudent : [];
          setTrainerStudents(data);
        } else {
          toast.error("Failed to fetch");
        }
      })
      .catch((error) => {
        toast.error("Error fetching newStudent");
      });
  }, [trainerId]);

  const resetFormData = () => setFormData(initialFormData);

  return (
    <div className="student_section">
      <Header goToLogin={goToLogin} viewStudentGrade={viewStudentGrade} />

      <SearchBar search={search} setSearch={setSearch} />

      <Button variant="primary shadow-none" onClick={handleShow} className="edit py-2 px-3 mb-4">
        Add Student
      </Button>

      <StudentModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />

      <StudentTable trainerStudents={trainerStudents} search={search} />
      <ToastContainer />
    </div>
  );
}

// Separate components for better structure
const Header = ({ goToLogin, viewStudentGrade }) => (
  <div className="d-flex justify-content-between mb-5">
    <div>
      <a href="#" onClick={viewStudentGrade}><FaArrowLeft className="user-icon me-2 mb-3" /></a>
      <h2>Students Management</h2>
    </div>
    <div>
      <a href="#"><FaUser className="user-icon me-2" /></a>
      <a href="#" onClick={goToLogin}><CiLogout className="user-icon" /></a>
    </div>
  </div>
);

const SearchBar = ({ search, setSearch }) => (
  <div className="mb-4">
    <InputGroup className="search-control mb-3">
      <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control rounded shadow-none" placeholder="Search" />
      <InputGroup.Text className="search-btn"><FaSearch /></InputGroup.Text>
    </InputGroup>
  </div>
);

const StudentModal = ({ show, handleClose, handleSubmit, formData, handleChange, errors, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => (
  <Modal show={show} onHide={handleClose} size="lg">
    <Modal.Body>
      <StudentForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleClose} className="btn-danger">Close</Button>
    </Modal.Footer>
  </Modal>
);

const StudentTable = ({ trainerStudents, search }) => (
  <div className="table-responsive">
    <table className="table table-bordered table-hover mb-0 text-center">
      <thead className="bg-dark text-light">
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Gmail</th>
          <th>Number</th>
          <th>WhatsApp Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {trainerStudents.filter((student) => student.name.toLowerCase().includes(search.toLowerCase())).map((student, index) => (
          <tr key={student.student_id}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.gmail}</td>
            <td>{student.number}</td>
            <td>{student.wnumber}</td>
            <td style={{padding:'12px'}}>
              <Button style={{margin:'3px'}} className="edit">Edit</Button>
              <Button style={{margin:'3px'}} className="delete">Delete</Button>
              <Button style={{margin:'3px'}}>Apply Grade</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const initialFormData = {
  name: "",
  parentname: "",
  gmail: "",
  dob: "",
  password: "",
  cpassword: "",
  number: "",
  wnumber: "",
  address: "",
};
