"use client";

import {
  CAMPUS_VICE_CHANCELLOR_QUERY,
  FACULTY_TYPES_QUERY,
  VICE_CHANCELLOR_QUERY,
} from "@/common/queries/query";
import { Faculty, ViceChancellor } from "@/common/types/type";
import InnerBanner from "@/components/layout/InnerBanner/InnerBanner";
import CampusFacilities from "@/components/pages/AboutUs/CampusFacilities/CampusFacilities";
import CreativeCollage from "@/components/pages/AboutUs/CreativeCollage/CreativeCollage";
import ContactHeadOffice from "@/components/pages/Contact/ContactHeadOffice/ContactHeadOffice";
import DeanMessage from "@/components/pages/Faculty/DeanMessage/DeanMessage";
import { graphQLClient } from "@/lib/graphql-client";
import { useTheme } from "@/lib/ThemeContext";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [viceChancellor, setViceChancellor] = useState<ViceChancellor | null>(
    null
  );

  const { color, setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const facultySlugRaw = slug || "";
  const words = facultySlugRaw.split("-");

  const sentenceCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const [firstWord, secondWord] = sentenceCaseWords;

  // Optional: join the full sentence-cased title if needed
  const facultyTitle = sentenceCaseWords.join(" ");
  // console.log("facultySlug", facultySlug);

  console.log("slug", slug);

  useEffect(() => {
    const fetchData = async (campusSlug: any) => {
      console.log("campus slug", campusSlug);

      try {
        const data = await graphQLClient.request<{
          staffType: {
            staffs: {
              nodes: ViceChancellor[];
            };
          };
        }>(CAMPUS_VICE_CHANCELLOR_QUERY, { slug: campusSlug });

        const vc = data.staffType?.staffs?.nodes?.[0];
        //console.log("Vice Chancellor Data:", vc); // ✅ log the fetched VC data
        setViceChancellor(vc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    var campusSlug = null;

    switch (slug) {
      case "colombo-campus":
        campusSlug = "colombo-vice-chancellor";
        break;
      case "kandy-campus":
        campusSlug = "kandy-vice-chancellor";
        break;
      case "jaffna-campus":
        campusSlug = "jaffna-vice-chancellor";
        break;
      default:
        break;
    }

    fetchData(campusSlug);
  }, []);

  return (
    <>
      <InnerBanner
        innerPageTitlePrimary={"ESU " + firstWord}
        innerPageTitleSecondary={
          <span className="inner-banner-title">{secondWord}</span>
        }
        innerPageDescription="Welcome to ESU – Sri Lanka's premier uni for higher education excellence! Since our inception in 2000, we have evolved into a leading private uni, offering industry-relevant, globally recognised academic programmes. Our growing academic network spans multiple campuses, empowering students to achieve their full potential across a wide range of disciplines."
        innerBgDesk="/images/inner-banner.gif"
        innerBgMobi="/images/inner-banner.gif"
      />

      {viceChancellor && (
        <DeanMessage
          title="Pro Vice Chancellor's"
          DeanName={viceChancellor.title}
          designation={viceChancellor.staffAcf.designation || ""}
          message={viceChancellor.staffAcf.viceChancellorMessage || ""}
          featuredImage={{
            sourceUrl:
              viceChancellor.featuredImage?.node?.sourceUrl ||
              "/images/placeholder.jpg",
            altText:
              viceChancellor.featuredImage?.node?.altText || "Vice Chancellor",
          }}
          fontFamily={"inherit"} // You can update this if you add font in VC fields
          fontColor={color} // Update if VC fields include color
        />
      )}

      <CampusFacilities />

      {/* <CreativeCollage slug={slug || ""} /> */}

      <ContactHeadOffice />
    </>
  );
};

export default page;
