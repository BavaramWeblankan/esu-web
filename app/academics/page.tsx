"use client";

import React, { useState, useEffect } from "react";
import { graphQLClient } from "@/lib/graphql-client";
import Breadrumb from "@/components/common/Breadcrumb/Breadcrumb";
import "./style.scss";
import { GET_ALL_ACADEMIC_STAFF } from "@/common/queries/query";
import { Courses, Staffs } from "@/common/types/type";
import { CourseList, Pagination, SearchBar } from "@/components/pages/Courses";
import Filter from "@/components/pages/Courses/Filter/Filter";
import FaculityCard from "@/components/pages/Faculty/FaculityCard/FaculityCard";
import MemberCardItem from "@/components/pages/Faculty/MembersLanding/MemberCard/MemberCard";
import { useTheme } from "@/lib/ThemeContext";

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  const [allAcademics, setAllAcademics] = useState<Staffs[]>([]);
  const [filteredAcademics, setFilteredAcademics] = useState<Staffs[]>([]);

  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  useEffect(() => {
    let results = [...allAcademics];

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

    setFilteredAcademics(results);
  }, [search, selectedSchools, allAcademics]);

  useEffect(() => {
    async function fetchAcademics() {
      try {
        const data = await graphQLClient.request<{
          staffs: { nodes: Staffs[] };
        }>(GET_ALL_ACADEMIC_STAFF);

        const strategicTeam = [
          "Dr. Dayan Rajapakse",
          "Mr. Nishan Sembacuttiaratchy",
          "Mr. Amila Bandara",
        ];

        const filteredAcademics = data.staffs.nodes.filter(
          (staff) => !strategicTeam.includes(staff.title)
        );

        setAllAcademics(filteredAcademics);
      } catch (error) {
        console.error("Error fetching academics:", error);
      }
    }

    fetchAcademics();
  }, []);

  const totalPages = Math.ceil(filteredAcademics.length / coursesPerPage);

  const { color } = useTheme();

  return (
    <>
      <Breadrumb />

      <section className="simple-padding-bottom academics-page-section">
        <div className="small-middle-wrap">
          <h2 className="section-heading section-heading--black">
            our <span style={{ color: color }}>academics</span>
          </h2>

          <div className="landing-wrap-top">
            <div className="landing-results landing-results-top">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>

          <div className="landing-wrap">
            {/* Filter Section */}
            <Filter
              setSelectedSchools={setSelectedSchools}
              setSelectedPrograms={null}
              setSelectedModes={null}
              setSelectedBranches={null}
              setSearch={setSearch}
              search={search}
              selectedSchools={selectedSchools}
              selectedPrograms={null}
              selectedModes={null}
              selectedBranches={null}
              filteredCourses={filteredAcademics}
            />

            <div className="landing-results">
              <div className="landing-results-inner academics-mamber-group">
                {filteredAcademics.length > 0 &&
                  filteredAcademics
                    .slice(
                      (currentPage - 1) * coursesPerPage,
                      currentPage * coursesPerPage
                    )
                    .map((academicsItem, index) => (
                      <MemberCardItem
                        memberData={academicsItem}
                        key={`${academicsItem.title}-${index}`}
                      />
                    ))}

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
