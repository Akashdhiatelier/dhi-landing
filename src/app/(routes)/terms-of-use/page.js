import NewsLetterSection from "@/app/_components/NewsletterSection/NewsLetterSection";
import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import React from "react";
import TermsOfUse from "./_components/TermsOfUse";

const BG_IMAGE = "/images/breadcrumb/terms-breadcrumb.jpg";

function page() {
  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Terms & Condition", link: "/terms-of-use", isActive: true },
        ]}
        headingText={"Terms & Condition"}
        bgImagePath={BG_IMAGE}
      />
      <TermsOfUse />
      <NewsLetterSection />
    </>
  );
}

export default page;
