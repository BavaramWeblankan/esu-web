"use client";

import Breadrumb from "@/components/common/Breadcrumb/Breadcrumb";
import CourseItem from "@/components/pages/Courses/CourseItem/CourseItem";
import { graphQLClient } from "@/lib/graphql-client";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./style.scss";
import LecturePanel from "@/components/pages/CoursesInner/LecturePanel/LecturePanel";
import CourseOverview from "@/components/pages/CoursesInner/CourseOverview/CourseOverview";
import CourseSchedule from "@/components/pages/CoursesInner/CourseSchedule/CourseSchedule";
import CourseFees from "@/components/pages/CoursesInner/CourseFees/CourseFees";
import { useTheme } from "@/lib/ThemeContext";
import Link from "next/link";
import { COURSE_QUERY, RELATED_COURSES_QUERY } from "@/common/queries/query";
import CourseOutline from "@/components/pages/CoursesInner/CourseOutline/CourseOutline";
import { Courses, RelatedCourses } from "@/common/types/type";
import Button from "@/components/common/Button/Button";
import { FeePlanInterface } from "@/common/interfaces/interface";
import Modal from "@/components/common/Modal/Modal";
import InquireForm from "@/components/sections/InquireForm/InquireForm";

const page = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const wpCourseId = searchParams.get("courseId");

  const { color, setColor } = useTheme();

  const [course, setCourse] = useState<{
    description?: string;
    name?: string;
    image?: string;
    is_bundle_course: number;
    bundle_items: any;
    course_content?: {
      modules?: [];
    };
  } | null>(null);
  // const [courseFees, setCourseFees] = useState([]);0
  const [courseFees, setCourseFees] = useState<{
    fee_plans?: FeePlanInterface[];
  }>({});

  const [schedule, setSchedule] = useState([]);
  const [courseDetails, setCourseDetails] = useState<Courses | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<RelatedCourses[]>([]);

  const [subCourses, setSubCourses] = useState<any[]>([]);
  const [subCourseFees, setSubCourseFees] = useState<any[]>([]);

  const [selectedSubCourse, setSelectedSubCourse] = useState(null);

  useEffect(() => {
    const school = courseDetails?.schoolTypes?.nodes?.[0];
    const font = school?.schoolTypesColorFontFields?.courseFontFamily;
    const color = school?.schoolTypesColorFontFields?.color;

    // if (font) {
    //   document.body.style.fontFamily = font;
    // }

    if (color) {
      setColor(color); // this updates your ThemeContext and CSS variable
    }
  }, [courseDetails]);

  const fetchCourse = async (courseId: any, main_course: boolean) => {
    try {
      const response = await axios.get(
        `https://publicapi.esoft.lk/api/v1/courses/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_API_KEY ||
              "1100626|VPJcv2Y6wFiHPw4i60xdc1WQ2NMPUQgerXlYhOyI3a07cd1c"
            }`,
          },
        }
      );

      const data = response.data.data;

      if (main_course) {
        setCourse(data); // main course set
      } else {
        if (!main_course) {
          setSubCourses((prev) => {
            const alreadyExists = prev.some((item) => item.id === data.id);
            if (alreadyExists) return prev;
            return [...prev, data];
          });
        }
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const fetchCourseFees = async (courseId: any) => {
    try {
      const response = await axios.get(
        `https://publicapi.esoft.lk/api/v1/courses/${courseId}/fees?for_entity=esu`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_API_KEY ||
              "1100626|VPJcv2Y6wFiHPw4i60xdc1WQ2NMPUQgerXlYhOyI3a07cd1c"
            }`,
          },
        }
      );

      if (Array.isArray(response.data.data)) {
        setCourseFees({ fee_plans: response.data.data });
      } else {
        setCourseFees(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching course fees:", error);
    }
  };

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetails = async () => {
      try {
        const response = await graphQLClient.request<{
          course: Courses;
        }>(COURSE_QUERY, {
          id: wpCourseId,
        });

        setCourseDetails(response.course);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `https://publicapi.esoft.lk/api/v1/courses/${courseId}/batches?branch_id=`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${
                process.env.NEXT_PUBLIC_API_KEY ||
                "1100626|VPJcv2Y6wFiHPw4i60xdc1WQ2NMPUQgerXlYhOyI3a07cd1c"
              }`,
            },
          }
        );

        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching course schedule:", error);
      }
    };

    const fetchRelatedCourses = async () => {
      try {
        const response = await graphQLClient.request<{
          courses: { nodes: RelatedCourses[] };
        }>(RELATED_COURSES_QUERY);

        const filteredCourses = response.courses.nodes
          .filter((course) => course.id !== wpCourseId) // remove current course
          .slice(0, 3); // pick top 4 after filtering

        setRelatedCourses(filteredCourses);
      } catch (error) {
        console.error("❌ Error fetching related courses:", error);
      }
    };

    fetchCourse(courseId, true);
    fetchCourseDetails();
    fetchCourseFees(courseId);
    fetchSchedule();
    fetchRelatedCourses();
  }, [courseId]);

  // console.log("fetchCourse", course);

  useEffect(() => {
    const fetchedIds = new Set();

    const fetchBundleItems = () => {
      if (course?.is_bundle_course !== 1) return;

      course.bundle_items.forEach((item: any) => {
        if (item?.course_id && !fetchedIds.has(item.course_id)) {
          fetchedIds.add(item.course_id);
          fetchCourse(item.course_id, false);
        }
      });
    };

    fetchBundleItems();
  }, [course]);

  useEffect(() => {
    if (subCourses.length > 0 && !selectedSubCourse) {
      setSelectedSubCourse(subCourses[0].name);
    }
  }, [subCourses]);

  // console.log("Main course:", course);
  // console.log("Bundle sub-courses:", subCourses);

  const selectCourse = subCourses.find((sc) => sc.name === selectedSubCourse);

  // console.log("subCourses", subCourses);

  // console.log("selectCourse insaf", selectCourse);

  return (
    <>
      <Breadrumb />

      <section className="simple-padding-bottom dark-lightmode dark-font-change">
        <div className="course-wrap">
          <div className="left-course">
            <div className="left-course-img" data-aos="flip-left">
              {courseDetails?.featuredImage?.node?.mediaItemUrl && (
                <img
                  src={courseDetails.featuredImage.node.mediaItemUrl}
                  alt={courseDetails.title}
                />
              )}
            </div>
            <div className="left-course-details" data-aos="fade-up">
              <div className="d-flex justify-content-center course-btn-wrap">
                <Modal>
                  <InquireForm />
                </Modal>
              </div>
            </div>
            <div className="desktop-div">
              <div className="related-coures-div">
                <h5>
                  <span>
                    related <span style={{ color }}>courses</span>
                  </span>
                </h5>
              </div>
              {relatedCourses?.map((relatedCourse, index) => {
                return (
                  <CourseItem
                    key={relatedCourse.id}
                    course={{
                      ...relatedCourse,
                      featuredImage: relatedCourse.featuredImage ?? undefined,
                      courses: {
                        ...relatedCourse.courses,
                        studentsCount: relatedCourse.courses.studentsCount
                          ? parseInt(relatedCourse.courses.studentsCount, 10)
                          : undefined,
                      },
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="right-course">
            <div
              className="course-details-bar"
              style={{ backgroundColor: color }}
            >
              <div className="d-flex course-details-bar-details">
                <div className="course-details-partner-logo">
                  {course?.image &&
                    course?.image != "/images/placeholder.png" && (
                      <img src={course?.image || ""} alt={course?.name || ""} />
                    )}
                </div>
                <div>
                  <p>
                    <span>{courseDetails?.schoolTypes?.nodes?.[0]?.name} </span>
                    <span>
                      | {courseDetails?.courseTypes?.nodes?.[0]?.name}
                    </span>
                  </p>
                  <h1>{course?.name ?? ""}</h1>
                  {/* <div className="d-flex course-box-details">
                    <div className="d-flex course-box-details-right">
                      <img
                        src="/images/user.png"
                        alt="user icon"
                      />
                      <span>2450+</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="course-inner-details-box">
              {/*<ul className="course-nav">
                <li>
                  <button className="active-btn nav-btn-in">overview</button>
                </li>
                <li>
                  <button className="nav-btn-in">course outline</button>
                </li>
                <li>
                  <button className="nav-btn-in">Schedule</button>
                </li>
                <li>
                  <button className="nav-btn-in">Fees</button>
                </li>
              </ul> */}

              {course?.is_bundle_course === 1 && (
                <div className="hnd-top-up-toogle">
                  <div className="toggle-buttons mb-3">
                    {subCourses
                      ?.slice() // make a shallow copy so we can sort
                      .sort((a, b) => {
                        const aName = a.name.toLowerCase();
                        const bName = b.name.toLowerCase();

                        const aIsHND = aName.includes("hnd") ? -1 : 1;
                        const bIsHND = bName.includes("hnd") ? -1 : 1;

                        return aIsHND - bIsHND; // HND comes before others
                      })
                      .map((subCourse, index) => {
                        const name = subCourse.name.toLowerCase();
                        const label = name.includes("hnd")
                          ? "Year 1 & 2"
                          : name.includes("top up") || name.includes("top-up")
                          ? "Year 3 (TOP UP)"
                          : subCourse.name;

                        return (
                          <button
                            key={index}
                            className={
                              selectedSubCourse === subCourse.name
                                ? "active"
                                : ""
                            }
                            onClick={() => setSelectedSubCourse(subCourse.name)}
                          >
                            {label}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}

              <div
                className="course-details-wrapper course-description-wrapper"
                data-aos="zoom-in"
              >
                <div id="section1" className="related-coures-div course-title">
                  <h5>
                    <span>
                      Course <span style={{ color }}>Overview</span>
                    </span>
                  </h5>
                  <hr className="course-title-hr" />
                </div>
                <div
                  className="the-content-div"
                  dangerouslySetInnerHTML={{
                    __html: course?.description || "",
                  }}
                />
              </div>

              {/* {selectCourse && (
                <CourseOverview course={selectCourse || undefined} />
              )} */}

              {course?.is_bundle_course !== 1 ? (
                <CourseOutline
                  classifications={[
                    {
                      id: 0,
                      classification_name: "Modules",
                      modules: course?.course_content?.modules || [],
                    },
                  ]}
                />
              ) : (
                <CourseOutline
                  classifications={
                    Array.isArray(
                      selectCourse?.course_content?.classifications
                    ) && selectCourse.course_content.classifications.length > 0
                      ? selectCourse.course_content.classifications
                      : [
                          {
                            id: 0,
                            classification_name: "Modules",
                            modules:
                              selectCourse?.course_content?.modules || [],
                          },
                        ]
                  }
                />
              )}

              <CourseSchedule schedule={schedule} />
              {/* ------------------------------------------------ */}

              <CourseFees fees={courseFees} />
              {/* ------------------------------------------------ */}

              {courseDetails?.courses?.lecturePanelDescription && (
                <LecturePanel
                  lecturePanelDescription={
                    courseDetails?.courses?.lecturePanelDescription
                  }
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
