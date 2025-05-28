"use client";

import HomeUniversities from "@/components/pages/HomePage/HomeUniversities/HomeUniversities";
import HomeAbout from "@/components/pages/HomePage/HomeAbout/HomeAbout";
import HomeBanner from "@/components/pages/HomePage/HomeBanner/HomeBanner";
import HomeCourses from "@/components/pages/HomePage/HomeCourses/HomeCourses";
import HomeTestimonials from "@/components/pages/HomePage/HomeTestimonials/HomeTestimonials";
import HomeDifference from "@/components/pages/HomePage/HomeDifference/HomeDifference";
import { Fragment, useEffect } from "react";
import HomeNews from "@/components/pages/HomePage/HomeNews/HomeNews";
import { useTheme } from "@/lib/ThemeContext";
import HomeUpcomingEvents from "@/components/pages/HomePage/HomeUpcomingEvents/HomeUpcomingEvents";


export default function Home() {
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);
   
  return (
    <Fragment>
      <HomeBanner />
      <HomeAbout
        title="Welcome to"
        subtitle="ESOFT Uni"
        image="/images/home-main.png"
        content={`
        <span>Welcome to ESU - Sri Lanka's Premier Uni for Higher Education Excellence!</span>
        <br/><br/>
        Established in 2000, ESU has evolved from its origins in computing into a comprehensive, degree-awarding university offering globally recognised qualifications. Today, we serve 15,000 students annually across a dynamic network with a growing academic reputation both locally and internationally. We are committed to academic excellence, industry relevance, and global pathways. ESU offers undergraduate and postgraduate programmes in Computing, Engineering, Business, Law, Art & Design, Education and Life Sciences through its dedicated faculties that combine academic rigour, practical relevance, and an increasing focus on interdisciplinary research. Each faculty is led by credentialed academics and supported by a curriculum that is benchmarked against international standards.
        <br/><br/>
        Join us at ESU - where your unique potential meets infinite possibilities.`}
      />
      <HomeDifference />
      <HomeCourses />
      <HomeUniversities />
      <HomeNews />
      <HomeUpcomingEvents />
      <HomeTestimonials />
    </Fragment>
  );
}
