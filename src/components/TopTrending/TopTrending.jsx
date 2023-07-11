import React, { useEffect, useState } from "react";
import "./TopTrending.css";
import axios from "axios";
import { showPopup } from "../../reducer/popupReducer";
import { useDispatch } from "react-redux";
import ProductItem from "../ProductItem/ProductItem";

const TopTrending = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

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
  );
};

export default TopTrending;
