import "./style.css"
import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ setSearchTerm }) {
  const [openCategory, setOpenCategory] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  return (
    <div className="sidebar sidebar-right">

      <div className="single-sidebar search-widget">
        <form action="#">
          <input type="text" placeholder="Search..." onChange={handleSearch} />
          <button type="submit" className="fa fa-search"></button>
        </form>
      </div>

      <div className="single-sidebar recent-post-widget">
        <div className="title">
          <h3>Recent <span style={{ fontSize: '1.7rem', color: '#21aa47' }}>Product</span></h3>
        </div>
        <div className="recent-post-list">
          <div className="single-recent-post">
            <Link to="/product-details/13"><h3>Business structured are changed by appilo team</h3></Link>
          </div>
          <div className="single-recent-post">
            <Link to="/product-details/14"><h3>There are many variations of passages of Lorem Ipsum</h3></Link>
          </div>
        </div>
      </div>

      <div className="single-sidebar category-widget">
        <div className="title">
          <h3>Categories</h3>
        </div>
        <ul className="category-list" style={{ paddingLeft: '1rem' }}>
          <li>
            <a className="clearfix"
              onClick={() => toggleCategory("chemical-petrochemicals")}
              style={{ cursor: "pointer" }}>
              Chemical & Petrochemicals <span className="count">(3)</span>
            </a>

            {openCategory === "chemical-petrochemicals" && (
              <ul className="subcategory-list">
                <li><a href="#">Men Fashion</a></li>
                <li><a href="#">Women Fashion</a></li>
                <li><a href="#">Kids Fashion</a></li>
              </ul>
            )}
          </li>
          <li>
            <a className="clearfix"
             onClick={() => toggleCategory("commercial-equipment")}
              style={{ cursor: "pointer" }}>
              Commercial Equipment <span className="count">(4)</span>
            </a>
            {openCategory === "commercial-equipment" && (
              <ul className="subcategory-list">
                <li><a href="#">Startup</a></li>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Finance</a></li>
              </ul>
            )}
          </li>
          <li>
            <a className="clearfix"
             onClick={() => toggleCategory("computer-peripherals")}
              style={{ cursor: "pointer" }}>
              Computer & Peripherals <span className="count">(3)</span>
            </a>
            {openCategory === "computer-peripherals" && (
              <ul className="subcategory-list">
                <li><a href="#">Strategy</a></li>
                <li><a href="#">Operations</a></li>
                <li><a href="#">IT Consulting</a></li>
              </ul>
            )}
          </li>
          <li>
            <a className="clearfix"
             onClick={() => toggleCategory("electrical-utilities")}
              style={{ cursor: "pointer" }}>
              Electrical Utilities <span className="count">(3)</span>
            </a>
            {openCategory === "electrical-utilities" && (
              <ul className="subcategory-list">
                <li><a href="#">Strategy</a></li>
                <li><a href="#">Operations</a></li>
                <li><a href="#">IT Consulting</a></li>
              </ul>
            )}
          </li>
            <li>
            <a className="clearfix"
             onClick={() => toggleCategory("marine")}
              style={{ cursor: "pointer" }}>
              Marine <span className="count">(3)</span>
            </a>
            {openCategory === "marine" && (
              <ul className="subcategory-list">
                <li><a href="#">Strategy</a></li>
                <li><a href="#">Operations</a></li>
                <li><a href="#">IT Consulting</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Sidebar;