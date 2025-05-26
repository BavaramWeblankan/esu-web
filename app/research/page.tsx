"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import InnerBanner from "@/components/layout/InnerBanner/InnerBanner";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_ALL_PUBLICATIONS } from "@/common/queries/query";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeContext";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import { Publication } from "@/common/interfaces/interface";

const page = () => {
  const { color } = useTheme();

  const [publications, setPublications] = useState<Publication[]>([]);
  const featuredPublications = publications.slice(0, 4);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPublications = publications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(
    new Set(
      publications
        .flatMap((pub) => pub.publicationType.nodes || [])
        .map((type) => `${type.name}|${type.slug}|${type.count}`)
    )
  ).map((str) => {
    const [name, slug, count] = str.split("|");
    return { name, slug, count };
  });

  const archives = publications.reduce((acc, pub) => {
    const date = new Date(pub.date);

    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    acc[yearMonth] = (acc[yearMonth] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  useEffect(() => {
    const fetchPublications = async () => {
      const data = await graphQLClient.request<{
        publications: {
          nodes: Publication[];
        };
      }>(GET_ALL_PUBLICATIONS);

      // console.log("Publications data:", data);
      setPublications(data.publications.nodes);
    };

    fetchPublications();
  }, []);

  return (
    <>
      <InnerBanner
        innerPageTitlePrimary={"Research"}
        innerPageTitleSecondary={"Publications"}
        innerPageDescription="Research is a vital pillar of ESU’s identity and mission. We foster a research culture that pushes the boundaries of knowledge while solving real-world problems through collaboration and innovation. From sustainability and robotics to international relations and social sciences, our research is defined by its practical application, interdisciplinary scope, and partnerships that create real impact. Through this work, we aim to transform lives and advance society. Welcome to the dynamic realm of research at ESU, where innovation knows no bounds."
        innerBgDesk="/images/inner-banner.gif"
        innerBgMobi="/images/inner-banner.gif"
      />

      <section className="simple-padding-bottom simple-padding-top">
        <div className="small-middle-wrap">
          {/* <div className="center-text">
            <h2 className="section-heading section-heading--underline section-heading--underline--center">
              <span style={{ color: color }}>Publications</span>
            </h2>
          </div> */}
          <div className="landing-wrap-top">
            <div className="landing-results w-100 landing-results-top">
              <div>
                {searchTerm && (
                  <p id="search-breif">
                    <span id="result-count" />
                    {filteredPublications.length} Search Results for :
                    <span id="result-keyword">{searchTerm || "All"}</span>
                  </p>
                )}
              </div>
              <div>
                <div className="search-form-ajax">
                  <input
                    type="text"
                    name="search-keyword"
                    className="type-check"
                    placeholder="Search Publications"
                    id="search-key"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button id="search-form-ajax-submit" type="submit">
                    <img
                      src="https://esoft.lk/wp-content/themes/esoft_metro_campus/assets/img/ser.png"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="landing-wrap">
            <div className="landing-results">
              <div className="landing-results-inner blog-results-inner">
                {filteredPublications.map((publication, index) => (
                  <div
                    className="school-box-single blog-box news-box-landing"
                    key={index}
                  >
                    <div className="school-box-inner">
                      <Link href={`/research/${publication.slug}`}>
                        <Image
                          className="feature-img-school"
                          src={publication.featuredImage.node.sourceUrl}
                          alt={publication.featuredImage.node.altText}
                          width={500}
                          height={500}
                          layout="responsive"
                        />
                      </Link>
                      <div className="school-box-inner-details">
                        <p className="m-0 aragraph paragraph--black date-p">
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(publication.date))}
                        </p>
                        <Link
                          href={`/research/${publication.slug}`}
                          className="school-box-details d-flex"
                        >
                          <span style={{ color: color }}>
                            {publication.title}
                          </span>
                        </Link>
                        <div className="paragraph paragraph--black publication-content">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                publication.content.length > 600
                                  ? publication.content.substring(0, 600) +
                                    "..."
                                  : "",
                            }}
                          />
                        </div>
                        <Button
                          buttonUrl={`/research/${publication.slug}`}
                          buttonName={"Read More"}
                        />
                        {/* <Link
                          className="btnn-next"
                          href={`/research/${publication.slug}`}
                          style={{ background: color }}
                        >
                          Read More
                        </Link> */}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pagination-div" />
              </div>
            </div>
            <div className="landing-filter blog-filter">
              <div className="archive-div">
                <div className="related-coures-div course-title">
                  <h5>Featured Publications</h5>
                </div>
                <div className="the-content-div recent-post-lists">
                  <ul>
                    {featuredPublications.map((publication, index) => (
                      <li key={index}>
                        <a href={`/research/${publication.slug}`}>
                          {publication.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="related-coures-div course-title">
                  <h5>Categories</h5>
                </div>
                <div className="the-content-div recent-post-lists">
                  <ul>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a href={`/research/${category.slug}`}>
                          {category.name} ({category.count})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
{/*                 <div className="related-coures-div course-title">
                  <h5>Archives</h5>
                </div> */}
{/*                 <ul className="date-archive">
                  {Object.entries(archives).map(([month, count]) => {
                    const [year, mon] = month.split("-");

                    const monthName = new Date(
                      `${year}-${mon}-01`
                    ).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    });

                    return (
                      <li key={month}>
                        <a href={`#`}>{monthName}</a>
                        &nbsp;
                        {/* ({count}) */}
                      {/* </li> */}
                 {/*    ); */}
               {/*    })}
             /*    </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
