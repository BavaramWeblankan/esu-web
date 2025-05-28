"use client";

import { useEffect, useState } from "react";
import InnerBanner from "@/components/layout/InnerBanner/InnerBanner";
import FaculityCard from "@/components/pages/Faculty/FaculityCard/FaculityCard";
import DeanMessage from "@/components/pages/Faculty/DeanMessage/DeanMessage";
import { graphQLClient } from "@/lib/graphql-client";
import {
  FACULTY_TYPES_QUERY,
  VICE_CHANCELLOR_QUERY,
} from "@/common/queries/query";
import { Faculty, ViceChancellor } from "@/common/types/type";
import { title } from "process";
import { useTheme } from "@/lib/ThemeContext";

const Page = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [viceChancellor, setViceChancellor] = useState<ViceChancellor | null>(
    null
  );

  const { color, setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facultyRes, vcRes] = await Promise.all([
          graphQLClient.request<{ schoolTypes: { nodes: Faculty[] } }>(
            FACULTY_TYPES_QUERY
          ),
          graphQLClient.request<{
            staffType: {
              staffs: {
                nodes: ViceChancellor[];
              };
            };
          }>(VICE_CHANCELLOR_QUERY),
        ]);

        setFaculty(facultyRes.schoolTypes.nodes);

        const vc = vcRes.staffType.staffs.nodes[0];
        setViceChancellor(vc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {
        <InnerBanner
          innerPageTitlePrimary={"Our"}
          innerPageTitleSecondary={"Faculties"}
          innerPageDescription=""
          innerBgDesk="/images/inner-banner.gif"
          innerBgMobi="/images/inner-banner.gif"
        />
      }

      <div className="faculty-wrap">
        {/* ✅ Vice Chancellor Message Card */}
        {viceChancellor && (
          <DeanMessage
            title="Vice Chancellor's"
            DeanName={viceChancellor.title}
            designation={viceChancellor.staffAcf.designation || ""}
            message={viceChancellor.staffAcf.message || ""}
            featuredImage={{
              sourceUrl:
                viceChancellor.featuredImage?.node?.sourceUrl ||
                "/images/placeholder.jpg",
              altText:
                viceChancellor.featuredImage?.node?.altText ||
                "Vice Chancellor",
            }}
            slugUrl={viceChancellor?.slug}
            fontFamily={"inherit"} // You can update this if you add font in VC fields
            fontColor={color} // Update if VC fields include color
          />
        )}

        {/* ✅ Faculty Cards */}
        {faculty.map((faculity) => {
          const imageUrl =
            faculity.schoolTypesColorFontFields?.facultyDesktop?.node
              ?.sourceUrl || "/images/faculity-desk.png";
          const fontFamily =
            faculity.schoolTypesColorFontFields?.courseFontFamily?.[0] ||
            "inherit";
          const fontColor =
            faculity.schoolTypesColorFontFields?.color || "inherit";

          return (
            <FaculityCard
              key={faculity.id}
              faculityImgDesk={imageUrl}
              faculityImgMobi={imageUrl}
              faculityName={
                faculity.schoolTypesColorFontFields?.facultyName || ""
              }
              faculityIntro={faculity.description || ""}
              facilityLink={faculity.slug}
              fontFamily={fontFamily}
              fontColor={fontColor}
            />
          );
        })}
      </div>
    </>
  );
};

export default Page;
