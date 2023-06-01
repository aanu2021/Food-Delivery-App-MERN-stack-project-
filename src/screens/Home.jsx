import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  const loadData = async () => {
    const response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setFoodItems(res[0]);
    setFoodCategory(res[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const inputEvent = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Type in..."
                  aria-label="Search"
                  value={search}
                  onChange={inputEvent}
                />
              </div>
            </div>
            <div className="carousel-item active" data-bs-interval="5000">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100 "
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src="https://source.unsplash.com/random/900x700/?cake"
                className="d-block w-100 "
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        <div className="container">
          {foodCategory.map((category) => {
            return (
              <>
                <hr />
                <div>
                  <div key={category._id} className="fs-3 m-3">
                    {category.CategoryName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  {foodItems
                    .filter((items) => {
                      return (
                        items.CategoryName === category.CategoryName &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                      );
                    })
                    .map((ele) => {
                      return (
                        <>
                          <div className="col-12 col-md-6 col-lg-4 mb-5">
                            <Card
                              key={ele._id}
                              foodItem={ele}
                              options={ele.options[0]}
                            />
                          </div>
                        </>
                      );
                    })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
