import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Cart = () => {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async() => {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:5000/api/orderdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          order_data : data,
          order_date : new Date().toLocaleString()
        }),
      });
      if(response.status === 200){
          await dispatch({type:"DROP"});
      }

  };

  return (
    <>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn btn-lg bg-warning mt-5 "  onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
