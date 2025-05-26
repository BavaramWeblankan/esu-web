"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import Image from "next/image";
import TitleLarge from "@/components/common/TitleLarge/TitleLarge";
import Button from "@/components/common/Button/Button";
import { useTheme } from "@/lib/ThemeContext";
import { NewsEvents } from "@/common/interfaces/interface";
import { graphQLClient } from "@/lib/graphql-client";
import { HOME_LATEST_NEWS } from "@/common/queries/query";

const HomeNews = () => {
  const [news, setNews] = useState<NewsEvents[]>([]);
  const { color } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0); // Add this state


  const fetchNewsEvents = async () => {
    const data = await graphQLClient.request<{
      news: {
        nodes: NewsEvents[];
        pageInfo: {
          endCursor: string;
          hasNextPage: boolean;
        };
      };
    }>(HOME_LATEST_NEWS);

    setNews(data.news.nodes);
  };

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  // Main news is the first item, sidebar is the rest
const mainNews = news[activeIndex];


  return (
    <>
      <section className="home-news-section">
      <div className="home-news-section-wrap">
        <div className="title-wrap text-center" data-aos="flip-down" >
          <TitleLarge title="Latest" subtitle="&nbsp; News" />
        </div>
        <div className="news-container" data-aos="fade-up" >
          {mainNews && (
            <div className="news-main pos-relative">
              <a href={`/news/${mainNews.slug}`}>
                <Image
                  src={mainNews.featuredImage?.node?.sourceUrl || "/images/news.png"}
                  alt={mainNews.featuredImage?.node?.altText || mainNews.title}
                  width={800}
                  height={400}
                  className="news-image"
                />
                <div className="news-content pos-absolute">
                  <p className="news-date">
                    📅 {mainNews.date ? new Date(mainNews.date).toLocaleDateString() : ""}
                  </p>
                  <h3 className="news-title">{mainNews.title}</h3>
                </div>
              </a>
            </div>
          )}

          {/* Sidebar News */}
          <div className="news-sidebar" data-aos="fade-up">
            {news.map((item, idx) => {
              // if (idx === activeIndex) return null; // Don't show main news in sidebar
              return (
                <div
                  className={`news-sidebar-item${idx == activeIndex ? " active" : ""}`}
                  key={item.slug || idx}
                  style={idx === activeIndex ? { backgroundColor: color } : {}}
                  onClick={() => setActiveIndex(idx)} // Change main news on click
                >
                  <div>
                    <p className="news-date">
                      📅 {item.date ? new Date(item.date).toLocaleDateString() : ""}
                    </p>
                    <p className="news-subtitle">{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HomeNews;