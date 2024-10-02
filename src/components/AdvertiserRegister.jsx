import React, { useState, useEffect } from "react";

const AdvertiserRegister = () => {
  const [products, setProducts] = useState([]); // 상품 데이터 상태
  const [loadedProducts, setLoadedProducts] = useState(0); // 로드된 상품 수
  const productsPerLoad = 20; // 한 번에 로드할 상품 수

  // 상품 데이터를 생성하는 함수 (기존의 자바스크립트 배열 생성 부분)
  const generateProducts = () => {
    return Array.from({ length: 100 }, (_, i) => ({
      rank: i + 1,
      imageSrc: `./images/${(i + 1) % 10 === 0 ? 10 : (i + 1) % 10}.jpg`,
      name: `상품명 ${i + 1}`,
      brand: "브랜드명",
      originalPrice: (Math.floor(Math.random() * 100) + 1) * 10000,
      discountedPrice: (Math.floor(Math.random() * 100) + 1) * 10000 * 0.8,
      discount: "20%",
      reviews: `리뷰 ${Math.floor(Math.random() * 500)}개`,
    }));
  };

  // 초기 로딩 시 상품 데이터 생성
  useEffect(() => {
    const allProducts = generateProducts();
    setProducts(allProducts.slice(0, productsPerLoad)); // 처음 20개 상품 로드
  }, []);

  // 스크롤에 따라 추가 상품을 로드하는 함수
  const loadMoreProducts = () => {
    const allProducts = generateProducts();
    const nextProducts = allProducts.slice(
      loadedProducts,
      loadedProducts + productsPerLoad
    );
    setProducts((prevProducts) => [...prevProducts, ...nextProducts]);
    setLoadedProducts((prevLoaded) => prevLoaded + productsPerLoad);
  };

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        loadMoreProducts(); // 스크롤이 끝에 도달하면 추가 상품 로드
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
  }, [loadedProducts]);

  return (
    <>
      {/* 페이지 헤더 */}
      <header className="bg-light py-1">
        <div className="container">
          <h1 className="display-4 text-center">광고주 입찰 페이지</h1>
        </div>
      </header>

      {/* 상품명 박스 정렬 */}
      <div className="container mt-4">
        <div id="bid-list" className="row justify-content-center">
          {/* 상품 목록을 출력 */}
          {products.map((product, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
              <div className="product-item border p-3">
                <div className="product-rank">{product.rank}</div>
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

export default AdvertiserRegister;
