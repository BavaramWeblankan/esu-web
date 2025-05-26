"use client";

import { NewsEvents } from "@/common/interfaces/interface";
import { GET_NEWS_BY_SLUG } from "@/common/queries/query";
import Breadrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { graphQLClient } from "@/lib/graphql-client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { useTheme } from "@/lib/ThemeContext";

const page = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const [news, setNews] = useState<NewsEvents | null>(null);
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await graphQLClient.request<{
        new: NewsEvents;
      }>(GET_NEWS_BY_SLUG, {
        slug,
      });

      //   console.log("data", data.new);
      setNews(data.new);
    };

    fetchNews();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  const galleryImages =
    news?.news?.gallery?.nodes?.map((item: any) => item.sourceUrl) || [];

  //   console.log("gallery", galleryImages);

  return (
    <>
      <Breadrumb />

      <section className="simple-padding-bottom news-inner-page">
        <div className="small-middle-wrap">
          <div className="heading-wrap d-flex small-wrap">
            <h2 className="section-heading section-heading--black section-heading--underline section-heading--underline--center">
              <span>{news?.title}</span>
            </h2>
          </div>
          {Array.isArray(galleryImages) && galleryImages.length > 0 && (
            <Slider {...settings} className="news-inner-slider">
              {galleryImages.map((src: any, i: any) => (
                <div key={i} className="slide-item">
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={src}
                      alt={`Slide ${i + 1}`}
                      width={800}
                      height={600}
                      layout="responsive"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          )}
          <div className="the-content-div news-con simple-padding-top">
            <div
              className="the-content"
              dangerouslySetInnerHTML={{
                __html: news?.content || "",
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
