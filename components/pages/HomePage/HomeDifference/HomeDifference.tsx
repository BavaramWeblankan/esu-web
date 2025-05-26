"use client";

import React from "react";
import Image from "next/image";
import TitleExtraSmall from "../../../common/TitleExtraSmall/TitleExtraSmall";
import "./style.scss";
import { useTheme } from "@/lib/ThemeContext";

const HomeDifference: React.FC = () => {
  const { color } = useTheme();

  return (
    <>
      <section className="home-difference-section">
        <div className="home-difference-wrap">
          <div className="single-difference" data-aos="fade-up">
            <div className="difference-text">
              <div className="title-wrap">
                <TitleExtraSmall
                  title="A Space To "
                  subtitle=" &nbsp; Grow, Lead, and Belong"
                />
              </div>
              <p>
                From meaningful friendships to memorable moments, our
                environment is built for connection and discovery. Students find
                the freedom to express themselves, step into leadership, and
                feel part of something bigger every step of the way.
              </p>
            </div>
            <div className="difference-image">
              <Image
                src="/images/1.png"
                alt="Students sitting together on stairs"
                width={360}
                height={250}
                className="difference-img"
              />
            </div>
          </div>
          <div
            className="single-difference reverse"
            style={{ backgroundColor: color }}
            data-aos="fade-up"
          >
            <div className="difference-text">
              <div className="title-wrap">
                <TitleExtraSmall
                  title="Turning "
                  subtitle="&nbsp; Ambition Into Direction"
                />
              </div>
              <p>
                We don’t just talk about goals; we help shape them. With
                personalised support and real-world exposure, students gain the
                clarity and confidence to turn potential into purpose—and dreams
                into action.
              </p>
            </div>
            <div className="difference-image">
              <Image
                src="/images/2.png"
                alt="Student reading on a swing chair"
                width={360}
                height={250}
                className="difference-img"
              />
            </div>
          </div>
          <div className="single-difference" data-aos="fade-up" >
            <div className="difference-text">
              <div className="title-wrap">
                <TitleExtraSmall
                  title="Learning  "
                  subtitle="&nbsp; Beyond The Classroom"
                />
              </div>
              <p>
                We bring the real world to our students through collaboration
                with professionals, exposure to current challenges, and hands-on
                experience. It’s more than education; it’s preparation to thrive
                in a fast-changing world.
              </p>
            </div>
            <div className="difference-image">
              <Image
                src="/images/3.png"
                alt="Students working together on a laptop"
                width={360}
                height={250}
                className="difference-img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeDifference;
