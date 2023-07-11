import React, { useEffect, useState } from "react";
import "./ShopPage.css";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductList from "../../components/ProductList/ProductList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import categories from "../../assets/jsondata/categories.json";

const ShopPage = () => {
  const [active, setActive] = useState("All");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      if (res.status === 200) {
        // set original data
        setData(res.data);
        // set filterd data
        setFilterData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // change category
  const changeCategory = (category) => {
    setActive(category);
    setSearchText("")

    if (category === "All") {
      setFilterData(data);
      return;
    }

    const newData = data.filter(
      (item) => item.category === category.toLowerCase()
    );
    setFilterData(newData);
  };

  // sort data
  const sortData = (e) => {
    const newData = [...filterData];
    switch (e.target.value) {
      case "low":
        setFilterData(newData.sort((a, b) => a.price - b.price));
        break;
      case "high":
        setFilterData(newData.sort((a, b) => b.price - a.price));
        break;
      default:
        if (active === "All") {
          setFilterData(data);
        } else {
          const newData = data.filter(
            (item) => item.category === active.toLowerCase()
          );
          setFilterData(newData);
        }
        return;
    }
  };

  // navigate
  const detailProduct = (item) => {
    navigate(`/detail/${item._id.$oid}`);
  };

  // onchange searching input
  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  // debouce searching
  useEffect(() => {
    if (!searchText.length) {
      if (active === "All") {
        setFilterData(data);
      } else {
        const newData = data.filter(
          (item) => item.category === active.toLowerCase()
        );
        setFilterData(newData);
      }
      return;
    }
    const getData = setTimeout(() => {
      if (active === "All") {
        const newData = data.filter((item) =>
          item.name.toLowerCase().includes(searchText)
        );
        setFilterData(newData);
      } else {
        const newData = data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText) &&
            active.toLowerCase() === item.category
        );
        setFilterData(newData);
      }
    }, 800);

    return () => clearTimeout(getData);
    // eslint-disable-next-line
  }, [searchText]);

  return (
    <div>
      <Navbar />
      <Banner type="shop" />
      <div className="container">
        <div className="shop-container">
          <div className="shop-categories">
            {categories.map((v, i) => {
              return (
                <div className={v.title === "APPLE" ? "bg-black" : ""} key={i}>
                  <h2>{v.title}</h2>
                  {v.item.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className={`shop-categories-item ${
                          active === value ? "active" : ""
                        }`}
                        onClick={() => changeCategory(value)}
                      >
                        <p>{value}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="shop-category-item">
            <div className="shop-filter">
              <input
                type="text"
                placeholder="Enter Search Here!"
                onChange={onChangeSearch}
                value={searchText}
              />
              <select
                name="sort"
                id="sort"
                onChange={sortData}
                defaultValue="default"
              >
                <option value="default">Default sorting</option>
                <option value="low">From low to high</option>
                <option value="high">From high to low</option>
              </select>
            </div>
            <ProductList
              data={filterData}
              onClick={detailProduct}
              className="shop-item"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
