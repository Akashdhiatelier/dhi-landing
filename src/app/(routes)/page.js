import Image from "next/image";
import HeaderSection from "../_components/HeaderSection/HeaderSection";
import HeroSection from "../_components/HeroSection/HeroSection";
import HowItWorks from "../_components/HowItWorks/HowItWorks";
import Module3dSection from "../_components/Module3dSection/Module3dSection";
import FeatureSection from "../_components/FeatureSection/FeatureSection";
import ProjectSection from "../_components/ProjectsSection/ProjectSection";
import BlogSection from "../_components/BlogSection/BlogSection";
import NewsLetterSection from "../_components/NewsletterSection/NewsLetterSection";
import FooterSection from "../_components/FooterSection/FooterSection";
// import CopyrightSection from "../_components/CopyrightSection/CopyrightSection";
import OurClients from "../_components/OurClients/OurClients";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <HowItWorks />
        <Module3dSection />
        <FeatureSection />
        <OurClients />
        <ProjectSection />
        <BlogSection />
        {/* <NewsLetterSection /> */}
      </main>
    </>
  );
}
