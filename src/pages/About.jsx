import About_History from "../components/about/About_Histry";
import AboutContent from "../components/about/AboutContent";
import Banner from "../components/Banner";
import Service from "../components/about/Service";
import Testimonials from "../components/about/Testimonials";
import Contact_info from "../components/Contact_info";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
function About(){
    return(
        <>
        <div className="page-wrapper mb0">
        <Navbar logo="../images/surplus.png"/>
        <Banner title="About Us" />
        <AboutContent/>
        <About_History/>
        <Service/>
        <Testimonials/>
        <Contact_info/>
        <Footer/>
        </div>
        </>
    )
}

export default About;