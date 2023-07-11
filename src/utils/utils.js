import { toast } from "react-toastify";

export function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
export function getFromStorage(key, defaultKey) {
  if (localStorage.getItem(key) === null) return defaultKey;
  return JSON.parse(localStorage.getItem(key));
}
export const validateEmail = (email) => {
  const regEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return regEmail.test(email);
};

export const toastNoti = (text, type) => {
  switch (type) {
    case "error":
      return toast.error(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    case "success":
      return toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    default:
      return toast(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }
};

export const isEmptyObject = (myEmptyObj) => {
  return (
    Object.keys(myEmptyObj).length === 0 && myEmptyObj.constructor === Object
  );
};

export const validateForm = (state, type) => {
  const userArr = getFromStorage("userArr", []);
  if (Object.values(state).includes("")) {
    toastNoti("All fields are required!", "error");
    return false;
  }

  if (!validateEmail(state.email)) {
    toastNoti("Invalid email!", "error");
    return false;
  }

  if (state.password.length < 8) {
    toastNoti("Your password must be at least 8 characters ", "error");
    return false;
  }

  if (type === "signup") {
    if (userArr.length > 0) {
      const findUser = userArr.filter((item) => item.email === state.email);
      if (!!findUser.length) {
        toastNoti("Email already exist!", "error");
        return false;
      }
    }
  }

  return true;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(price)
    .replace("₫", "VND");
};
