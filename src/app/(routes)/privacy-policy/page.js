import NewsLetterSection from "@/app/_components/NewsletterSection/NewsLetterSection";
import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import React from "react";
import PrivacyPolicy from "./_components/PrivacyPolicy";

const BG_IMAGE = "/images/breadcrumb/privacy-breadcrumb.jpg";

function page() {
  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Privacy", link: "/Privacy-policy", isActive: true },
        ]}
        headingText={"Privacy"}
        bgImagePath={BG_IMAGE}
      />
      <PrivacyPolicy />
      <NewsLetterSection />
    </>
  );
}

export default page;
