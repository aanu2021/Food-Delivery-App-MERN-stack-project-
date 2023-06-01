import React from "react";

const Carousel = () => {
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
              <form className=" d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Type in..."
                  aria-label="Search"
                />
                <button className="btn text-white bg-danger" type="submit">
                  Search
                </button>
              </form>
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
    </>
  );
};

export default Carousel;
