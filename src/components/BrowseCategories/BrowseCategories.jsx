import React from "react";

//import css
import "./BrowseCategories.css";

// import image
import iphone from "../../assets/category/iphone.png";
import mac from "../../assets/category/mac.png";
import ipad from "../../assets/category/ipad.png";
import watch from "../../assets/category/watch.png";
import airpods from "../../assets/category/airpods.png";

import { useNavigate } from "react-router-dom";

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

const BrowseCategories = () => {
  const navigate = useNavigate();

  // navigate
  const directToShop = () => {
    navigate("/shop");
  };

  return (
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
  );
};

export default BrowseCategories;
