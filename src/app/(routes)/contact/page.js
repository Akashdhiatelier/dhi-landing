import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import ContactForm from "./_components/ContactForm";

const BG_IMAGE = "/images/breadcrumb/contact-breadcrumb.jpg";
function page() {
  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Contact Us", link: "/contact", isActive: true },
        ]}
        headingText={"Contact Us"}
        bgImagePath={BG_IMAGE}
      />
      <section className="contact py-100">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ContactForm />
              <div className="connect-block"></div>
              <iframe
                src="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bc2b93591e5ede7:0x3d84464787957e8d?entry=s&amp;sa=X&amp;ved=1t:8290&amp;hl=en-in&amp;ictx=111"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="light-pattern-box left">
          <img src="/images/light-pattern-left.svg" alt="light" />
        </div>
      </section>
    </>
  );
}

export default page;
