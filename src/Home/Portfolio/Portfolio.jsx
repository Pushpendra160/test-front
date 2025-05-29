import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import {
  createPortfolio,
  getPortfolioByIdOrAll,
  deletePortfolio,
} from "../../services/portfolioService";

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      fetchPortfolios();
    }
  }, [isDataFetched]);

  function showImage(imageUrl) {
    let url = imageUrl;
    try {
      const imageArray = JSON.parse(imageUrl);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        url = imageArray[0];
      }
    } catch (e) {
      // imageUrl is not a stringified array, use it as is
    }
    return url;
  }

  const fetchPortfolios = async () => {
    try {
      const portfoliosData = await getPortfolioByIdOrAll();
      // Sort portfolios by order (ascending)
      const sortedPortfolios = portfoliosData.data.sort((a, b) => a.order - b.order);
      setPortfolios(sortedPortfolios);
      setIsDataFetched(true);
      // console.log("Portfolios fetched and sorted successfully:", sortedPortfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  return (
    <section className="portfolio-section container">
      <div className="portfolio-header">
        <div>
          <h2>Portfolio</h2>
          <p>Have some creative juice here</p>
        </div>
        <Link to="/Projects" className="portfolio-contact contact-link">
          MORE WORK{" "}
          <span className="arrow">
            <HiOutlineArrowUpRight />
          </span>
        </Link>
      </div>

      <Swiper
        slidesPerView={1} /* Show 1 slide on small screens */
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        freeMode={true}
        modules={[Autoplay, FreeMode]}
        className="mySwiper"
      >
        {portfolios.map((portfolio) => (
          <SwiperSlide key={portfolio._id} className="portfolio-slide">
            <div className="portfolio-card">
              <Link to={`/Details/${portfolio._id}`}>
                <img
                  src={showImage(portfolio.imageUrl)}
                  alt={portfolio.title}
                  srcSet=""
                />
              </Link>
              <h3 className="portfolio-title">{portfolio.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}