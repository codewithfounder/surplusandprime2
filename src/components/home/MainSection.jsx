import React from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    img: "images/h1.png",
    align: "text-center",
    title: "We will provide the best",
    highlight: "Products",
    desc: "",
    active: true
  },
  {
    img: "images/h2.jpg",
    align: "text-center",
    title: "We will provide the best",
    highlight: "Products",
    desc: "We are the best guarenteed company to serve you. We are dedicated to help you any time."
  },
  {
    img: "images/h3.png",
    align: "text-center",
    title: "We will provide the best",
    highlight: "Products",
    desc: "We are the best guarenteed company to serve you. We are dedicated to help you any time."
  }
];

function MainSection() {
  return (
    <div
      id="minimal-bootstrap-carousel"
      className="carousel slide carousel-fade slider-home-one slider-home-three"
      data-ride="carousel"
    >

      {/* Slides */}
      <div className="carousel-inner" role="listbox">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`item ${slide.active ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundPosition: "center center"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)", // adjust opacity here
                zIndex: 1
              }}
            ></div>
            <div className="carousel-caption">
              <div className="container">
                <div className="box valign-middle">
                  <div className={`content ${slide.align}`}>

                    <h2 data-animation="animated fadeInUp">
                      {slide.title} <span>{slide.highlight}</span> World Wide.
                    </h2>

                    {slide.desc && (
                      <p data-animation="animated fadeInDown">
                        {slide.desc}
                      </p>
                    )}

                    <Link
                      to="/shop"
                      className="banner-btn hvr-sweep-to-right"
                      data-animation="animated fadeInDown"
                    >
                      Shop Now <i className="fa fa-arrow-right"></i>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Controls */}
      <a
        className="left carousel-control"
        href="#minimal-bootstrap-carousel"
        role="button"
        data-slide="prev"
      >
        <i className="fas fa-angle-left"></i>
      </a>

      <a
        className="right carousel-control"
        href="#minimal-bootstrap-carousel"
        role="button"
        data-slide="next"
      >
        <i className="fas fa-angle-right"></i>
      </a>

      {/* Indicators */}
      <ul className="carousel-indicators list-inline custom-navigation">
        {slides.map((_, index) => (
          <li
            key={index}
            data-target="#minimal-bootstrap-carousel"
            data-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></li>
        ))}
      </ul>

    </div>
  );
}

export default MainSection;