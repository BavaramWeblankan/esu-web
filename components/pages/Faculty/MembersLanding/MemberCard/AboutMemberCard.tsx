"use client";
import React, { useState } from "react";
import "./style.scss";
import Image from "next/image";
import { StaffMember } from "@/common/types/type";

interface Props {
  memberData: StaffMember;
}

const AboutMemberCardItem: React.FC<Props> = ({ memberData }) => {
  const [showModal, setShowModal] = useState(false);

  const MemberName = memberData?.title;
  const MemberDesignation = memberData?.staffAcf?.designation || "";
  const MemberQualifications = memberData?.staffAcf?.qualifications || "";
  const MemberMessage = memberData?.staffAcf?.message || "";
  const MemberFeaturedImage = memberData?.featuredImage?.node;

  return (
    <>
      <div
        className="single-massage-card d-flex member-card"
        data-aos="flip-left"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="single-image-wrap">
          <div className="member-details">
            <h3 className="name">{MemberName}</h3>
            <h4 className="position">{MemberDesignation}</h4>
            <h4 className="qualification">{MemberQualifications}</h4>
          </div>
          <div className="member-image">
            <Image
              src={
                MemberFeaturedImage?.sourceUrl || "/images/default-profile.png"
              }
              alt={
                MemberFeaturedImage?.altText || MemberName || "Profile image"
              }
          
              width={352}
              height={352}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
     {showModal && (
  <div className="member-modal-overlay" onClick={() => setShowModal(false)}>
    <div className="member-modal" onClick={e => e.stopPropagation()}>
      <button className="close-btn" onClick={() => setShowModal(false)}>
        ×
      </button>
      <div className="member-modal-header member-modal-header-flex">
        <div className="member-image" style={{ marginBottom: 0 }}>
          <Image
            src={MemberFeaturedImage?.sourceUrl || "/images/default-profile.png"}
            alt={MemberFeaturedImage?.altText || MemberName || "Profile image"}
            width={70}
            height={70}
            layout="responsive"
                className="member-image-modal"
            style={{ borderRadius: "20px" }}
          />
        </div>
        <div className="member-modal-details">
          <h2>{MemberName}</h2>
          <h4 className="qualification" >{MemberDesignation}</h4>
          {/* <h4 className="qualification">{MemberQualifications}</h4> */}
        </div>
      </div>
      <div className="member-modal-body">
        <div className="member-message">{MemberMessage}</div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default AboutMemberCardItem;
