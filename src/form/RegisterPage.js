// RegisterPage.js
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };

  const initialFormData = {
    name: "",
    parentname: "",
    dob: "",
    number: "",
    wnumber: "",
    address: "",
    password: "",
    cpassword: "",
    gmail: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (number) => {
    const re = /^\d{10}$/;
    return re.test(number);
  };
  const isNumeric = (value) => {
    return /^\d*$/.test(value);
  };
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[\W]).{8,}$/;
    return re.test(password);
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) {
      tempErrors.name = "Please Enter Your Name";
    } else if (formData.name.length < 3) {
      tempErrors.name = "Name atleast have 3 characters";
    }
    if (!formData.parentname) {
      tempErrors.parentname = "Please Enter Your Parent Name";
    } else if (formData.parentname.length < 3) {
      tempErrors.studio = "Studio Name atleast have 3 characters";
    }
    if (!formData.gmail) {
      tempErrors.gmail = "Gmail is required";
    } else if (!validateEmail(formData.gmail)) {
      tempErrors.gmail = "Enter Valid Gmail";
    }
    if (!formData.number) {
      tempErrors.number = "Please enter your Number";
    } else if (!isNumeric(formData.number)) {
      tempErrors.number = "Please enter Numbers Only";
    } else if (!validatePhoneNumber(formData.number)) {
      tempErrors.number = "Number must be 10 digits";
    }
    if (!formData.wnumber) {
      tempErrors.wnumber = "Please enter your Whatsappp No";
    } else if (!isNumeric(formData.wnumber)) {
      tempErrors.wnumber = "Please enter Numbers Only";
    } else if (!validatePhoneNumber(formData.wnumber)) {
      tempErrors.wnumber = "Number Must be 10 digits";
    }
    if (!formData.address) {
      tempErrors.address = "Please Enter Your address";
    } else if (formData.address.length < 10) {
      tempErrors.address = "Address atleast 10 characters";
    }
    if (!formData.password) {
      tempErrors.password = "Please Enter Password";
    } else if (!validatePassword(formData.password)) {
      tempErrors.password =
        "Password must be at least 8 characters long, contain one uppercase letter and one symbol";
    }
    if (formData.password !== formData.cpassword)
      tempErrors.cpassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post("http://localhost/newyoga/register.php")

      .then((response) => {
        if (response.data.error) {
          console.error("Error:", response.data.error);
          alert("Failed to fetch data");
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch data");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSend = new FormData();

      dataToSend.append("action", "create");
      dataToSend.append("name", formData.name);
      dataToSend.append("parentname", formData.parentname);
      dataToSend.append("gmail", formData.gmail);
      dataToSend.append("address", formData.address);
      dataToSend.append("dob", formData.dob);
      dataToSend.append("password", formData.password);
      dataToSend.append("wnumber", formData.wnumber);
      dataToSend.append("number", formData.number);

      axios
        .post("http://localhost/newyoga/register.php", dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 1) {
            toast("Submitted Successfully");
            setFormData(initialFormData);
            goToLogin();
          } else {
            alert("Failed to create record");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed ");
        });
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center min-vh-100">
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <h2 className="text-center mb-3">Register For Student</h2>
        <div className="row">
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
          <div className="col-md-6 form-controls">
            <label htmlFor="parentname" className="parentname">
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
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="col-md-6 form-controls ">
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
            {errors.wnumber && <div className="error">{errors.wnumber}</div>}
          </div>

          <div className="col-12 form-controls">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              rows="3"
              cols="25"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mb-2"
            ></textarea>
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
        </div>
        <a href="#" className="text-right" onClick={goToLogin}>
          Already Have an Account?
        </a>
        <button type="submit" className="mt-3 ht_btn">
          Submit
        </button>
      </Form>
      <ToastContainer />
    </div>
  );
}
