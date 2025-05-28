"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import InnerBanner from "@/components/layout/InnerBanner/InnerBanner";
import FaculityOverview from "@/components/pages/Faculty/FaculityOverview/FaculityOverview";
import DeanMessage from "@/components/pages/Faculty/DeanMessage/DeanMessage";
import { graphQLClient } from "@/lib/graphql-client";
import MembersLanding from "@/components/pages/Faculty/MembersLanding/MembersLanding";
import { FACULTY_INNER_QUERY } from "@/common/queries/query";
import { FacultyInner, StaffMemberDetails } from "@/common/types/type";
import "./style.scss";
import FacultyCourses from "@/components/pages/Faculty/FacultyCourses/FacultyCourses";
import HomeTestimonials from "@/components/pages/HomePage/HomeTestimonials/HomeTestimonials";
import { useTheme } from "@/lib/ThemeContext";

const FacultyInnerPage = () => {
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();
  const { setColor } = useTheme();
  const [faculty, setFaculty] = useState<FacultyInner | null>(null);
  const [deans, setDeans] = useState<StaffMemberDetails[]>([]);
  const [hods, setHods] = useState<StaffMemberDetails[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchFacultyDetails = async () => {
      try {
        const data = await graphQLClient.request<{
          schoolTypes: { nodes: FacultyInner[] };
          dean: { staffs: { nodes: StaffMemberDetails[] } };
          hod: { staffs: { nodes: StaffMemberDetails[] } };
        }>(FACULTY_INNER_QUERY, { slug });

        if (data.schoolTypes.nodes.length > 0) {
          //console.log("🎓 Faculty Details:", data.schoolTypes.nodes[0]);
          setFaculty(data.schoolTypes.nodes[0]);
        }

        if (data.dean?.staffs?.nodes?.length > 0) {
          //console.log("🎓 All Dean Records:", data.dean.staffs.nodes);
          setDeans(data.dean.staffs.nodes);
        }

        if (data.hod?.staffs?.nodes?.length > 0) {
          //console.log("🎓 All HOD Records:", data.hod.staffs.nodes);
          setHods(data.hod.staffs.nodes);
        }
      } catch (error) {
        console.error("❌ Error fetching faculty/dean/HOD data:", error);
      }
    };

    fetchFacultyDetails();
  }, [slug]);

  const matchingDean = deans.find((dean) =>
    dean.schoolTypes?.nodes?.some(
      (node: { slug: string }) => node.slug === slug
    )
  );

  const matchingHOD = hods.find((hod) =>
    hod.schoolTypes?.nodes?.some((node: { slug: string }) => node.slug === slug)
  );


  useEffect(() => {
    if (faculty?.schoolTypesColorFontFields.color) {
      setColor(faculty.schoolTypesColorFontFields.color);
    }
  }, [faculty, setColor]);
  
  return (
    <>
      {faculty && (
        <>
          <div
            style={
              {
                "--faculty-color": faculty.schoolTypesColorFontFields.color,
                "--faculty-font":
                  faculty.schoolTypesColorFontFields.courseFontFamily,
              } as React.CSSProperties
            }
          >
            <InnerBanner
              innerPageTitlePrimary={"Faculty of "}
              innerPageTitleSecondary={
                <span className="inner-banner-title">
                  {faculty.schoolTypesColorFontFields.facultyName}
                </span>
              }
              innerPageDescription={`Welcome to the Faculty of ${faculty.schoolTypesColorFontFields.facultyName}.`}
              innerBgDesk={
                faculty.schoolTypesColorFontFields.facultyDesktop?.node?.link ||
                ""
              }
              innerBgMobi={
                faculty.schoolTypesColorFontFields.facultyMobile?.node?.link ||
                ""
              }
            />

            <FaculityOverview
              schoolOverviewTitle={`<span class="faculty-overview-title">${faculty.schoolTypesColorFontFields.schoolOverviewTitle}</span>`}
              OverviewImage={
                faculty.schoolTypesColorFontFields.schoolOverviewImage?.node
                  ?.link || ""
              }
              Overview={faculty.schoolTypesColorFontFields.schoolOverview}
            />
          </div>

          <FacultyCourses slug={slug ?? ""} />

          {matchingDean && (
            <DeanMessage
              title="Dean's"
              DeanName={matchingDean.title}
              designation={matchingDean.staffAcf.designation}
              message={matchingDean.staffAcf.message}
              featuredImage={matchingDean.featuredImage.node}
              fontFamily={
                matchingDean.schoolTypes?.nodes?.find(
                  (node: { slug: string }) => node.slug === slug
                )?.schoolTypesColorFontFields?.courseFontFamily ??
                faculty.schoolTypesColorFontFields.courseFontFamily
              }
               slugUrl={matchingDean?.slug}
              fontColor={
                matchingDean.schoolTypes?.nodes?.find(
                  (node: { slug: string }) => node.slug === slug
                )?.schoolTypesColorFontFields?.color ??
                faculty.schoolTypesColorFontFields.color
              }
            />
          )}
          {matchingHOD && (
            <DeanMessage
              title="Head of Department"
              DeanName={matchingHOD.title}
              designation={matchingHOD.staffAcf.designation}
              message={matchingHOD.staffAcf.message}
              featuredImage={matchingHOD.featuredImage.node}
              fontFamily={
                matchingHOD.schoolTypes?.nodes?.find(
                  (node: { slug: string }) => node.slug === slug
                )?.schoolTypesColorFontFields?.courseFontFamily ??
                faculty.schoolTypesColorFontFields.courseFontFamily
              }
              slugUrl={matchingHOD?.slug}
              fontColor={
                matchingHOD.schoolTypes?.nodes?.find(
                  (node: { slug: string }) => node.slug === slug
                )?.schoolTypesColorFontFields?.color ??
                faculty.schoolTypesColorFontFields.color
              }
            />
          )}
          <MembersLanding
            slug={slug ?? ""}
            sectinTitle1="Faculty"
            sectinTitle2="Members"
            fontFamily={faculty.schoolTypesColorFontFields.courseFontFamily}
            fontColor={faculty.schoolTypesColorFontFields.color}
          />
          <HomeTestimonials />
        </>
      )}
    </>
  );
};

export default FacultyInnerPage;
