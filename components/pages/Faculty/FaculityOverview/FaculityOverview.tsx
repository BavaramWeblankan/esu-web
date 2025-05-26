import React from "react";
import "./style.scss";
import Image from "next/image";

interface FaculityOverviewProps {
    schoolOverviewTitle: string;
    OverviewImage: string;
    Overview: string;
}

const FaculityOverview: React.FC<FaculityOverviewProps> = ({
    schoolOverviewTitle,
    OverviewImage,
    Overview,
    
  
}) => {
  return (
    <>
        <section className="course-overview-section position-relative">
            <div className="course-overview-wrap d-flex flex-wrap">
                <div className="course-overview-title" data-aos="fade-up">
                    <h2 className="" dangerouslySetInnerHTML={{ __html: schoolOverviewTitle }}></h2>
                </div>
                <div className="course-overview-image" data-aos="fade-up">
                    <Image 
                        src={OverviewImage} 
                        alt={`${schoolOverviewTitle} Image`} 
                        width={1219} 
                        height={8860} 
                    />
                </div>
                <div className="course-overview" data-aos="fade-up" dangerouslySetInnerHTML={{ __html: Overview }}></div>
            </div>
        </section>  
                 
    </>
  );
};

export default FaculityOverview;
