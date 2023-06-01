import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.success === true) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", jsonData.authToken);
        navigate("/");
      } else {
        alert("Enter Valid Login Details.....");
      }
    } catch (error) {
      console.log(error);
      alert("Enter Valid Login Details.....");
    }
  };

  return (
    <>
      <div className="container">
        <div className="container2">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                className="form-control"
                autoComplete="off"
                onChange={inputEvent}
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                className="form-control"
                autoComplete="off"
                onChange={inputEvent}
              />
            </div>

            <button type="submit" className="mb-3 btn btn-lg btn-warning">
              Login
            </button>
            <button className="mb-3 mx-3 btn btn-lg btn-warning">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create new account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
