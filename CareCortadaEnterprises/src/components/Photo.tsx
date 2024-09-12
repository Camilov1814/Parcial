import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import { useState } from 'react';
import { initialPhotos } from '../products/photos';

interface Photo {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
}

const Photos = () => {
    const carts = useSelector((state: any) => state.cart.items);
    console.log(carts);

    const dispatch = useDispatch();

    const handleAddCart = (photo: Photo) => {
        dispatch(addToCart({ productId: photo.id, quantity: 1 }));
    };

    return (
        <div className="bg-complement2  shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
            <div className='ml-4 mr-4'>
                <h1 className="text-3xl font-bold mb-4  ">Photo Sales</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialPhotos.map((photo) => (
                        <div key={photo.id} className="border rounded-lg p-4 shadow-lg">
                            <img src={photo.imageUrl} alt={photo.title} className="w-full h-48 object-cover mb-4" />
                            <h2 className="text-xl font-bold mb-2">{photo.title}</h2>
                            <p className="text-lg font-semibold mb-4">${photo.price}</p>
                            <button
                                className="bg-primary text-sm p-2 rounded-md hover:bg-secondary flex gap-2 mt-4"
                                onClick={() => handleAddCart(photo)}
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

export default Photos;
