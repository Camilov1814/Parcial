import React from "react";
import NavbarComp from "../components/Navbar";
import Membership from "../components/Membership";
import {CartTab} from "../components/CartTab";

const MembershipPage: React.FC = () => {
    return (
        <>
        <div className="bg-complement2 shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
        <CartTab />
        <NavbarComp />
        <Membership />
        </div>
        </>
    );
}

export default MembershipPage;