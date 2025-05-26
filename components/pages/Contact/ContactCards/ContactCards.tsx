import React from "react";
import "./style.scss";

interface ContactCardsProps {
  about?: any; // Replace 'any' with a more specific type if available
}

const ContactCards = ({ about }: ContactCardsProps) => {
  return (
    <section className="branches-section">
      <div className="branches-section-wrap"  >
        <div className="single-branch " data-aos="zoom-in">
          <h3 className="branch-title">Colombo</h3>
          <div className="branch-details">
            <div className="address">
              <p className="label">Address</p>
              <p>
                No 03,<br />
                De Fonseka Place, Colombo 4,<br /> Sri Lanka.
              </p>
            </div>
            <div className="contact-row">
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

        <div className="single-branch" data-aos="zoom-in">
          <h3 className="branch-title">Kandy</h3>
          <div className="branch-details">
            <div className="address">
              <p className="label">Address</p>
              <p>
                No 479,
                <br />
                William Gopallawa mawatha, <br />
                Kandy,<br /> Srilanka
              </p>
            </div>
            <div className="contact-row">
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
      </div>
    </section>
  );
};

export default ContactCards;