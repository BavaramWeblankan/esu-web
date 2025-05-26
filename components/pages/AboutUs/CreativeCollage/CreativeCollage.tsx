"use client";

import Image from "next/image";
import "./style.scss";
import TitleLarge from "@/components/common/TitleLarge/TitleLarge";

interface CreativeCollageProps {
  slug: string;
}

const CreativeCollage: React.FC<CreativeCollageProps> = ({ slug }) => {
  const images = [];

  // if (slug === "colombo-campus") {
  //   images.push(
  //     [
  //       {
  //         "/images/colombo-campus-1.jpg",
  //       }
  //     ]
  //   )
  // }

  return (
    <section className="creative-collage" data-aos="zoom-in" >
      <TitleLarge title="Campus" subtitle=" Highlights" />
      <br />
      <br />
      <div className="grid-wrapper">
        <div className="tall">
          <img src="/images/designer1.png" alt="" />
        </div>

        <div className="wide">
          <img src="/images/students-learning.png" alt="" />
        </div>

        <div className="wide">
          <img src="/images/idea-head.png" alt="" />
        </div>
        <div className="tall">
          <img src="/images/designer1.png" alt="" />
        </div>
        <div className="wide">
          <img src="/images/designer-drawing.png" alt="" />
        </div>

        <div className="wide">
          <img src="/images/students-learning.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default CreativeCollage;
