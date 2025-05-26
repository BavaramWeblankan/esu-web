"use client";

import React, { useEffect, useState,useRef } from "react";
import Slider from "react-slick";
import TitleLarge from "../../../common/TitleLarge/TitleLarge";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialItem from "./TestimonialItem";
import "./style.scss";
import { graphQLClient } from "@/lib/graphql-client";
import { TESTIMONIALS_QUERY } from "@/common/queries/query";
import { Testimonial } from "@/common/types/type";

const HomeTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
 const sliderRef = useRef<Slider>(null);

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await graphQLClient.request<{
          testimonials: { nodes: Testimonial[] };
        }>(TESTIMONIALS_QUERY);

        console.log("✅ Raw testimonials:", data.testimonials.nodes);

        const filtered = data.testimonials.nodes.filter((item) => {
          // const types = item.testimonials?.testimonialType || [];
          // const hasVideo = types.some((type) => type.toLowerCase() === "video");
          return item.testimonials !== null;
        });

        console.log("✅ Filtered testimonials (excluding video):", filtered);

        setTestimonials(filtered);
      } catch (error) {
        console.error("❌ Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
         
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
      
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="home-testimonials" data-aos="fade-up">
      <div className="title-wrap" >
        <TitleLarge title="Student" subtitle="&nbsp; Testimonials" />
        
      </div>
      <div className="slider-wrap ">
        
        <Slider {...settings} className="testimonial-slider pb-0"  ref={sliderRef}  >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="item">
              <TestimonialItem testimonialData={testimonial} />
            </div>
          ))}
        </Slider>
        <div className="testimonial slider-buttons">
            <button className="slider-btn prev" onClick={handlePrev}>
              ‹
            </button>
            <button className="slider-btn next" onClick={handleNext}>
              ›
            </button>
          </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
