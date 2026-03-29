import "./pagination.css";

function Pagination({ totalPages, currentPage, setCurrentPage }) {

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav className="custom-pagination">
      <ul>

        {/* Previous */}
        <li className={currentPage === 1 ? "disabled" : ""}>
          <button onClick={handlePrev}>‹</button>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next */}
        <li className={currentPage === totalPages ? "disabled" : ""}>
          <button onClick={handleNext}>›</button>
        </li>

      </ul>
    </nav>
  );
}

export default Pagination;