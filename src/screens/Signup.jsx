import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [geolocation, setGeoLocation] = useState("");

  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    let latlong = await navLocation().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });
    // console.log(latlong)
    let [lat, long] = latlong;
    console.log(lat, long);
    const response = await fetch("http://localhost:5000/api/getlocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latlong: { lat, long } }),
    });
    const { location } = await response.json();
    // console.log(location);
    setGeoLocation(location);
    setCredentials({ ...credentials, [event.target.name]: location });
  };

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const inputEvent2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setGeoLocation(value);
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          location: credentials.location,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const jsonData = await response.json();
      // console.log(jsonData);
      if (jsonData.success === true) {
        navigate("/login");
      } else {
        alert("Enter Valid Credentials.....");
      }
    } catch (error) {
      console.log(error);
      alert("Enter Valid Credentials.....");
    }
  };

  return (
    <>
      <div className="container">
        <div className="container2">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={credentials.name}
                className="form-control"
                autoComplete="off"
                onChange={inputEvent}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Address
              </label>
              <fieldset>
                <input
                  type="text"
                  name="location"
                  value={geolocation}
                  className="form-control"
                  autoComplete="off"
                  onChange={inputEvent2}
                />
              </fieldset>
            </div>

            <div className="mb-3 mt-4">
              <button
                className="btn btn-lg btn-warning"
                name="location"
                type="button"
                onClick={handleClick}
              >
                Click for current Location{" "}
              </button>
            </div>

            <button type="submit" className="mb-3 mt-3 btn btn-lg btn-warning">
              Signup
            </button>
            <button className="mb-3 mx-3 mt-3 btn btn-lg btn-warning">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Already a user
              </Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
