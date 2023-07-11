import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginPage/LoginPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  getFromStorage,
  saveToStorage,
  toastNoti,
  validateForm,
} from "../../utils/utils";

const initState = {
  fullname: "",
  email: "",
  password: "",
  phone: "",
};

const RegisterPage = () => {
  const [formData, setFormData] = useState(initState);
  const userArr = getFromStorage("userArr", []);
  const navigate = useNavigate();

  // on submit sign up
  const submit = () => {
    const validateData = validateForm(formData, "signup");
    if (validateData) {
      // save data to local storage
      userArr.push({ ...formData, id: Math.random().toString() });
      saveToStorage("userArr", userArr);
      toastNoti("Sign up success!", "success");
      // if user sign up success switch to login
      onSwitchForm();
    }
  };

  // on change input
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // on switch form sign up
  const onSwitchForm = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-modal">
          <h1>Sign Up</h1>

          <div className="login-input">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={onChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={onChange}
            />
          </div>

          <button type="button" onClick={submit}>
            Sign Up
          </button>

          <div className="login-actions">
            <p>
              Login?
              <span onClick={onSwitchForm}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
