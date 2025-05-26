"use client";

import Link from "next/link";
import Image from "next/image";
import "./style.scss";
import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import InquireForm from "@/components/sections/InquireForm/InquireForm";
import { FaArrowRight } from "react-icons/fa";
import { graphQLClient } from "@/lib/graphql-client";
import { CourseMenuResponse, CourseNode } from "@/common/interfaces/interface";
import { GET_MENU_COURSE_BY_SLUG_SELECTED } from "@/common/queries/query";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const [facultyArtDesignMenu, setFacultyArtDesignMenu] = useState<
    CourseNode[]
  >([]);
  const [facultyComputingMenu, setFacultyComputingMenu] = useState<
    CourseNode[]
  >([]);
  const [facultyLifeScienceMenu, setFacultyLifeScienceMenu] = useState<
    CourseNode[]
  >([]);
  const [facultyEngineeringMenu, setFacultyEngineeringMenu] = useState<
    CourseNode[]
  >([]);
  const [facultyBusinessLawMenu, setFacultyBusinessLawMenu] = useState<
    CourseNode[]
  >([]);
  const [
    facultyLanguagesEducationSociologyMenu,
    setFacultyLanguagesEducationSociologyMenu,
  ] = useState<CourseNode[]>([]);

  const slugs = [
    "faculty-of-art-design",
    "faculty-of-computing",
    "faculty-of-life-science",
    "faculty-of-engineering",
    "faculty-of-business-law",
    "faculty-of-languages-education-and-sociology",
  ];

  useEffect(() => {
    const fetchCourseMenu = async (slug: string) => {
      const data = await graphQLClient.request<CourseMenuResponse>(
        GET_MENU_COURSE_BY_SLUG_SELECTED,
        { slug }
      );

      const enableCourse = data.schoolType?.courses?.nodes.filter(
        (course) => course.courses.enableCourseInTheMenu === true
      );

      switch (slug) {
        case "faculty-of-art-design":
          setFacultyArtDesignMenu(enableCourse);
          break;
        case "faculty-of-computing":
          setFacultyComputingMenu(enableCourse);
          break;
        case "faculty-of-life-science":
          setFacultyLifeScienceMenu(enableCourse);
          break;
        case "faculty-of-engineering":
          setFacultyEngineeringMenu(enableCourse);
          break;
        case "faculty-of-business-law":
          setFacultyBusinessLawMenu(enableCourse);
          break;
        case "faculty-of-languages-education-and-sociology":
          setFacultyLanguagesEducationSociologyMenu(enableCourse);
          break;
      }
    };

    slugs.forEach(fetchCourseMenu);
  }, []);

  const handleMouseEnter = () => {
    if (hideTimer) clearTimeout(hideTimer);
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => setShowMegaMenu(false), 300);
    setHideTimer(timer);
  };

  return (
    <>
      <header id="header" className="header">
        <div className="top-bar">
          <div className="max-wrap">
            <nav className="navbar navbar-expand-lg nav-menu">
              <ul className="navbar-nav navbardropdown" id="top-menu">
                <li>
                  <Link href="/news">News & Events</Link>
                </li>
                <li>
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li>
                  <Link href="/research">Research</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="bottom-bar">
          <div className="main-wrap d-flex justify-content-between main-menu-wrap">
            <div className="d-flex main-menu-inner-wrap w-100 justify-content-between">
              <div className="ml-auto mobile-margin-auto">
                <Link href="/">
                  <Image
                    src="/images/logo/esu-header.png"
                    width={150}
                    height={50}
                    alt="Logo"
                    className="desktop-esu-logo"
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                  <Image
                    src="/images/logo/esu-header.png"
                    width={150}
                    height={50}
                    alt="Logo"
                    className="mobile-esu-logo"
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                </Link>
              </div>

              <div className="middle-menu">
                <nav className="navbar navbar-expand-lg nav-menu">
                  <ul className="navbar-nav navbardropdown" id="primary">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="/courses">Courses</Link>
                    </li>
                    <li>
                      <Link href="/faculties">Faculties</Link>
                    </li>
                    <li>
                      <Link href="/academics">Academics</Link>
                    </li>
                    <li>
                      <Link href="/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="mobile-div hamburger-wrap">
                <button
                  className="navnavbar-toggler hamburger classic navoffcanvas-header d-flex flex-wrap"
                  type="button"
                  onClick={toggleMobileMenu}
                >
                  <div className="hamburger" id="hamburger-1">
                    <span className="linee line-one"></span>
                    <span className="linee line-two"></span>
                    <span className="linee line-three"></span>
                  </div>
                  <span className="ham-title">MENU</span>
                </button>
              </div>

              <div className="apply-now-wrap desktop-only-view">
                <Modal>
                  <InquireForm />
                </Modal>
              </div>
            </div>
          </div>

          <div className="apply-now-wrap mobile-only-view">
            <Modal>
              <InquireForm />
            </Modal>
          </div>
        </div>
      </header>

      <nav
        id="navbar_main_nav"
        className={`navmobile-offcanvas navbar navbar-expand-lg navbar-dark bg-primary ${
          isMobileMenuOpen ? "show-mobile-menu" : "hide-mobile-menu"
        }`}
      >
        <div className="main-wrap">
          <nav className="navbar navbar-expand-lg nav-menu">
            <ul className="navbar-nav navbardropdown" id="mobile">
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link href="/about-us" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              </li>
              <li>
                <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
              </li>
              <li>
                <Link href="/faculties" onClick={() => setMobileMenuOpen(false)}>Faculties</Link>
              </li>
              <li>
                <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              </li>
              <li>
                <Link href="/news" onClick={() => setMobileMenuOpen(false)}>News & Events</Link>
              </li>
              <li>
                <Link href="/blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
              </li>
              <li>
                <Link href="/research" onClick={() => setMobileMenuOpen(false)}>Research</Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
};

export default Header;
