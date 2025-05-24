import React from "react";
import Image from "next/image";
import "./style.scss";
import TitleLarge from "../../../common/TitleLarge/TitleLarge";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const content = `
// <span>Welcome to ESU - Sri Lanka's Premier Uni for Higher Education Excellence!</span>
// <br/><br/>
// Established in 2000, ESU has evolved from its origins in computing into a comprehensive, degree-awarding university offering globally recognised qualifications. Today, we serve 15,000 students annually across a dynamic network with a growing academic reputation both locally and internationally. We are committed to academic excellence, industry relevance, and global pathways. ESU offers undergraduate and postgraduate programmes in Computing, Engineering, Business, Law, Art & Design, Education and Life Sciences through its dedicated faculties that combine academic rigour, practical relevance, and an increasing focus on interdisciplinary research. Each faculty is led by credentialed academics and supported by a curriculum that is benchmarked against international standards.
// <br/><br/>
// Join us at ESU - where your unique potential meets infinite possibilities.
// `; 

interface HomeAboutProps {
  title: string;
  subtitle: string;
  content: string;
  image: string;
}

const HomeAbout: React.FC<HomeAboutProps> = ({ title, subtitle, content, image }) => {
  return (
      <section className="home-about">
        <div className="full-wrap">
          <div className="image-detail-wrap">
            <div className="left">
              <Image
                src={image}
                width={900}
                height={850}
                alt=""
              />
            </div>
            <div className="right">
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

export default HomeAbout;
