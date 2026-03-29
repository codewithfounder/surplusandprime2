import React, {useState} from "react";

const filters = [
  { name: "All Cases", icon: "industrio-icon-layers", filter: ".masonary-item", active: true },
  { name: "Oil & Gas", icon: "industrio-icon-drop-of-liquid", filter: ".oil" },
  { name: "Heavy Equipments", icon: "industrio-icon-safety", filter: ".heavy-equipments" },
  { name: "Chemical", icon: "industrio-icon-atom", filter: ".chemical" },
  { name: "Computer & Peripherals", icon: "industrio-icon-settings", filter: ".computer-peripherals" }
];

const projects = [
  { img: "images/oil1.jpg", category: "oil" },
  { img: "images/gas1.avif", category: "oil" },
  { img: "images/project-1-5.jpg", category: "heavy-equipments" },
  { img: "images/project-1-4.jpg", category: "heavy-equipments" },
  { img: "images/c1.jpg", category: "chemical" },
  { img: "images/c2.jpg", category: "chemical" },
  { img: "images/computer1.jpg", category: "computer-peripherals" },
  { img: "images/computer2.jpg", category: "computer-peripherals" }
];

function Products() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  return (
    <section className="portfolio-style-two sec-pad">
      <div className="container">

        {/* Title */}
        <div className="sec-title text-center">
          <h3>
            Products for <span>inspirations</span>
          </h3>

          <p>
            Heavy industrial equipment, turbines, generators, compressors, cranes, pipes & oilfield <br />
            tools—new and surplus for energy projects.
          </p>
        </div>

        {/* Filters */}
        <div className="gallery-filter">
          <ul className="post-filter masonary text-center">
            {filters.map((item, index) => (
              <li
                key={index}
                className={`filter ${
                  activeFilter === item.filter.replace(".", "") || (item.active && activeFilter === "all")
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveFilter(
                    item.filter === ".masonary-item"
                      ? "all"
                      : item.filter.replace(".", "")
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <span>
                  <i className={item.icon}></i>
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="row">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="col-md-3 col-sm-6 col-xs-12"
            >
              <div className="single-portfolio-style-two">
                <div className="img-box">
                  <img src={project.img} alt="Project" />

                  <div className="overlay">
                    <div className="box">
                      <div className="content">
                        <span>Shop Now</span>

                        <a href="#">
                          <h3>Products Equipment</h3>
                        </a>

                        <a
                          href={project.img}
                          className="img-popup industrio-icon-next"
                        ></a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Products;