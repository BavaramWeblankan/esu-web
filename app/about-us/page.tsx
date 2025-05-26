"use client";
import CampusCards from "@/components/pages/AboutUs/CampusCards/CampusCards";
import StatsSection from "@/components/pages/AboutUs/StatsSection/StatsSection";
import InnerBanner from "@/components/layout/InnerBanner/InnerBanner";
import OurVision from "@/components/pages/AboutUs/OurVision/OurVision";
import AboutSection from "@/components/pages/AboutUs/AboutSection/AboutSection";

import React,{ useEffect } from "react";
import OurStrategicTeam from "@/components/pages/AboutUs/OurStrategicTeam/OurStrategicTeam";
import { useTheme } from "@/lib/ThemeContext";

const page = () => {
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  return (
    <>
      <InnerBanner
        innerPageTitlePrimary={"About"}
        innerPageTitleSecondary={"Us"}
        innerPageDescription="Welcome to ESU – Sri Lanka's premier uni for higher education excellence! Since our inception in 2000, we have evolved into a leading private uni, offering industry-relevant, globally recognised academic programmes. Our growing academic network spans multiple campuses, empowering students to achieve their full potential across a wide range of disciplines."
        innerBgDesk="/images/inner-banner.gif"
        innerBgMobi="/images/inner-banner.gif"
      />
      <AboutSection
        title="Empowering Minds With"
        subtitle="Global Education"
        image="https://esoft.lk/wp-content/uploads/2023/12/About-1.jpg"
        content={`
        At ESU, we offer a diverse range of degree programmes across six dynamic faculties, each designed to equip students with the skills and knowledge to excel in their chosen fields. Our strategic partnerships with globally recognised institutions—including Kingston University London, London Metropolitan University together with our status as a Pearson Platinum Partner (the UK’s largest awarding body), reflect our unwavering commitment to academic excellence. Through these collaborations, students have the opportunity to earn prestigious international qualifications right here in Sri Lanka.
        <br/><br/>
        Our strategic partnerships along with our Pearson Platinum Partner status in affiliation with the UK’s largest awarding body, reflects our unwavering commitment to elevating education standards. Our Pearson Higher National Diplomas (HND) form the first two years of some of our degree programmes, offering students a strong foundation before progressing to complete their degrees either in Sri Lanka or overseas.`}
      />
      <StatsSection />
      <CampusCards />
      <OurVision />
      <OurStrategicTeam />
    </>
  );
};

export default page;
