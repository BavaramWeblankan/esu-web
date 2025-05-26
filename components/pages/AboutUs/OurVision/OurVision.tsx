import TitleLarge from "@/components/common/TitleLarge/TitleLarge";
import Image from "next/image";
import React from "react";
import "./style.scss";

const OurVision = () => {
  return (
    <section className="ourvision-section position-relative">
      <div className="ourvision-section-wrap">
        <div className="ourvision-title-wrap">
          <TitleLarge title="Our" subtitle=" Vision" />
          <div className="d-flex align-items-center justify-content-between ourvision-image-content" data-aos="fade-up">
            <Image
              src="/images/contact-head-office.png"
              alt="Head Office"
              width={1128}
              height={707}
            />

            <div className="our-vision-content" data-aos="fade-up">
              <p>
                To be a nationally leading, globally benchmarked private uni
                that fosters academic excellence, drives research and
                innovation, and prepares students for meaningful careers through
                strong industry integration, contributing to a knowledgeable,
                future-ready society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
