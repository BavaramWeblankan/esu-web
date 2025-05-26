"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePathname } from "next/navigation";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_PUBLICATIONS_BY_SLUG } from "@/common/queries/query";
import { Publication } from "@/common/interfaces/interface";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";

const page = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const [research, setResearch] = useState<Publication | null>(null);
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);
  
  useEffect(() => {
    const fetchResearch = async () => {
      const data = await graphQLClient.request<{
        publication: Publication;
      }>(GET_PUBLICATIONS_BY_SLUG, {
        slug,
      });

      setResearch(data.publication);
      console.log("data", data.publication);
    };

    fetchResearch();
  }, [slug]);

  const galleryImages =
    research?.blogs?.gallery?.nodes?.map((item) => item.sourceUrl) || [];

  console.log("gallery", galleryImages);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
  return (
    <>
      <section className="simple-padding-bottom research-inner-page">
        <div className="small-middle-wrap">
          <div className="heading-wrap d-flex small-wrap">
            <h2 className="section-heading section-heading--black section-heading--underline section-heading--underline--center">
              <span>{research?.title}</span>
            </h2>
          </div>
          {galleryImages.length > 0 && (
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
                __html: research?.content || "",
              }}
            ></div>
          </div>
        </div>
      </section>

      <section></section>
    </>
  );
};

export default page;
