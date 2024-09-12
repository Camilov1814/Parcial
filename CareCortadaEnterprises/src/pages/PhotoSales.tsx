//PhotoSales.tsx
import React, { useState } from 'react';
import Navbarcomp from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../stores/cart';

interface Photo {
    id: number;
    title: string;
    imageUrl: string;
    priceDigital: number;
    pricePrint: number;
}

const initialPhotos: Photo[] = [
    {
        id: 1,
        title: 'Fashion Show in Paris',
        imageUrl: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/10/05/149793.jpg',
        priceDigital: 10.00,
        pricePrint: 25.00,
    },
    {
        id: 2,
        title: 'Runway in Milan',
        imageUrl: 'https://www.trend-online.com/wp-content/uploads/2024/03/settimana-moda-date-eventi.jpg',
        priceDigital: 12.00,
        pricePrint: 30.00,
    },
    {
        id: 3,
        title: 'Street Style in New York',
        imageUrl: 'https://media.architecturaldigest.com/photos/56009743cbec99cc0f9f5d1c/master/pass/dam-images-set-design-nyfw-2015-new-york-fashion-week-sets-01.jpg',
        priceDigital: 8.00,
        pricePrint: 20.00,
    },
    {
        id: 4,
        title: 'Fashion Week in London',
        imageUrl: 'https://assets.vogue.com/photos/5d812ee9be32fb0009db9a18/master/w_2560%2Cc_limit/00-story-ISI_1723%2520(1).jpg',
        priceDigital: 15.00,
        pricePrint: 35.00,
    },
    {
        id: 5,
        title: 'Backstage in Tokyo',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKEHCwrGynY5MhRbkKvP1T0T0tOpJ3Ht_cIw&s',
        priceDigital: 10.00,
        pricePrint: 25.00,
    },
    {
        id: 6,
        title: 'Model Casting in Los Angeles',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe7HTqfUIlmsNAZG50wV6yZge_RkVWbrMs5w&s',
        priceDigital: 8.00,
        pricePrint: 20.00,
    },
    {
        id: 7,
        title: 'Fashion Week in Berlin',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJleMTCgJNr59HAwKrx6xYw-e8pGlgMcxCA&s',
        priceDigital: 12.00,
        pricePrint: 30.00,
    },
    {
        id: 8,
        title: 'Street Style in Barcelona',
        imageUrl: 'https://static.euronews.com/articles/stories/08/45/64/66/1200x675_cmsv2_fbd2373d-9ca9-5a46-8a36-1c519d6cd47a-8456466.jpg',
        priceDigital: 10.00,
        pricePrint: 25.00,
    },
    {
        id: 9,
        title: 'Fashion Show in Dubai',
        imageUrl: 'https://cdnewmoda.expatwoman.com/s3fs-public/maxresdefault%20(2)_0.jpg',
        priceDigital: 15.00,
        pricePrint: 35.00,
    },
   

];

const PhotoSales: React.FC = () => {
    const [photos] = useState<Photo[]>(initialPhotos);
    const [selectedOption, setSelectedOption] = useState<'digital' | 'print'>('digital');
   

   

    return (
        <div className="bg-complement2 rounded-xl shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
            <Navbarcomp />
            <div className='ml-4 mr-4'>
                <h1 className="text-3xl font-bold mb-4 mt-4">Photo Sales</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo) => (
                        <div key={photo.id} className="border rounded-lg p-4 shadow-lg">
                            <img src={photo.imageUrl} alt={photo.title} className="w-full h-48 object-cover mb-4" />
                            <h2 className="text-xl font-bold mb-2">{photo.title}</h2>
                            <div className="flex justify-between items-center mb-4">
                                <label>
                                    <input
                                        type="radio"
                                        value="digital"
                                        checked={selectedOption === 'digital'}
                                        onChange={() => setSelectedOption('digital')}
                                        className="mr-2"
                                    />
                                    Digital (${photo.priceDigital})
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="print"
                                        checked={selectedOption === 'print'}
                                        onChange={() => setSelectedOption('print')}
                                        className="mr-2"
                                    />
                                    Print (${photo.pricePrint})
                                </label>
                            </div>
                            <button
                                className="bg-primary text-sm p-2 rounded-md hover:bg-secondary flex gap-2 mt-4"
                                onClick={useState}
                            >
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>

             
            </div>
        </div>
    );
};

export default PhotoSales;
