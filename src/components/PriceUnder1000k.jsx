import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 100개의 상품 데이터를 배열로 저장
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `상품명 ${i + 1}`,
  brand: "브랜드명",
  originalPrice: (Math.floor(Math.random() * 100) + 1) * 10000,
  discountedPrice: (Math.floor(Math.random() * 100) + 1) * 10000 * 0.8,
  discount: "20%",
  reviews: `리뷰 ${Math.floor(Math.random() * 500)}개`,
  imageSrc: `/images/${(i % 10) + 1}.jpg`, // 이미지 1~10까지 순차적으로 반복
}));

const PriceUnder1000k = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 300,000원 ~ 1,000,000원 상품만 필터링
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.discountedPrice >= 300000 && product.discountedPrice <= 1000000
    );
    setFilteredProducts(filtered);
  }, []);

  // 검색 기능
  const handleSearch = (e) => {
    const searchInput = e.target.value.toLowerCase();
    setSearchTerm(searchInput);
    const filtered = products.filter(
      (product) =>
        product.discountedPrice >= 300000 &&
        product.discountedPrice <= 1000000 &&
        (product.name.toLowerCase().includes(searchInput) ||
          product.brand.toLowerCase().includes(searchInput))
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mt-5">
      {/* "All events" 링크 */}
      <div className="container mt-3 text-center">
        <h2>
          <Link to="/" className="text-dark" style={{ textDecoration: "none" }}>
            All events
          </Link>
        </h2>
      </div>

      {/* 검색 박스 */}
      <div className="container mt-3 text-center">
        <form className="form-inline justify-content-center">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch} // 검색어 입력 시 필터링 함수 호출
          />
          <button type="button" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* 300,000원 ~ 1,000,000원 상품 리스트 */}
      <div className="container mt-5">
        <h1 className="display-4 text-center">
          300,000 ~ 1,000,000원 이하 상품
        </h1>
        <div className="row justify-content-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-2 mb-4">
                <div className="product-item border p-3">
                  <div className="product-rank">{product.id}</div>
                  <img
                    src={product.imageSrc}
                    className="img-fluid mb-2"
                    alt="상품 이미지"
                  />
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-brand">{product.brand}</p>
                  <p className="product-price">
                    <span className="original-price">
                      {product.originalPrice.toLocaleString("ko-KR")}원
                    </span>{" "}
                    <span className="discounted-price text-danger">
                      {product.discountedPrice.toLocaleString("ko-KR")}원
                    </span>
                  </p>
                  <p className="product-discount">{product.discount}</p>
                  <p className="product-reviews">{product.reviews}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceUnder1000k;
