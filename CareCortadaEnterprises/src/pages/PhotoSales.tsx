//PhotoSales.tsx
import React from 'react';
import Navbarcomp from '../components/Navbar';
import { CartTab } from '../components/CartTab';
import Photos from '../components/Photo';



const PhotoSales: React.FC = () => {
    return(
    <>
    <CartTab />
    <div className="bg-complement2 shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
    <Navbarcomp />
    <Photos />
    </div>
    </>
   )
};

export default PhotoSales;
