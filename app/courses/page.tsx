"use client";

import React, { useState, useEffect } from "react";
import { graphQLClient } from "@/lib/graphql-client";
import Breadrumb from "@/components/common/Breadcrumb/Breadcrumb";
import "./style.scss";
import { useTheme } from "@/lib/ThemeContext";
import {
  ALL_COURSE_QUERY,
  BRANCH_TYPES_QUERY,
  COURSE_TYPES_QUERY,
  DELIVERY_MODE_QUERY,
  SCHOOL_TYPES_QUERY,
} from "@/common/queries/query";
import {
  CourseType,
  BranchType,
  SchoolType,
  DeliveryModeTypes,
  Courses,
} from "@/common/types/type";
import {
  CourseList,
  FilterPanel,
  Pagination,
  SearchBar,
} from "@/components/pages/Courses";
import { FaTimes } from "react-icons/fa";
import TitleText from "../../components/common/TextColorChange/TextColorChange";

export default function CoursesPage() {
    const { setColor } = useTheme();
  
  const [search, setSearch] = useState("");

  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [branchTypes, setBranchTypes] = useState<BranchType[]>([]);
  const [schoolTypes, setSchoolTypes] = useState<SchoolType[]>([]);
  const [deliveryModeTypes, setDeliveryModeTypes] = useState<
    DeliveryModeTypes[]
  >([]);

  const [allCourses, setAllCourses] = useState<Courses[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Courses[]>([]);

  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleClearFilters = () => {
    setSelectedSchools([]);
    setSelectedPrograms([]);
    setSelectedModes([]);
    setSelectedBranches([]);
    setSearch("");
  };
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);
  useEffect(() => {
    let results = [...allCourses];

    if (search) {
      results = results.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedSchools.length > 0) {
      results = results.filter((course) =>
        course.schoolTypes?.nodes?.some((s) => selectedSchools.includes(s.slug))
      );
    }

    if (selectedPrograms.length > 0) {
      results = results.filter((course) =>
        course.courseTypes?.nodes?.some((c) =>
          selectedPrograms.includes(c.slug)
        )
      );
    }

    if (selectedModes.length > 0) {
      results = results.filter((course) =>
        course.deliveryModeTypes?.nodes?.some((d) =>
          selectedModes.includes(d.slug)
        )
      );
    }

    if (selectedBranches.length > 0) {
      results = results.filter((course) =>
        course.branchTypes?.nodes?.some((b) =>
          selectedBranches.includes(b.slug)
        )
      );
    }

    setFilteredCourses(results);
  }, [
    search,
    selectedSchools,
    selectedPrograms,
    selectedModes,
    selectedBranches,
    allCourses,
  ]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await graphQLClient.request<{
          courses: { nodes: Courses[] };
        }>(ALL_COURSE_QUERY);

        const filteredByBranch = data.courses.nodes.filter(
          (course) => (course.branchTypes?.nodes ?? []).length > 0
        );

        setAllCourses(filteredByBranch);
      } catch (error) {
        console.error("Error fetching course types:", error);
      }
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    async function fetchCourseTypes() {
      try {
        const data = await graphQLClient.request<{
          courseTypes: { nodes: CourseType[] };
        }>(COURSE_TYPES_QUERY);

        // Filter out undesired course types
        const excludedNames = [
          "Certificate Level",
          "Diploma Level",
          "Higher National Certificate",
          "Higher National Diploma Level",
        ];
        const filteredTypes = data.courseTypes.nodes.filter(
          (type) => !excludedNames.includes(type.name)
        );

        setCourseTypes(filteredTypes);
      } catch (error) {
        console.error("Error fetching course types:", error);
      }
    }

    async function fetchBranchTypes() {
      try {
        // setLoadingBranches(true);
        const data = await graphQLClient.request<{
          branchTypes: { nodes: BranchType[] };
        }>(BRANCH_TYPES_QUERY);

        setBranchTypes(data.branchTypes.nodes);
        // setLoadingBranches(false);
      } catch (error) {
        console.error("Error fetching branch types:", error);
      }
    }

    async function fetchSchoolTypes() {
      try {
        // setLoadingSchools(true);
        const data = await graphQLClient.request<{
          schoolTypes: { nodes: SchoolType[] };
        }>(SCHOOL_TYPES_QUERY);

        setSchoolTypes(data.schoolTypes.nodes);
        // setLoadingSchools(false);
      } catch (error) {
        console.error("Error fetching school types:", error);
      }
    }

    async function fetchDeliveryModeTypes() {
      try {
        // setLoadingModes(true);
        const data = await graphQLClient.request<{
          deliveryModeTypes: { nodes: DeliveryModeTypes[] };
        }>(DELIVERY_MODE_QUERY);

        setDeliveryModeTypes(data.deliveryModeTypes.nodes);
        // setLoadingModes(false);
      } catch (error) {
        console.error("Error fetching delivery mode types:", error);
      }
    }

    fetchCourseTypes();
    fetchBranchTypes();
    fetchSchoolTypes();
    fetchDeliveryModeTypes();
  }, []);

  const { color } = useTheme();

  const toggleMobileFilter = () => {
    setMobileFilterOpen((prev) => !prev);
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  //console.log("selectedBranches", branchTypes);

  return (
    <>
      <Breadrumb />

      <section className="simple-padding-bottom dark-lightmode dark-font-change">
        <div className="small-middle-wrap">
          <h2 className="section-heading section-heading--black" data-aos="flip-down">
            our <span>courses</span>
          </h2>

          <div className="landing-wrap-top" data-aos="fade-up">
            <div className="landing-results landing-results-top">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>

          <div className="landing-wrap" >
            {/* Filter Section */}
            <div className="landing-filter" data-aos="fade-up" >
              {search ||
              selectedSchools.length ||
              selectedPrograms.length ||
              selectedModes.length ||
              selectedBranches.length ? (
                <div  >
                  <p id="search-breif">
                    <span id="result-count">{filteredCourses.length} </span>
                    {search && <span id="result-keyword">"{search}"</span>}
                    Search Results Found for
                    {selectedSchools.length > 0 && (
                      <span>
                        {" "}
                        {selectedSchools.map((slug) => {
                          const school = schoolTypes.find(
                            (s) => s.slug === slug
                          );
                          return school ? school.name : slug;
                        })}
                      </span>
                    )}
                    {selectedPrograms.length > 0 && (
                      <span>
                        {" "}
                        {selectedPrograms.map((slug) => {
                          const program = courseTypes.find(
                            (c) => c.slug === slug
                          );
                          return program ? program.name : slug;
                        })}
                      </span>
                    )}
                    {selectedBranches.length > 0 && (
                      <span>
                        {" "}
                        {selectedBranches.map((slug) => {
                          const branches = branchTypes.find(
                            (c) => c.slug === slug
                          );
                          return branches ? branches.name : slug;
                        })}
                      </span>
                    )}
                  </p>
                </div>
              ) : null}

              <div className="d-flex filter-clear-wrap justify-content-between align-items-center"  >
                <h5 className="desktop-div">filter by</h5>
                <button
                  id="filter-toggle"
                  className="mobile-div"
                  style={{ backgroundColor: color }}
                  onClick={toggleMobileFilter}
                >
                  Select Filter
                </button>
                <button
                  className="clear-filter-btn"
                  id="clear-filters-btn"
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
              </div>

              <ul id="selected-checks"></ul>
              <div
                className={`att-box-wrapper ${
                  mobileFilterOpen ? "show-mobile-filter" : "hide-mobile-filter"
                }`}
              >
                <button
                  className="mobile-filter-btn"
                  onClick={toggleMobileFilter}
                >
                  <FaTimes />
                </button>

                {/* 
                    ---
                    Faculties Filter  
                    ---
                */}

                <div className="title-wrap">
                  <TitleText title="" subtitle="Faculties" />
                </div>

                <FilterPanel
                  title="" // overridden by the above <div>
                  options={schoolTypes}
                  selected={selectedSchools}
                  setSelected={setSelectedSchools}
                  loading={false}
                />

                {/* 
                    ---
                    Academic Level Filter  
                    ---
                */}

                <div className="title-wrap">
                  <TitleText title="" subtitle="Academic Level" />
                </div>

                <FilterPanel
                  title="" // overridden by the above <div>
                  options={courseTypes}
                  selected={selectedPrograms}
                  setSelected={setSelectedPrograms}
                  loading={false}
                />

                {/* 
                    ---
                    Campuses Filter  
                    ---
                */}

                <div className="title-wrap">
                  <TitleText title="" subtitle="Campuses" />
                </div>

                <FilterPanel
                  title=""
                  options={branchTypes}
                  selected={selectedBranches}
                  setSelected={setSelectedBranches}
                  loading={false}
                />
              </div>
            </div>

            <div className="landing-results"  >
              <div className="landing-results-inner">
                {/* Course List */}
                <CourseList
                  courses={filteredCourses}
                  currentPage={currentPage}
                  coursesPerPage={coursesPerPage}
                />

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
