import React from "react";
import "./style.scss";
import Image from "next/image";

const ContactHeadOffice = () => {
  return (
    <section className="headoffice-section position-relative" >
      <div className="headoffice-section-wrap">
        <div className="headoffice-title-wrap" data-aos="zoom-in">
          <h2 className="headoffice-title">
            BUILD <br></br>{" "}
            <span>
              Your Career with <strong>us</strong>
            </span>
          </h2>
          <Image
            src="/images/contact-head-office.png"
            alt="Head Office"
            width={1128}
            height={707}
          />
        </div>
        <div className="headoffice-details" data-aos="fade-up">
          <div className="single-branch">
            <h3 className="branch-title">General Inquiries</h3>
            <div className="branch-details">
              <div className="address">
                <p className="label">Address</p>
                <p>No 03, De Fonseka Place, Colombo 4, Sri Lanka.</p>
              </div>
              <div className="email">
                <p className="label">Email</p>
                <a href="mailto:info@esu.lk">info@esu.lk</a>
              </div>
              <div className="call-us">
                <p className="label">Call Us on</p>
                <a href="tel:+94 117 572 572" className="">
                  +94 117 572 572
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="social-media">
            <ul>
              <li><a href="#"><Image src="/images/facebook-icon.png" alt="Facebook" width={24} height={24} /></a></li>
              <li><a href="#"><Image src="/images/youtube-icon.png" alt="Youtube" width={24} height={24} /></a></li>
              <li><a href="#"><Image src="/images/instagram-icon.png" alt="Instagram" width={24} height={24} /></a></li>
            </ul>
          </div> */}
      </div>
    </section>
  );
};

export default ContactHeadOffice;
