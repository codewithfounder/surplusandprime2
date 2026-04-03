import { useState } from "react";
import {useNavigate} from 'react-router-dom';

function Details({ productId }) {
    const navigate = useNavigate();

    // const isLoggedIn = localStorage.getItem("token");
    const user = localStorage.getItem('user');
    const isLoggedIn = JSON.parse(user).login;

    const handleEnquiryClick = () => {
        if (isLoggedIn) {

            const existingProducts = JSON.parse(localStorage.getItem("enquiryProduct")) || [];

            const alreadyExists = existingProducts.find(
                (item) => item.id === product.id
            );

            if (!alreadyExists) {
                existingProducts.push(product);
                localStorage.setItem("enquiryProduct", JSON.stringify(existingProducts));
            }

            navigate(`/enquiry/${product.id}`);
        } else {
            navigate("/login", {
                state: { from: `/enquiry/${product.id}` }
            });
        }
    };

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

    const selectedProduct = products.find(
        (item) => item.id === Number(productId)
    );

    const product = {
        id: selectedProduct?.id,
        name: selectedProduct?.name,
        seller: "Confidential",
        sellerIndustry: "Confidential",
        quantity: "1 Engine",
        manufacturer: "Pratt & Whitney",
        condition: "Unserviceable because of LLP expiry.",
        location: "Switzerland",
        endTime: "Bid As Soon As Possible",
        images: [
            selectedProduct?.img,
            "https://html.themexriver.com/industrio/img/blog-2-2.jpg",
            "https://html.themexriver.com/industrio/img/blog-2-3.jpg",
            "https://html.themexriver.com/industrio/img/blog-2-4.jpg"
        ],
        description: "The Pratt & Whitney PW4152 is a high-bypass turbofan engine that is part of the PW4000 series, which is designed for commercial aircraft. This engine is typically used to power wide-body aircraft and is known for its efficiency and reliability. The PW4152 engine is specifically used in the propulsion system of an aircraft, providing the necessary thrust for flight. <br> The Pratt & Whitney PW4152 engine is manufactured by Pratt & Whitney, a prominent American aerospace manufacturer with a long history in the design, manufacture, and service of aircraft engines. Pratt & Whitney is a division of Raytheon Technologies and is known for producing a wide range of engines for both commercial and military aviation. The PW4000 series, which includes the PW4152, is a family of high-bypass turbofan engines that are used on various wide-body aircraft, such as the Airbus A300, A310, A330, and the Boeing 747, 767, and MD-11. The PW4152 engine is part of the PW4000 series, which is recognized for its reliability, efficiency, and performance. These engines are designed to meet the demands of long-haul flights and are known for their durability and ease of maintenance. Pratt & Whitney has a strong reputation in the aerospace industry for innovation and quality, making them a leading manufacturer of aircraft engines worldwide."
    };

    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0] || ""
    );


    return (
        <section className="product-details-section py-5">
            <div className="container" style={{ marginTop: "8rem", marginBottom: "6rem" }}>
                <div className="row">

                    {/* LEFT IMAGE SECTION */}
                    <div className="col-md-5" style={{ marginTop: '7.2rem' }}>

                        <img
                            src={selectedImage}
                            alt=""
                            style={{
                                width: "100%",
                                height: "420px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginBottom: "15px"
                            }}
                        />

                        <div className="d-flex gap-2 flex-wrap">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    onClick={() => setSelectedImage(img)}
                                    style={{
                                        width: "80px",
                                        height: "70px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                        borderRadius: "6px",
                                        border:
                                            selectedImage === img
                                                ? "2px solid #21aa47"
                                                : "1px solid #ddd"
                                    }}
                                />
                            ))}
                        </div>

                    </div>

                    {/* RIGHT DETAILS SECTION */}
                    <div className="col-md-7">

                        <h3 style={{ marginBottom: "25px", fontWeight: "600" }}>
                            Item Details
                        </h3>

                        <div className="detail-box">

                            <div className="detail-row">
                                <span className="label">Product ID</span>
                                <span className="value">{product.id}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Seller</span>
                                <span className="value">{product.seller}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Seller Industry</span>
                                <span className="value">{product.sellerIndustry}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Quantity</span>
                                <span className="value">{product.quantity}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Manufacturer</span>
                                <span className="value">{product.manufacturer}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Condition</span>
                                <span className="value">
                                    <span className="badge bg-success">Unserviceable</span>
                                    <br />
                                    {product.condition}
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Product Location</span>
                                <span className="value">{product.location}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">End Time</span>
                                <span className="value">{product.endTime}</span>
                            </div>

                            <div className="mt-4" style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                                <button
                                    className="btn btn-success outline-0"
                                    style={{ padding: "10px 25px", fontWeight: "500", outline: 'none', border:"none" }}
                                    onClick={handleEnquiryClick}
                                >
                                    Enquiry Now
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* DESCRIPTION */}
                <div className="row mt-5">
                    <div className="col-12" style={{padding: '2rem'}}>
                        <h3>Product Description</h3>
                        <p>
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* STYLES */}
            <style jsx="true">{`
        .detail-box {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #eee;
        }

        .detail-row {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid #f1f1f1;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .label {
          width: 200px;
          font-weight: 600;
          color: #333;
          position: relative;
        }

        .label::after {
          content: ":";
          position: absolute;
          right: 15px;
        }

        .value {
          flex: 1;
          color: #555;
        }

        .badge {
          font-size: 12px;
          margin-bottom: 5px;
        }
      `}</style>

        </section>
    );
}

export default Details;