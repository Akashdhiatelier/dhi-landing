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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236295.7474653036!2d70.6564846925272!3d22.273403808660447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1698913752105!5m2!1sen!2sin"
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
