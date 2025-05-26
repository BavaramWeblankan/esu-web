"use client";

import TitleLarge from "@/components/common/TitleLarge/TitleLarge";
import React, { useEffect, useState } from "react";
import "./style.scss";
import MemberCardItem from "../../Faculty/MembersLanding/MemberCard/MemberCard";
import { graphQLClient } from "@/lib/graphql-client";
import { OUR_STRATEGIC_TEAM } from "@/common/queries/query";
import AboutMemberCardItem from "../../Faculty/MembersLanding/MemberCard/AboutMemberCard";

interface StrategicTeamMember {
  id: string;
  title: string;
  slug: string;
  staffAcf: any;
  featuredImage: any;
  schoolTypes?: {
    nodes?: {
      slug: string;
    }[];
  };
}

const namePriority = [
  "Dr. Dayan Rajapakse",
  "Mr. Nishan Sembacuttiaratchy",
  "Mr. Amila Bandara",
];

const OurStrategicTeam = () => {
  const [ourStrategicTeam, setOurStrategicTeam] = useState<
    StrategicTeamMember[]
  >([]);

  useEffect(() => {
    const fetchStrategicTeam = async () => {
      try {
        const data = await graphQLClient.request<{
          staffType: any;
        }>(OUR_STRATEGIC_TEAM);

        const members = data.staffType.staffs.nodes;

        const sorted = [...members].sort((a, b) => {
          const aIndex = namePriority.indexOf(a.title);
          const bIndex = namePriority.indexOf(b.title);

          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        setOurStrategicTeam(sorted);
      } catch (error) {
        console.error("Error fetching strategic team data:", error);
      }
    };

    fetchStrategicTeam();
  }, []);

  return (
    <section className="our-strategic-team">
      <div className="full-wrap">
        <div className="title-wrap" data-aos="fade-up">
          <TitleLarge title="Our" subtitle=" Strategic Team" />
          <p className="pt-5">
            ESU is guided by a strong and forward-thinking leadership team
            committed to academic excellence, institutional integrity, and
            inclusive growth. With extensive experience across both education
            and industry, our leaders remain actively engaged with key sectors
            to stay ahead of emerging trends and evolving workforce needs. They
            set the university’s strategic direction, cultivate international
            partnerships, and ensure that our programmes are globally relevant
            and locally impactful. Their vision underpins our mission to provide
            accessible, high-quality higher education in Sri Lanka.
          </p>
        </div>

        <div className="strategic-team-members" >
          <div className="members-wrap ">
            {ourStrategicTeam.length === 0 ? (
              <p>No Strategic Team found for this department.</p>
            ) : (
              ourStrategicTeam.map((member, index) => (
                <AboutMemberCardItem key={index} memberData={member} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStrategicTeam;
