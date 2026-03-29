import { useState } from "react";
// import "./style.css"
import Sidebar from "../layout/Sidebar/Sidebar";
import Pagination from "../layout/Paginagion";
import { Link } from "react-router-dom";

function SubCategory({categoryId}) {

    const Categories = [
        { subcategory_id: 1, subcategory_name: "Chemical & Petrochemicals", id: 1, name: "Aviation", img: "/images/category/chemical/c1.jpg" },
        { subcategory_id: 2, subcategory_name: "Commercial Equipment", id: 2, name: "Avilding Materials", img: "/images/category/commercial/h2.jpg" },
        { subcategory_id: 3, subcategory_name: "Computer & Peripherals", id: 3, name: "Cvemicals, Minerals, Fertilizers and Plastics", img: "/images/category/computer/computer1.jpg" },
        { subcategory_id: 4, subcategory_name: "Electrical Utilities & Downstream", id: 4, name: "Commercial Equipment", img: "/images/category/electrical/dan-meyers-cHR1Q2g1_F4-unsplash.jpg" },
        { subcategory_id: 5, subcategory_name: "Marine", id: 5, name: "Computers & Peripherals", img: "/images/category/havyEqupment/project-1-4.jpg" },
        { subcategory_id: 6, subcategory_name: "Oil & Gas", id: 6, name: "Consumer Goods", img: "/images/category/oilgas/og1.jpg" },
        { subcategory_id: 7, subcategory_name: "Solar", id: 7, name: "Energy Oil, Gas and Utilities", img: "/images/category/solar/fact-counter-bg.jpg" },
        { subcategory_id: 8, subcategory_name: "Transportation/Vehicles/Mobile Assets", id: 8, name: "Heavy Equipment", img: "/images/category/havyEqupment/project-1-5.jpg" },
        { subcategory_id: 9, subcategory_name: "Heavy Equipment", id: 9, name: "Marine", img: "/images/category/havyEqupment/h4.jpg" },
        { subcategory_id: 10, subcategory_name: "Building Materials", id: 10, name: "Metals", img: "/images/category/buildingMaterials/project-1-1.jpg" },
        { subcategory_id: 6, subcategory_name: "Oil & Gas", id: 11, name: "Paper & Pulp", img: "/images/category/oilgas/og2.jpg" },
        { subcategory_id: 1, subcategory_name: "Chemical & Petrochemicals", id: 12, name: "Solar", img: "/images/category/chemical/c2.jpg" },
        { subcategory_id: 6, subcategory_name: "Oil & Gas", id: 13, name: "Textiles", img: "/images/category/oilgas/og3.avif" },
        { subcategory_id: 7, subcategory_name: "Solar", id: 14, name: "Transportation / Vehicles / Mobile Assets", img: "https://html.themexriver.com/industrio/img/blog-2-1.jpg" },
        { subcategory_id: 2, subcategory_name: "Commercial Equipment", id: 15, name: "Wind Energy", img: "/images/category/commercial/project-1-4.jpg" }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const categoriesPerPage = 12;

    const filteredByCategory = Categories.filter(
        (item) => item.subcategory_id === Number(categoryId)
    );
    /* 🔎 Filter products based on search */
    const filteredCategories = filteredByCategory.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastIndex = currentPage * categoriesPerPage;
    const firstIndex = lastIndex - categoriesPerPage;

    const currentCategories = filteredCategories.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

    return (

        <section className="product-section py-5">
            <div className="container" style={{ marginTop: '10rem', marginBottom: '10rem' }}>
                <div className="row">
                    {/* Sidebar LEFT */}
                    <div className="col-md-3">
                        <Sidebar setSearchTerm={setSearchTerm} />
                    </div>


                    {/* Product Grid */}
                    <div className="col-md-9">
                        <h3 style={{ marginTop: 0 }}>{filteredByCategory[0]?.subcategory_name || "Categories"} - Categories</h3>
                        <div className="row">

                            <div className="row g-4">

                                {currentCategories.map((item) => (
                                    <div className={`${currentCategories.length === 1
                                            ? "col-lg-12 col-md-12"
                                            : currentCategories.length === 2
                                                ? "col-lg-6 col-md-6"
                                                : currentCategories.length === 3
                                                    ? "col-lg-4 col-md-4"
                                                    : "col-lg-3 col-md-3 col-sm-6"
                                        }`} key={item.id}>
                                        <Link to="/products/4">

                                            <div className="category-box" style={{ width: '20rem' }}>

                                                <img
                                                    src={item.img}
                                                    className="product-img"
                                                    alt={item.name}
                                                />

                                                <p className="product-title">
                                                    {item.name}
                                                </p>

                                            </div>
                                        </Link>

                                    </div>
                                ))}

                            </div>

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

export default SubCategory;