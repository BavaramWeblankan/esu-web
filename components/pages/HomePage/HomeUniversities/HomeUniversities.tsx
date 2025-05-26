"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import TitleLarge from "../../../common/TitleLarge/TitleLarge";
import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const universityContent = `
ESOFT Uni has established a robust network of academic partnerships that enhance its position as a leading uni for higher education in Sri Lanka. Collaborating with esteemed UK universities such as London Metropolitan University and Kingston University, ESU offers students access to internationally recognized undergraduate and postgraduate programmes across disciplines including IT / Computing, Business and Management, Law, Engineering, BioMedical Engineering, Nursing, Psychology, Education, Hospitality Management, Travel and Tourism Management, and Fashion Design.
`;

const universitySlides = [
  {
    img: "https://cms.esu.lk/wp-content/uploads/2025/05/Goulston-Street-Etrance.webp",
    alt: "Goulston Street Entrance",
    url: "https://www.londonmet.ac.uk/",
    logo: ["https://cms.esu.lk/wp-content/uploads/2025/05/KingstonUniLogo.png"],
  },
  {
    img: "https://cms.esu.lk/wp-content/uploads/2025/05/78e9ec80-c82e-49e4-b42c-827d5a0a1438.jpg",
    alt: "Kingston University",
    url: "https://www.kingston.ac.uk/",
    logo: ["https://cms.esu.lk/wp-content/uploads/2025/05/KingstonUniLogo.png"],
  },
];

const sliderSettings = {
  dots: true, // ✅ ensure this is true
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
        dots: true, // ✅ must be true here for mobile
      },
    },
  ],
};

const HomeUniversities = () => {
  const sliderRef = useRef<Slider>(null);

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

  return (
    <section className="home-universities">
      <div className="home-uni-wrap">
        <div className="uni-content-wrap" data-aos="fade-up"  >
          <TitleLarge title="Academic" subtitle=" Partnerships" />
          <div className="uni-content"  >{universityContent}</div>
        </div>

        <div className="uni-slider-wrap" data-aos="fade-up" >
          <Slider
            ref={sliderRef}
            {...sliderSettings}
            className="uni-image-slider"
          >
            {universitySlides.map((slide, index) => (
              <div className="single-slider" key={index}>
                <div className="uni-image-wrapper">
                  {slide.url ? (
                    <a
                      href={slide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={slide.img}
                        alt={slide.alt}
                        width={800}
                        height={450}
                        className="uni-main-image"
                      />
                    </a>
                  ) : (
                    <Image
                      src={slide.img}
                      alt={slide.alt}
                      width={800}
                      height={450}
                      className="uni-main-image"
                    />
                  )}
                  <div className="uni-logo">
                    {slide.logo.map((logo, idx) => (
                      <Image
                        key={idx}
                        src={logo}
                        alt={`University logo ${idx + 1}`}
                        width={80}
                        height={80}
                        className="uni-logo-image"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation Buttons */}
          <div className="slider-buttons">
            <button className="slider-btn prev" onClick={handlePrev}>
              ‹
            </button>
            <button className="slider-btn next" onClick={handleNext}>
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeUniversities;
