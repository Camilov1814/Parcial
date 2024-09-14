import NavbarComp from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import {CartTab} from "../components/CartTab";

const ContactUsPage: React.FC = () => {
    return (
        <>
        <div className="bg-complement2 shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
        <CartTab />
        <NavbarComp/>
        <ContactUs/>
        </div>
        </>
    );
}

export default ContactUsPage;