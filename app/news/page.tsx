"use client";

import InnerBanner from "@/components/layout/InnerBanner/InnerBanner";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_ALL_NEWS } from "@/common/queries/query";
import { NewsEvents } from "@/common/interfaces/interface";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeContext";

const PAGE_SIZE = 9;

const NewsPage = () => {
  const [newsEvents, setNewsEvents] = useState<NewsEvents[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [cursors, setCursors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  const fetchNewsEvents = async (
    first = PAGE_SIZE,
    after: string | null = null
  ) => {
    const data = await graphQLClient.request<{
      news: {
        nodes: NewsEvents[];
        pageInfo: {
          endCursor: string;
          hasNextPage: boolean;
        };
      };
    }>(GET_ALL_NEWS, { first, after });

    setNewsEvents(data.news.nodes);
    setEndCursor(data.news.pageInfo.endCursor);
    setHasNextPage(data.news.pageInfo.hasNextPage);
  };

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  const handlePageChange = async (page: number) => {
    if (page === 1) {
      fetchNewsEvents();
      setCurrentPage(1);
      setCursors([]);
    } else {
      const after = cursors[page - 2];
      await fetchNewsEvents(PAGE_SIZE, after);
      setCurrentPage(page);
      setCursors((prev) => {
        const updated = [...prev];
        if (!updated[page - 1]) updated[page - 1] = endCursor ?? "";
        return updated;
      });
    }
  };

  return (
    <>
      <InnerBanner
        innerPageTitlePrimary={"News &"}
        innerPageTitleSecondary={" Events"}
        innerPageDescription="Discover the latest at ESU on our dynamic News & Events page featuring updates on graduation ceremonies, new campus openings, programme launches, and new partnerships. This is where you will find all the highlights. Stay informed, celebrate success and follow our journey as we continue to advance academic excellence and innovation."
        innerBgDesk="/images/inner-banner.gif"
        innerBgMobi="/images/inner-banner.gif"
      />

      <section className="simple-padding-top simple-padding-bottom news-events-section">
        <div className="school-box-wrap d-flex middle-wrap">
          {newsEvents.map((news, index) => (
            <div className="school-box-single news-box-landing" key={index}>
              <div className="school-box-inner">
                <Link href={`/news/${news.slug}`}>
                  <img
                    className="feature-img-school"
                    src={news.featuredImage.node?.sourceUrl || ""}
                    alt={news.featuredImage.node?.altText || ""}
                  />
                </Link>
                <div className="school-box-inner-details">
                  <p className="m-0 aragraph paragraph--black date-p">
                    {new Date(news.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <Link
                    href={`/news/${news.slug}`}
                    className="school-box-details d-flex"
                  >
                    <span>
                      {news.title.length > 50
                        ? news.title.substring(0, 50) + "[...]"
                        : news.title}
                    </span>
                  </Link>
                  <div className="paragraph paragraph--black">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          news.content.length > 200
                            ? news.content.substring(0, 200) + "[...]"
                            : news.content,
                      }}
                    />
                  </div>
                  <Link className="btnn-next" href={`/news/${news.slug}`}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-div justify-content-center">
          {[...Array(currentPage + (hasNextPage ? 1 : 0))].map((_, i) => (
            <button
              key={i}
              className={`page-numbers ${
                currentPage === i + 1 ? "current" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewsPage;
