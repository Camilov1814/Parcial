//PhotoSales.tsx
import React, { useState } from 'react';
import Navbarcomp from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../stores/cart';
import { CartTab } from '../components/CartTab';
import Photos from '../components/Photo';
import { initialPhotos } from '../products/photos';

interface Photo {
    id: number;
    title: string;
    imageUrl: string;
    priceDigital: number;
    pricePrint: number;
}



const PhotoSales: React.FC = () => {
    const statusTabCart = useSelector((state: any) => state.cart.statusTab);
   return(
    <>
    <CartTab />
    <Navbarcomp />
    <Photos />
    </>
   )
};

export default PhotoSales;
