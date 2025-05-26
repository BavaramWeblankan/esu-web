"use client";

import { InterfaceBlogs } from "@/common/interfaces/interface";
import { GET_BLOGS_BY_SLUG } from "@/common/queries/query";
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

const Page = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const [blog, setBlog] = useState<InterfaceBlogs | null>(null);
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await graphQLClient.request<{
        blog: InterfaceBlogs;
      }>(GET_BLOGS_BY_SLUG, {
        slug,
      });

      console.log("📥 Fetched blog:", data.blog);
      setBlog(data.blog);
    };

    fetchBlog();
  }, [slug]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  console.log("📦 blog response:", blog);

  /*   const galleryImages =
    blog?.blogs?.gallery?.nodes?.map((item: any) => item.sourceUrl) || [];
 */

  const galleryImages =
    blog?.blogs?.gallery?.nodes?.length &&
    Array.isArray(blog.blogs.gallery.nodes)
      ? blog.blogs.gallery.nodes.map((item) => item.sourceUrl)
      : blog?.featuredImage?.node?.sourceUrl
      ? [blog.featuredImage.node.sourceUrl]
      : [];

  console.log("🖼️ Gallery Images:", galleryImages);

  return (
    <>
      <Breadrumb />

      <section className="simple-padding-bottom news-inner-page">
        <div className="small-middle-wrap">
          <div className="heading-wrap d-flex small-wrap">
            <h2 className="section-heading section-heading--black section-heading--underline section-heading--underline--center">
              <span>{blog?.title}</span>
            </h2>
          </div>

          {galleryImages.length > 0 && (
            <Slider {...settings} className="news-inner-slider">
              {galleryImages.map((src: any, i: number) => (
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
                __html: blog?.content || "",
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
