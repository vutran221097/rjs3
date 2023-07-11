import React, { useEffect } from "react";
import "./CheckoutPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/utils";
import { updateCart } from "../../reducer/cartReducer";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  // get cart info from local storage and save to redux
  useEffect(() => {
    dispatch(updateCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <Banner type="checkout" />
      <div className="container">
        <div className="checkout-page">
          <h2>BILLING DETAILS</h2>
          <div className="billing">
            <div className="billing-user-info">
              <div>
                <label>FULL NAME:</label>
                <input type="text" placeholder="Enter Your Full Name Here!" />
              </div>
              <div>
                <label>EMAIL:</label>
                <input type="text" placeholder="Enter Your Email Here!" />
              </div>
              <div>
                <label>PHONE NUMBER:</label>
                <input
                  type="number"
                  placeholder="Enter Your Phone Number Here!"
                />
              </div>
              <div>
                <label>ADDRESS:</label>
                <input type="text" placeholder="Enter Your Address Here!" />
              </div>

              <div>
                <button>Place order</button>
              </div>
            </div>
            <div className="billing-total">
              <h2>YOUR ORDER</h2>
              <div className="billing-details">
                {cartItems.map((v, i) => {
                  return (
                    <div key={i}>
                      <div className="billing-detail-item">
                        <h3>{v.name}</h3>
                        <p>{formatPrice(v.price) + " x " + v.amount}</p>
                      </div>
                      <div className="horizon-line"></div>
                    </div>
                  );
                })}
              </div>
              <div className="billing-total-price">
                <h3>TOTAL</h3>
                <p>{formatPrice(totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
