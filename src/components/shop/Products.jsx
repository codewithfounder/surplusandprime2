import { useState } from "react";
import "./style.css";
import Sidebar from "../layout/Sidebar/Sidebar";
import Pagination from "../layout/Paginagion";
import { Link } from "react-router-dom";

function ProductListing() {
  const products = [
    { id: 1, name: "Aviation", img: "/images/category/oilgas/og1.jpg" },
    { id: 2, name: "Avilding Materials", img: "/images/category/oilgas/og2.jpg" },
    { id: 3, name: "Cvemicals, Minerals, Fertilizers and Plastics", img: "https://html.themexriver.com/industrio/img/blog-2-1.jpg" },
    { id: 4, name: "Commercial Equipment", img: "/images/category/oilgas/og3.avif" },
    { id: 5, name: "Computers & Peripherals", img: "/images/category/buildingMaterials/project-1-1.jpg" },
    { id: 6, name: "Consumer Goods", img: "/images/category/buildingMaterials/project-1-2.jpg" },
    { id: 7, name: "Energy Oil, Gas and Utilities", img: "/images/category/chemical/c1.jpg" },
    { id: 8, name: "Heavy Equipment", img: "/images/category/commercial/h2.jpg" },
    { id: 9, name: "Marine", img: "/images/category/computer/computer1.jpg" },
    { id: 10, name: "Metals", img: "/images/category/chemical/c2.jpg" },
    { id: 11, name: "Paper & Pulp", img: "/images/category/commercial/project-1-4.jpg" },
    { id: 12, name: "Solar", img: "/images/category/computer/computer2.jpg" },
    { id: 13, name: "Textiles", img: "/images/category/havyEqupment/h4.jpg" },
    { id: 14, name: "Transportation / Vehicles / Mobile Assets", img: "/images/category/havyEqupment/project-1-4.jpg" },
    { id: 15, name: "Wind Energy", img: "/images/category/havyEqupment/project-1-5.jpg" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const productsPerPage = 12;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="product-section py-5">
      <div className="container" style={{ marginTop: "10rem", marginBottom: "10rem" }}>
        <div className="row">
          
          {/* Sidebar */}
          <div className="col-md-3">
            <Sidebar setSearchTerm={setSearchTerm} />
          </div>

          {/* Products */}
          <div className="col-md-9">
            <h3>Latest - <span>Products</span></h3>

            <div className="row g-4">
              {currentProducts.map((product) => (
                <div
                  className="col-12 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <Link
                    to={`/product-details/${product.id}`}
                    className="text-decoration-none"
                  >
                    <div className="product-box h-100">
                      <img
                        src={product.img}
                        className="product-img"
                        alt={product.name}
                      />

                      <div className="product-content">
                        <p className="product-title">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProductListing;