import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFromStorage, isEmptyObject, toastNoti } from "../../utils/utils";
import { logIn, logOut } from "../../reducer/authReducer";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const isLoged = useSelector((state) => state.auth.isLoged);
  const currentUser = getFromStorage("currentUser", {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // check local storage if loged save data into redux
  const setUser = () => {
    const isLoged = !isEmptyObject(currentUser);
    setIsLogin(true);
    if (isLoged) {
      dispatch(logIn({ user: currentUser }));
    } else {
      setIsLogin(false);
    }
  };

  // call function check login
  useEffect(() => {
    setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged]);

  // navigate
  const handleNavigate = (path) => {
    navigate(path);
  };

  //sign out and remove data from redux + local storage
  const signOut = () => {
    dispatch(logOut());
    toastNoti("Logout success!", "success");
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-left">
          <p onClick={() => handleNavigate("/")}>Home</p>
          <p onClick={() => handleNavigate("/shop")}>Shop</p>
        </div>

        <div className="navbar-logo">
          <p>BOUTIQUE</p>
        </div>

        <div className="navbar-right">
          <p onClick={() => handleNavigate("/cart")}>
            <FontAwesomeIcon className="navbar-icon" icon={faCartShopping} />
            Cart
          </p>
          {isLogin ? (
            <>
              <p>
                <FontAwesomeIcon className="navbar-icon" icon={faUser} />
                {currentUser.fullname}
                <FontAwesomeIcon className="navbar-icon" icon={faCaretDown} />
              </p>
              <p onClick={signOut}>(Logout)</p>
            </>
          ) : (
            <p onClick={() => handleNavigate("/login")}>
              <FontAwesomeIcon className="navbar-icon" icon={faUser} />
              Login
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
