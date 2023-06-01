import React, {useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  let options = props.options;
  let keys = Object.keys(options);

  let data = useCart();
  let dispatch = useDispatchCart();

  let defaultSize = "";

  if (props.foodItem.CategoryName === "Pizza") {
    defaultSize = "regular";
  } else {
    defaultSize = "half";
  }

  const [qty, setQty] = useState("1");
  const [size, setSize] = useState(defaultSize);
  const [price, setPrice] = useState(parseInt(options[defaultSize]));

  const handleAddToCart = async () => {
    let currPrice = parseInt(qty) * parseInt(options[size]);
    setPrice(currPrice.toString());

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: currPrice,
      qty: qty,
      size: size,
      img : props.foodItem.img
    });
    console.log(data);
  };

  return (
    <>
      <div
        className="card mt-5 pb-5"
        style={{ width: "18rem", maxHeight: "512px", maxWidth: "500px" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-info rounded"
              onChange={(event) => setQty(event.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-info rounded"
              onChange={(event) => setSize(event.target.value)}
            >
              {keys.map((ele) => {
                return (
                  <>
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  </>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5 mt-2 mx-2">
              {price} <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>
            </div>
          </div>
          <hr />
          <button
            className="btn btn-lg btn-warning justify-center ms-2 cartContainer"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
