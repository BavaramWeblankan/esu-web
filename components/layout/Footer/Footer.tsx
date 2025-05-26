"use client";

import Image from "next/image";
import Link from "next/link";
import "./style.scss";
import { useTheme } from "@/lib/ThemeContext";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { color } = useTheme();

  return (
    <footer className="footer ">
      {/* <div className="footer-border"></div> */}
      <div className="footer-social" style={{ backgroundColor: color }}>
        <div className="social-banner small-middle-wrap">
          <div className="hashtag">#ESULife</div>
          {
            <div className="social-icons">
              <div className="icon">
                <Link
                  href="https://www.facebook.com/p/ESULK-61576131141044/"
                  target="_blank"
                >
                  <FaFacebookF />
                </Link>
              </div>
              <div className="icon">
                <Link
                  href="https://www.instagram.com/esu.lk?igsh=em96N3kwZ3Uxc2xk"
                  target="_blank"
                >
                  <FaInstagram />
                </Link>
              </div>
              <div className="icon">
                <Link
                  href="https://www.linkedin.com/company/esu-lk/"
                  target="_blank"
                >
                  <FaLinkedinIn />
                </Link>
              </div>
              <div className="icon">
                <Link
                  href="https://www.tiktok.com/@esu.lk?_t=ZS-8wXBCM65Bn5&_r=1"
                  target="_blank"
                >
                  <FaTiktok />
                </Link>
              </div>
              {/*               <div className="icon">
                <Link
                  href="https://www.youtube.com/channel/UCrVBMxBtZy7iVHecsUUycew"
                  target="_blank"
                >
                  <FaYoutube />
                </Link>
              </div> */}
            </div>
          }
        </div>
      </div>

      <div className="footer-content-wrap">
        <div className="footer-content small-middle-wrap">
          <div className="column contact">
            <h4>CONTACT DETAILS</h4>
            <p>
              <strong>Hotline</strong> <br />
              <Link href="tel:+94117572572">+94 117 572 572</Link>
            </p>
            <p>
              <strong>Email</strong> <br />
              <Link href="mailto:info@esu.lk">info@esu.lk</Link>
            </p>
            <p>
              <strong>Address</strong> <br />
              ESOFT Uni, No.03,
              <br />
              De Fonseka Place,
              <br />
              Colombo 4, Sri Lanka.
            </p>
            <div className="awards">
              <h4>OUR AWARDS</h4>
              <Image
                src={"/images/best-web-logo.png"}
                alt="Award Seal"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="copyright">
              <p>Copyright © 2025 ESOFT UNI</p>
            </div>
          </div>
          <div className="column links">
            <h4>QUICK LINKS</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/faculties">Faculties</Link>
              </li>
              <li>
                <Link href="/academics">Academics</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/news">News & Events</Link>
              </li>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/research">Research</Link>
              </li>
            </ul>
          </div>
          <div className="column links">
            {/*   <h4>IMPORTANT LINKS</h4> */}
            {/* <ul>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/facilities">Faculties</Link>
              </li>
              <li>
                <Link href="https://esoft.lk/transfer-programmes/">
                  Transfer Programmes
                </Link>
              </li>
              <li>
                <Link href="https://esoft.lk/privacy-policy/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://esoft.lk/payment-policy/">
                  Payment Policy
                </Link>
              </li>
              <li>
                <Link href="https://esoft.lk/refund-policy/">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="https://esoft.lk/cookie-policy/">
                  Quality Policy
                </Link>
              </li>
              <li>
                <Link href="https://referrals.esoft.lk/referrer/login">
                  Referrals
                </Link>
              </li>
            </ul> */}
          </div>
          <div className="background-logo">
            <Image
              src={"/images/logo/esu-footer.png"}
              width={700}
              height={400}
              alt=""
              style={{ objectFit: "contain", objectPosition: "right bottom" }}
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ backgroundColor: color }}>
        <p>
          Website Designed And Developed By{" "}
          <Link href="https://www.weblankan.com/" target="_blank">
            <strong>Web Lankan</strong>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
