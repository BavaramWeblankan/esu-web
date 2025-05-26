"use client";

import React, { JSX } from "react";
import Image from "next/image";
import "./style.scss";
import TitleLarge from "@/components/common/TitleLarge/TitleLarge";
import {
  FaLaptopCode,
  FaChalkboardTeacher,
  FaBalanceScale,
  FaPaintBrush,
  FaBriefcase,
  FaUsers,
  FaClinicMedical,
  FaParking,
  FaPray,
  FaLaptop,
  FaMicroscope,
  FaBook,
  FaDumbbell,
  FaWifi,
  FaUniversity,
  FaGamepad,
} from "react-icons/fa";

type Facility = {
  icon: JSX.Element;
  label: string;
};

const facilities: Facility[] = [
  {
    icon: <FaLaptopCode />,
    label: "Cutting-edge IT labs with 500+ Computers",
  },
  {
    icon: <FaChalkboardTeacher />,
    label: "Modern Lecture Halls",
  },
  {
    icon: <FaBalanceScale />,
    label: "Specialized Moot Court",
  },
  {
    icon: <FaBriefcase />,
    label: "Dedicated School Facilities",
  },
  {
    icon: <FaUsers />,
    label: "Student Recitation Area",
  },
  {
    icon: <FaClinicMedical />,
    label: "Medical Centre",
  },
  {
    icon: <FaParking />,
    label: "Modern Parking Facility",
  },
  {
    icon: <FaPray />,
    label: "Prayer Room",
  },
  {
    icon: <FaLaptop />,
    label: "Smart Class Rooms",
  },
  {
    icon: <FaMicroscope />,
    label: "Bio-Medical Lab",
  },
  {
    icon: <FaBook />,
    label: "Comprehensive Library",
  },
  {
    icon: <FaDumbbell />,
    label: "On-campus Gym",
  },
  {
    icon: <FaWifi />,
    label: "Free Wi-Fi",
  },
  {
    icon: <FaUniversity />,
    label: "Auditoriums",
  },
  {
    icon: <FaGamepad />,
    label: "Pool Tables and Indoor Games",
  },
];

const CampusFacilities = () => {
  return (
    <section className="campus-facilities" data-aos="fade-up"  >
      <TitleLarge title="Our" subtitle=" Campus Facilities" />
      <br />
      <br />
      <div className="facility-grid">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className={`facility-box ${index === 1 ? "active" : ""}`} // Highlight the second item
          >
            <div className="facility-icon">{facility.icon}</div>
            <span className="facility-label">{facility.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusFacilities;
