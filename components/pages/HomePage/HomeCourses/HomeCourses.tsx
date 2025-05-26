"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TitleLarge from "../../../common/TitleLarge/TitleLarge";
import Button from "../../../common/Button/Button";
import CourseItem from "../../Courses/CourseItem/CourseItem";
import { graphQLClient } from "@/lib/graphql-client";
import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { COURSE_LIST_QUERY } from "@/common/queries/query";

type Course = {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  } | null;
  courses: {
    courseId: string;
    courseCode: string;
    studentsCount: string | null;
  };
  schoolTypes?: { nodes: { slug: string; name: string }[] };
  courseTypes?: { nodes: { slug: string; name: string }[] };
};

export default function HomeCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await graphQLClient.request<{
          courses: { nodes: Course[] };
        }>(COURSE_LIST_QUERY);
        setCourses(data.courses.nodes);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="home-courses">
      <div className="main-wrap-title" data-aos="flip-down" >
        <div className="title-wrap">
          <TitleLarge title="Explore" subtitle="Our Courses" />
        </div>
        <div className="button-wrap">
          <Button buttonName="Explore" buttonUrl="/courses" />
        </div>
      </div>
      <div className="slider-wrap" data-aos="fade-up" >
        <Slider {...settings} className="courses-slider">
          {courses.map((course) => (
            <div key={course.id} className="item">
              <CourseItem
                course={{
                  ...course,
                  featuredImage: course.featuredImage
                    ? {
                        node: {
                          mediaItemUrl: course.featuredImage.node.mediaItemUrl,
                        },
                      }
                    : undefined,
                  courses: {
                    ...course.courses,
                    studentsCount: course.courses.studentsCount
                      ? parseInt(course.courses.studentsCount, 10)
                      : undefined,
                  },
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
