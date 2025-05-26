"use client";

import React from "react";
import "./style.scss";
import Image from "next/image";

interface DeanMessageProps {
  title: string;
  DeanName: string;
  designation: string;
  message: string;
  featuredImage: {
    sourceUrl: string;
    altText: string;
  };
  fontFamily: string;
  fontColor: string;
}

const DeanMessage: React.FC<DeanMessageProps> = ({
  title,
  DeanName,
  designation,
  message,
  featuredImage,
  fontFamily,
  fontColor,
}) => {
  return (
    <section className="dean-massage">
      <div className="dean-massage-wrap">
        <div className="massage-wrap">
          <div className="single-massage-card d-flex">
            <div className="single-image-wrap" data-aos="fade-up">
              <div className="member-details">
                <h3 className="name">{DeanName}</h3>
                <h4 className="position">{designation}</h4>
              </div>
              <div className="member-image">
                <Image
                  src={featuredImage.sourceUrl}
                  alt={featuredImage.altText}
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="single-massage" data-aos="fade-up">
              <h2 className="dean-message-title" style={{ fontFamily }}>
                {title}
                <span style={{ color: fontColor }}>
                  <br />
                  Message
                </span>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: message }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeanMessage;
