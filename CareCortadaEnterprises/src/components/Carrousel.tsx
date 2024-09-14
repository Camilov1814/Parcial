import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { models } from '../products/models'; // Asegúrate de que la ruta de importación sea correcta
import { Link } from 'react-router-dom';

const FeaturedModelsCarousel: React.FC = () => {
  const featuredModels = models.slice(0, 5); // Toma solo los primeros 4 modelos

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-bgMain py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-title text-3xl text-primary mb-8 text-center">Featured Models</h2>
        <Slider {...settings}>
          {featuredModels.map((model) => (
            <div key={model.id} className="px-2">
              <Link to={`/models/${model.slug}`} className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={model.image[0]} alt={model.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="font-title text-xl text-primary">{model.name}</h3>
                    <p className="text-complement1 text-sm mt-2">{model.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedModelsCarousel;