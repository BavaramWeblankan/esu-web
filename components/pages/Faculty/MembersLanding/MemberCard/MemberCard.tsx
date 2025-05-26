import React from "react";
import "./style.scss";
import Image from "next/image";
import { StaffMember } from "@/common/types/type";

interface Props {
  memberData: StaffMember;
}

const MemberCardItem: React.FC<Props> = ({ memberData }) => {
  const MemberName = memberData?.title;
  const MemberDesignation = memberData?.staffAcf?.designation || "";
  const MemberQualifications = memberData?.staffAcf?.qualifications || "";
  const MemberFeaturedImage = memberData?.featuredImage?.node;
  const SlugUrl = memberData?.slug;

  return (
    <div className="single-massage-card d-flex member-card" data-aos="flip-left">
      <a href={`/academics/${SlugUrl}`} className="single-image-wrap">
        <div className="member-details">
          <h3 className="name">{MemberName}</h3>
          <h4 className="position">{MemberDesignation}</h4>
          <h4 className="qualification">{MemberQualifications}</h4>
        </div>
        <div className="member-image">
          <Image
            src={MemberFeaturedImage?.sourceUrl || "/images/default-profile.png"}
            alt={MemberFeaturedImage?.altText || MemberName || "Profile image"}
            width={500}
            height={500}
          />
        </div>
      </a>
    </div>
  );
};

export default MemberCardItem;