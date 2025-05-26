"use client";

import React from "react";
import CustomAccordion from "../../../common/Accordion/Accordion";
import { useTheme } from "@/lib/ThemeContext";

interface Module {
  id: number;
  name: string;
  is_mandatory: number;
  code: string;
}

interface Classification {
  id: number;
  classification_name: string;
  modules: Module[];
}

interface CourseOutlineProps {
  classifications: Classification[];
}

const CourseOutline: React.FC<CourseOutlineProps> = ({ classifications }) => {
  const { color } = useTheme();

  return (
    <div className="course-details-wrapper" data-aos="zoom-in">
      <div id="section3">
        <div className="related-coures-div course-title">
          <h5>
            <span>
              Course <span style={{ color }}>Outline</span>
            </span>
          </h5>
          <hr className="course-title-hr" />
        </div>
        <div className="course-outline-wrap">
          <CustomAccordion classifications={classifications} />
        </div>
      </div>
    </div>
  );
};

export default CourseOutline;
