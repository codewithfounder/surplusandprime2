import Footer from "../components/Footer"
import About_Clients from "../components/home/About_Clients"
import AboutSection from "../components/home/AboutSection"
import Brand from "../components/home/Brand"
import CategorySlider from "../components/home/CategorySlider"
// import Contact_info from "../components/Contact_info"
import Contact_info from "../components/Contact_info"
import MainSection from "../components/home/MainSection"
import Products from "../components/home/Products"
import Service from "../components/home/Service"
import Team from "../components/home/Team"
import Navbar from "../components/Navbar"

function Home() {

    return (
        <>
            <div className="page-wrapper" style={{marginBottom: 0}}>
                <Navbar logo="images/surplus.png"/>
                <MainSection/>
                <CategorySlider/>
                <AboutSection/>
                <Service/>
                <Products/>
                <About_Clients/>
                {/* <Team/> */}
                <Brand/>
                <Contact_info/>
                <Footer/>
            </div>
        </>
    )
}

export default Home
