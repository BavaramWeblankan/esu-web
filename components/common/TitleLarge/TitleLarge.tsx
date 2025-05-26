"use client";

import React from "react";
import "./style.scss";
import { useTheme } from "@/lib/ThemeContext";
import { TitleInterface } from "@/common/interfaces/interface";

const TitleLarge: React.FC<TitleInterface> = ({ title, subtitle }) => {
  const { color } = useTheme();

  return (
    <div className="title-wrapper"  >
      <div className="main-title-large">
        <h2 style={{ margin: "0px" }}>
          {title} <span style={{ color: color }}>{subtitle}</span>
        </h2>
      </div>
    </div>
  );
};

export default TitleLarge;
