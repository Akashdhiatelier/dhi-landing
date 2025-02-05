import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import React from "react";
import BlogContainer from "./_components/BlogContainer";

const BG_IMAGE = "/images/breadcrumb/blog-breadcrumb.jpg";

function Page() {
  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Blogs", link: "/Blogs", isActive: true },
        ]}
        headingText={"Blogs"}
        bgImagePath={BG_IMAGE}
      />
      <BlogContainer />
    </>
  );
}

export default Page;
