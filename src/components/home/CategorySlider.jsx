import React from "react";
import Slider from "react-slick";
import "./category.css";
import { Link } from "react-router-dom";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {

  const services = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541434906604-62e6f6fed8e9",
      title: "Chemical & Petrochemicals",
      desc: "Quality chemical and petrochemical solutions for industry growth."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1738438308780-35331af703a8",
      title: "Commercial Equipment",
      desc: "Reliable commercial equipment for efficient business operations."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1567665184315-5581ad476373",
      title: "Computer & Peripherals",
      desc: "Shows load data, height, angle, and warnings to the operator."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1762608674180-2e6e19ffb614",
      title: "Electrical Utilities & Downstream",
      desc: "Power grids, utilities, and downstream energy delivery services."
    },
    {
      id: 5,
      image: "https://plus.unsplash.com/premium_photo-1682148795124-dac95dd91fd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8T2lsJTIwJTI2JTIwR2FzfGVufDB8fDB8fHww",
      title: "Oil & Gas",
      desc: "Powering progress through efficient oil and gas exploration daily."
    }
  ];

  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  lazyLoad: 'ondemand',  // <-- lazy loading
  responsive: [
    {
      breakpoint: 992,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 576,
      settings: { slidesToShow: 1 }
    }
  ]
};

  return (
    <section className="category-slider">
      <div className="container">

        <div className="section-title text-center">
          <h2>Our <span>Category</span></h2>
          <p>Explore our Surplus & Prime World product categories and equipment.</p>
        </div>

        <Slider {...settings}>
          {services.map((item) => (
            <div key={item.id} className="category-card">

              <div className="card">
                {/* Image */}
                <img src={item.image} alt={item.title} />

                {/* Bottom title */}
                <div className="overlay-bottom">
                  <h3>{item.title}</h3>
                </div>

                {/* Hover overlay */}
                <div className="overlay-hover">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link to={`/category/${item.id}`} className="btn btn-light">
                    View More
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
}