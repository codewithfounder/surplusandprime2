import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL, {IMG_URL} from "../../config/api";

function Details({ productId }) {

    const navigate = useNavigate();
    const productimg = `${IMG_URL}/product/`;

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

    // Extract table
    const extractTable = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;

        const table = div.querySelector("table");
        return table ? table.outerHTML : "";
    };

    // Remove table from description
    const extractWithoutTable = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;

        const table = div.querySelector("table");
        if (table) table.remove();

        return div.innerHTML;
    };

    // Fetch API
    useEffect(() => {
        fetch(`${BASE_URL}/product/detail/${productId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setProduct(data.data);
                    setSelectedImage(data.data.image_url);
                }
            })
            .catch(err => console.error("API Error:", err));
    }, [productId]);

    // Enquiry
    const handleEnquiryClick = () => {
        if (!product) return;

        // Check if user is logged in
        const uid = localStorage.getItem("uid");

        if (!uid) {
            // Not logged in, save current product and redirect to login
            const existingProducts = JSON.parse(localStorage.getItem("enquiryProduct")) || [];
            const alreadyExists = existingProducts.find((item) => item.id === product.id);

            if (!alreadyExists) {
                existingProducts.push(product);
                localStorage.setItem("enquiryProduct", JSON.stringify(existingProducts));
            }

            // Save the intended URL to redirect after login
            localStorage.setItem("redirectAfterLogin", `/enquiry/${product.id}`);
            navigate("/login");
            return;
        }

        // User is logged in, proceed normally
        const existingProducts = JSON.parse(localStorage.getItem("enquiryProduct")) || [];
        const alreadyExists = existingProducts.find((item) => item.id === product.id);

        if (!alreadyExists) {
            existingProducts.push(product);
            localStorage.setItem("enquiryProduct", JSON.stringify(existingProducts));
        }

        navigate(`/enquiry/${product.id}`);
    };

    // Loading
    if (!product) {
        return <h3 style={{ textAlign: "center", marginTop: "10rem" }}>Loading...</h3>;
    }

    // Images
    const images = [
        product.image_url,
        product.image2 && product.image2 !== "0"
            ? `${productimg}${product.image2}`
            : null,
        product.image3 && product.image3 !== "0"
            ? `${productimg}${product.image3}`
            : null,
        product.image4 && product.image4 !== "0"
            ? `${productimg}${product.image4}`
            : null,
        product.image5 && product.image5 !== "0"
            ? `${productimg}${product.image5}`
            : null,
        product.image6 && product.image6 !== "0"
            ? `${productimg}${product.image6}`
            : null
    ].filter(Boolean);

    // Extract content
    const tableHTML = extractTable(product.Long_description || "");
    const descriptionHTML = extractWithoutTable(product.Long_description || "");

    return (
        <section className="product-details-section py-5">
            <div className="container" style={{ marginTop: "8rem", marginBottom: "6rem" }}>
                <div className="row">

                    {/* LEFT IMAGE */}
                    <div className="col-md-5">

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
                            {images.map((img, index) => (
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

                    {/* RIGHT DETAILS */}
                    <div className="col-md-7">

                        <h3 style={{ marginBottom: "25px", fontWeight: "600" }}>
                            {product.Title}
                        </h3>

                        <div className="detail-box">

                            <div className="detail-row">
                                <span className="label">Product ID</span>
                                <span className="value">: {product.id}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Category</span>
                                <span className="value">: {product.category_title}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Sub Category</span>
                                <span className="value">: {product.product_category_title}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Seller</span>
                                {/* <span className="value">: {product.saller}</span> */}
                                <span className="value">: Surplusandprime</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Date</span>
                                <span className="value">: {product.Date}</span>
                            </div>

                            <div className="navbar-btn text-center">
                                <button
                                    className="btn btn-success"
                                    style={{ padding: "10px 25px", border: "none" }}
                                    onClick={handleEnquiryClick}
                                >
                                    Enquire Now
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

                {/* SHORT DESCRIPTION */}
                <div className="row mt-5">
                    <div className="col-12" style={{ padding: '2rem' }}>
                        <h3>Short Description</h3>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.Short_description
                            }}
                        />
                    </div>
                </div>

                {/* FULL DESCRIPTION WITHOUT TABLE */}
                <div className="row mt-4">
                    <div className="col-12" style={{ padding: '2rem' }}>
                        <h3>Product Details</h3>

                        {/* RIGHT SIDE TABLE */}
                        {tableHTML ? (
                            <div className="mt-4">
                                <h5>Specifications</h5>

                                <div
                                    dangerouslySetInnerHTML={{ __html: tableHTML }}
                                />
                            </div>
                        ):(
                            <div
                                dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                            />
                        )}
                    </div>
                </div>

            </div>

            {/* TABLE STYLING */}
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

                .label {
                    width: 200px;
                    font-weight: 600;
                    color: #000;
                    display: flex;
                    justify-content: space-between;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }

                table td, table th {
                    border: 1px solid #ddd;
                    padding: 8px;
                }

                table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                table th {
                    background-color: #21aa47;
                    color: white;
                }
            `}</style>

        </section>
    );
}

export default Details;