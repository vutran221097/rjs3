import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// import components
import Navbar from "../../components/Navbar/Navbar.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import Contact from "../../components/Contact/Contact.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import DetailPopup from "../../components/DetailPopup/DetailPopup.jsx";

// import css
import "./HomePage.css";

// import image
import iphone from "../../assets/category/iphone.png";
import mac from "../../assets/category/mac.png";
import ipad from "../../assets/category/ipad.png";
import watch from "../../assets/category/watch.png";
import airpods from "../../assets/category/airpods.png";
import { showPopup } from "../../reducer/popupReducer.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";

const data = [
  {
    image: iphone,
    alt: "iphone",
  },
  {
    image: mac,
    alt: "mac",
  },
  {
    image: ipad,
    alt: "ipad",
  },
  {
    image: watch,
    alt: "watch",
  },
  {
    image: airpods,
    alt: "airpods",
  },
];

// first line data
const newData1 = data.slice(0, 2);
// second line data
const newData2 = data.slice(-3);

const HomePage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // navigate
  const directToShop = () => {
    navigate("/shop");
  };

  // call api to get data
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // call redux to show popup modal
  const onClick = (v) => {
    dispatch(showPopup({ item: v }));
  };
  return (
    <div>
      <Navbar />
      <Banner type="home" />
      {/* Browse categories */}
      <div className="container">
        <div className="browse-categories">
          <div className="browse-categories-header">
            <p>CAREFULLY CREATED COLLECTIONS</p>
            <h2>BROWSE OUR CATEGORIES</h2>
          </div>
          {/* first line render */}
          <div className="browse-categories-item">
            {newData1.map((v, i) => {
              return (
                <div onClick={() => directToShop()} key={i}>
                  <img src={v.image} alt={v.alt} />
                </div>
              );
            })}
          </div>
          {/* second line render */}
          <div className="browse-categories-item">
            {newData2.map((v, i) => {
              return (
                <div onClick={() => directToShop()} key={i}>
                  <img src={v.image} alt={v.alt} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Trending */}
      <div className="container">
        <div className="top-trending">
          <div className="top-trending-header">
            <p>MADE THE HARD WAY</p>
            <h2>TOP TRENDING PRODUCTS</h2>
          </div>

          <div className="top-trending-list mb-2">
            {data &&
              data.slice(0, 4).map((v, i) => {
                return (
                  <ProductItem
                    key={i}
                    item={v}
                    onClick={() => onClick(v)}
                    className="top-trending-item"
                  />
                );
              })}
          </div>

          <div className="top-trending-list">
            {data &&
              data.slice(4, 8).map((v, i) => {
                return (
                  <ProductItem
                    key={i}
                    item={v}
                    onClick={() => onClick(v)}
                    className="top-trending-item"
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
      <DetailPopup />
    </div>
  );
};

export default HomePage;
