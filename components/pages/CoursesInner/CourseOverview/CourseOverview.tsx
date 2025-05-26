"use client";

import { useTheme } from "@/lib/ThemeContext";
import React from "react";

interface CourseOverviewProps {
  course?: {
    description?: string;
  };
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  const { color, setColor } = useTheme();

  return (
    <>
      {/* <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      /> */}
      <div className="course-details-wrapper" data-aos="zoom-in" >
        <div id="section1" className="related-coures-div course-title">
          <h5>
            <span>
              Course <span style={{ color }}>Overview</span>
            </span>
          </h5>
        </div>
        <div>
          <div
            className="the-content-div"
            dangerouslySetInnerHTML={{
              __html: course?.description || "",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CourseOverview;
