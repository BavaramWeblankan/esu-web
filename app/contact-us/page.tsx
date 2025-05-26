"use client";
import React, { useEffect } from "react";
import "./style.scss";
import InnerBanner from "@/components/layout/InnerBanner/InnerBanner";
import ContactCards from "@/components/pages/Contact/ContactCards/ContactCards";
import ContactForm from "@/components/pages/Contact/ContactForm/ContactForm";
import ContactHeadOffice from "@/components/pages/Contact/ContactHeadOffice/ContactHeadOffice";
import { useTheme } from "@/lib/ThemeContext";

const page = () => {
  const { setColor } = useTheme();
  useEffect(() => {
    setColor("rgb(0, 174, 205)");
  }, [setColor]);

  return (
    <>
      <InnerBanner
        innerPageTitlePrimary={"Contact"}
        innerPageTitleSecondary={"Us"}
        innerPageDescription="Connect with Excellence! Reach out to ESOFT Uni today – where all your questions find answers, and your future begins. Your life-changing journey towards knowledge, innovation and success starts with a simple touch. Contact us now and let's shape your future together!"
        innerBgDesk="/images/contact-inner-banner.gif"
        innerBgMobi="/images/contact-inner-banner.gif"
      />
      <ContactHeadOffice />
      <ContactCards about={false} />
      <ContactForm />
    </>
  );
};

export default page;
