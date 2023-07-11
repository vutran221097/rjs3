import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { getFromStorage, toastNoti, validateForm } from "../../utils/utils";
import { logIn } from "../../reducer/authReducer";

const initState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formData, setFormData] = useState(initState);
  const userArr = getFromStorage("userArr", []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on submit sign in
  const submit = () => {
    const validateData = validateForm(formData, "signin");

    // find user in user arr
    const findUser = userArr.filter(
      (item) => item.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (!findUser.length && validateData)
      return toastNoti("User doesn't exist", "error");
    if (validateData && findUser.length) {
      // if user loged redirect to home
      dispatch(logIn({ user: findUser[0] }));
      toastNoti("Login success!", "success");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  // onchange input
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // on switch sign up
  const onSwitchForm = () => {
    navigate("/register");
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-modal">
          <h1>Sign In</h1>

          <div className="login-input">
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
          </div>

          <button type="button" onClick={submit}>
            Sign In
          </button>

          <div className="login-actions">
            <p>
              Create an account?
              <span onClick={onSwitchForm}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
