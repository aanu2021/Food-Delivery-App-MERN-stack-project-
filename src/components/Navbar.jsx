import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";

const Navbar = () => {
  const [flag, setFlag] = useState(true);
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const data = useCart();

  useEffect(() => {
    setInterval(() => {
      if (localStorage.getItem("authToken")) {
        setFlag(false);
      } else {
        setFlag(true);
      }
    }, 1000);
  });

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 animate" to="/">
              Zomiggy
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item navitem">
                  <NavLink className="nav-link fs-4" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item navitem">
                  {!flag ? (
                    <>
                      <NavLink
                        className="nav-link fs-4"
                        aria-current="page"
                        to="/myorders"
                      >
                        My Orders
                      </NavLink>
                    </>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              <div className="d-flex">
                {!flag ? (
                  <>
                    <div
                      className="btn btn-lg btn-warning mx-3"
                      aria-current="page"
                      onClick={() => setCartView(true)}
                    >
                      My Cart
                      {"  "}
                      {data.length > 0 ? (
                        <Badge pill bg="danger">
                          {" "}
                          {data.length}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </div>
                    {cartView ? (
                      <Modal onClose={() => setCartView(false)}>
                        <Cart />
                      </Modal>
                    ) : null}
                    <div
                      className="btn btn-lg btn-warning mx-3 text-danger"
                      aria-current="page"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink
                      className="btn btn-lg btn-warning mx-3"
                      to="/signup"
                    >
                      Sign Up
                    </NavLink>

                    <NavLink
                      className="btn btn-lg btn-warning mx-3"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {

//   return (
//     <>
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <div className="container-fluid">
//             <Link className="navbar-brand fs-1" to="/">
//               Zomiggy
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav me-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link active" aria-current="page" to="/">
//                     Home
//                   </Link>
//                 </li>

//                 {/* <li className="nav-item">
//                   <Link className="nav-link" to="/signup">
//                     Sign Up
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     Login
//                   </Link>
//                 </li> */}
//               </ul>
//               <div className="d-flex">
//                 {(localStorage.getItem("authToken")) ? (
//                   <Link
//                     className="btn btn-lg btn-warning mx-3"
//                     aria-current="page"
//                     to="/"
//                   >
//                     My Orders
//                   </Link>
//                 ) : (
//                   ""
//                 )}
//                 {(localStorage.getItem("authToken")) ? (
//                   ""
//                 ) : (
//                   <>
//                     <Link className="btn btn-lg btn-warning mx-3" to="/signup">
//                       Sign Up
//                     </Link>
//                     <Link className="btn btn-lg btn-warning mx-3" to="/login">
//                       Login
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Navbar;
