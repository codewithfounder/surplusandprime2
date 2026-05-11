import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";

import "flickity/css/flickity.css";
import "./Gallery.css";

const flickityOptions = {
  wrapAround: true,
  autoPlay: 2500,
  pageDots: true,
  prevNextButtons: true,
  contain: true,
  groupCells: true
};

const getCategoryText = (title) => {
  return `Explore our wide range of ${title} with premium quality and best prices.`;
};

export default function Gallery() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/category/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div className="category-container">
      <div className="container"> {/* 👈 added */}

        <div className="sec-title section-title text-center">
          <h3>Our <span>Category</span></h3>
        </div>

        <Flickity
          className="gallery"
          elementType="div"
          options={flickityOptions}
        >
          {categories.map((item) => (
            <div className="gallery-cell" key={item.id}>
              <Link to={`/category/${item.id}`}>
                <img
                  src={`${item.image_url}${item.Image}`}
                  alt={item.Title}
                />

                <div className="content">
                  <h3>{item.Title}</h3>
                </div>

                <div className="hover-overlay">
                  <h3 style={{textAlign: "center"}}>{item.Title}</h3>
                  <p style={{ color: "#21aa47", padding: "10px", textAlign: "center" }}>
                    {getCategoryText(item.Title)}
                  </p>
                  <span className="btn">View Details</span>
                </div>

              </Link>
            </div>
          ))}
        </Flickity>

      </div>
    </div>
  );
}