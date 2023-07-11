import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import "./DetailPage.css";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductList from "../../components/ProductList/ProductList";
import { addCart } from "../../reducer/cartReducer";
import { formatPrice, toastNoti } from "../../utils/utils";

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

    // call api get data
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      if (res.status === 200) {
        const item = res.data.find((item) => item._id.$oid === id);
        const relatedItems = res.data.filter(
          (v) => v.category === item.category && v._id.$oid !== id
        );
        setData(item);
        setRelated(relatedItems);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

    // onchange quantity input
  const onChangeQuantity = (e) => {
    if (e.target.value < 0) return setQuantity(0);
    setQuantity(e.target.value);
  };

  // onchange quantity button
  const onClickChangeQuantity = (type) => {
    if (quantity < 1 && type === "dec") {
      setQuantity(0);
      return;
    } else {
      type === "inc"
        ? setQuantity((prevState) => prevState + 1)
        : setQuantity((prevState) => prevState - 1);
    }
  };

  //navigate
  const detailProduct = (item) => {
    navigate(`/detail/${item._id.$oid}`);
  };

  // add item to cart
  const handdleAddItem = () => {
    const addItem = { ...data };
    addItem.amount = quantity;
    dispatch(addCart({ item: addItem }));
    toastNoti(
      `Add success ${quantity} item${quantity === 1 ? "" : "s"}`,
      "success"
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="detail-page">
          {data && (
            <>
              <div className="detail-item">
                <div className="detail-img">
                  <img src={data.img1} alt={data.category} />
                </div>
                <div className="detail-info">
                  <h1>{data.name}</h1>
                  <p className="price">{formatPrice(data.price)}</p>
                  <p className="short-desc">{data.short_desc}</p>
                  <h3 className="category">
                    CATEGORY: <span>{data.category}</span>
                  </h3>
                  <div className="quantity">
                    <div className="input-number">
                      <p>QUANTITY</p>
                      <button
                        type="button"
                        onClick={() => onClickChangeQuantity("dec")}
                      >
                        <FontAwesomeIcon icon={faCaretLeft} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={onChangeQuantity}
                      />
                      <button
                        type="button"
                        onClick={() => onClickChangeQuantity("inc")}
                      >
                        <FontAwesomeIcon icon={faCaretRight} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="add"
                      onClick={handdleAddItem}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="detail-long-desc">
                <button type="button">DESCRIPTION</button>
                <h2>PRODUCT DESCRIPTION</h2>
                <p>{data.long_desc}</p>
              </div>

              {related.length > 0 && (
                <div className="related-products">
                  <h2>RELATED PRODUCTS</h2>
                  <ProductList
                    data={related}
                    onClick={detailProduct}
                    className="related-list"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
