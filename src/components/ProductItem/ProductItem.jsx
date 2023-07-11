import React from "react";
import "./ProductItem.css";
import { formatPrice } from "../../utils/utils";

const ProductItem = (props) => {
  const { item, onClick, className } = props;
  return (
    <div className={`product-item ${className ? className : ""}`}>
      <img src={item.img1} alt={item.category} onClick={() => onClick()} />
      <h3>{item.name}</h3>
      <p>
        {formatPrice(item.price)}
      </p>
    </div>
  );
};

export default ProductItem;
