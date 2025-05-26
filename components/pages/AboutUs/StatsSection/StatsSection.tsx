"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import "./style.scss";

import {
  FaGraduationCap,
  FaUniversity,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";

type Stat = {
  icon: JSX.Element;
  number: number;
  label: string;
  suffix?: string;
};

const stats: Stat[] = [
  {
    icon: <FaGraduationCap />,
    number: 6,
    label: "Faculties",
  },
  {
    icon: <FaUniversity />,
    number: 3,
    label: "Main Campuses",
  },
  {
    icon: <FaChalkboardTeacher />,
    number: 400,
    label: "Full-time Academics",
    suffix: "+",
  },
  {
    icon: <FaUserGraduate />,
    number: 15000,
    label: "Students",
    suffix: "+",
  },
];

const CountUp = ({
  end,
  duration = 1200,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
        setFinished(true);
      }
    };
    setFinished(false);
    requestAnimationFrame(step);
  }, [end, duration, visible]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {finished && suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="stats-section" >
      <div className="stats-container">
        {stats.map((item, index) => (
          <div key={index} className="stat-box" data-aos="flip-left">
            <div className="stat-icon">{item.icon}</div>
            <div className="stats-content">
              <div className="stat-number">
                <CountUp end={item.number} suffix={item.suffix || ""} />
              </div>
              <div className="stat-label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
