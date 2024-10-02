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

const Home = () => {
  const [loadedProducts, setLoadedProducts] = useState([]); // 화면에 로드된 상품 상태 관리
  const [loadedCount, setLoadedCount] = useState(10); // 초기 로드 상품 개수
  const productsPerLoad = 10; // 한 번에 로드할 상품 수

  // 초기 로딩 시 첫 10개의 상품을 로드
  useEffect(() => {
    setLoadedProducts(products.slice(0, loadedCount));
  }, [loadedCount]);

  // 스크롤이 끝에 도달할 때 추가 상품 로드
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        loadMoreProducts(); // 스크롤 끝에 도달하면 추가 상품 로드
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
  }, []);

  // 추가로 10개의 상품을 로드하는 함수
  const loadMoreProducts = () => {
    if (loadedCount < products.length) {
      setLoadedCount((prevCount) => prevCount + productsPerLoad);
    }
  };

  return (
    <>
      {/* 페이지 헤더 */}
      <header className="bg-light py-1">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-expanded="true"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse collapse justify-content-end mt-2"
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    회원가입
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/advertiser-register">
                    광고주 등록
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/request">
                    요청합니다
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inquiry">
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <h1 className="display-4 text-center">
            <a
              href="#"
              className="event-link"
              onClick={() => window.location.reload()}
            >
              All events
            </a>
          </h1>
        </div>
      </header>

      {/* 검색 박스 */}
      <div className="container text-center mt-3">
        <div className="search-container">
          <form action="/search" method="get">
            <input
              type="text"
              placeholder="Search events..."
              name="query"
              className="form-control d-inline-block w-50"
            />
            <button type="submit" className="btn btn-primary ml-2">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 가격대별 버튼 */}
      <div className="container text-center mt-1 mb-1">
        <div className="row">
          <div className="col text-center mt-3 mb-1">
            <Link to="/price-under-300k" className="btn btn-outline-secondary">
              ~ 300,000
            </Link>
          </div>
          <div className="col text-center mt-3 mb-1">
            <Link to="/price-under-1000k" className="btn btn-outline-secondary">
              300,000 ~ 1,000,000
            </Link>
          </div>
          <div className="col text-center mt-3 mb-1">
            <Link to="/price-above-1000k" className="btn btn-outline-secondary">
              1,000,000 ~
            </Link>
          </div>
        </div>
      </div>

      {/* 상품 리스트 */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          {loadedProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-2 mb-4">
              <div className="product-item border p-3">
                <div className="product-rank">{product.id}</div>
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="img-fluid mb-2"
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
                <button className="btn btn-primary btn-block mt-2">
                  입찰하기
                </button>
                <button className="btn btn-secondary btn-block mt-2">
                  홍보하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
