"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Course {
  id: string;
  slug: string;
  tag?: string;
  featuredImage?: {
    node?: {
      mediaItemUrl?: string;
    };
  };
  title: string;
  school?: string;
  type?: string;
  duration?: string;
  schoolTypes?: { nodes: { slug: string; name: string }[] };
  courseTypes?: { nodes: { slug: string; name: string }[] };
  courses: {
    courseId: string;
    studentsCount?: number;
  };
  partner?: string;
}

const CourseItem: React.FC<{ course: Course }> = ({ course }) => {

  return (
    <div className="course-box-wrap" key={course.id} data-aos="zoom-in">
      <Link
        className="course-box"
        href={{
          pathname: `/courses/${course.slug}`,
          query: { id: course.courses.courseId, courseId: course.id },
        }}
      >
        <div className="course-box-img">
          {course.tag && <span className="course-tag">{course.tag}</span>}
          {course.featuredImage?.node?.mediaItemUrl && (
            <img
              src={course.featuredImage.node.mediaItemUrl}
              alt={course.title}
            />
          )}
          <div className="course-box-img-content">
            <div className="course-box-img-content-inner">
              <h6>{course.title}</h6>
              <p>
                {course.courseTypes?.nodes?.[0]?.name &&
                  course.courseTypes?.nodes?.[0]?.name}
                &nbsp;|&nbsp;
                {course.schoolTypes?.nodes?.[0]?.name &&
                  course.schoolTypes?.nodes?.[0]?.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseItem;
