"use client";

import { useTheme } from "@/lib/ThemeContext";
import { useState } from "react";
import "./style.scss";

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

const CustomAccordion = ({ classifications }: { classifications: Classification[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { color } = useTheme();

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="accordion" id="accordionExample">
      {classifications.map((classification, index) => (
        <div className="accordion-item" key={classification.id}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`collapse${index}`}
              style={{ backgroundColor: color }}
            >
              {classification.classification_name}
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
            aria-labelledby={`heading${index}`}
          >
            <div className="accordion-body">
              {classification.modules?.length > 0 ? (
                <table className="module-table">
                  <thead>
                    <tr>
                      <th>Module Code</th>
                      <th>Module Name</th>
                      <th className="center-td">Mandatory/Optional</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classification.modules.map((module) => (
                      <tr key={module.id}>
                        <td>{module.code || "-"}</td>
                        <td>{module.name}</td>
                        <td className="center-td">
                          {module.is_mandatory ? "Mandatory" : "Optional"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No modules available.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
