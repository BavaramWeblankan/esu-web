import React from "react";
import Image from "next/image";
import "./style.scss";
import TitleLarge from "../../../common/TitleLarge/TitleLarge";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HomeAboutProps {
  title: string;
  subtitle: string;
  content: string;
  image: string;
}

const AboutSection: React.FC<HomeAboutProps> = ({
  title,
  subtitle,
  content,
  image,
}) => {
  return (
    <section className="home-about">
      <div className="full-wrap">
        <div className="image-detail-wrap">
          <div className="left" data-aos="flip-left">
            <Image src={image} width={900} height={850} alt="" />
          </div>
          <div className="right" data-aos="fade-up" >
            <div className="title-wrap">
              <TitleLarge title={title} subtitle={subtitle} />
            </div>
            <div className="button-wrap">
              {/* <Button buttonName="About Us" buttonUrl="#" /> */}
            </div>
            <div
              className="the-content-div"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
