import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Service() {
  const services = [
    {
      img: "images/service-3-1.jpg",
      icon: "industrio-icon-gas-station-1",
      title1: "Fuel & Gas",
      title2: "Management",
    },
    {
      img: "images/service-3-2.jpg",
      icon: "industrio-icon-flasks",
      title1: "Chemical",
      title2: "Research",
    },
    {
      img: "images/service-3-3.jpg",
      icon: "industrio-icon-atomic",
      title1: "Echo & Bio",
      title2: "Power",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
    <section className="service-style-four about-page">
      <div className="container">
        <div className="sec-title">
          <div className="row">
            <div className="col-md-4">
              <h3>
                Why choose <span>Industrio</span> for your business
              </h3>
            </div>
            <div className="col-md-8">
              <p>
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                sed quia consequuntur magni dolores eos qui ratione vol.
              </p>
            </div>
          </div>
        </div>

        <Slider {...settings}>
          {services.map((service, index) => (
            <div className="item" key={index}>
              <div className={`single-service-style-four ${service.title1.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="img-box">
                  <img src={service.img} alt={service.title1} />
                  <div className="box">
                    <div className="content">
                      <i className={service.icon}></i>
                      <h3>
                        <span>{service.title1}</span> <br />
                        {service.title2}
                      </h3>
                      <a href="#" className="more hvr-sweep-to-right">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
    </>
  );
}

export default Service;