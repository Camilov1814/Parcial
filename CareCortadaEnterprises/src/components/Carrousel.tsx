import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { fetchModels } from '../services/api'; // Asegúrate de que la ruta sea correcta

interface Model {
  id: number;
  name: string;
  country: string;
  slug: string;
  images: string[];
  description: string;
  height: string;
  hair_color: string;
  eye_color: string;
  experience: number;
}

const FeaturedModelsCarousel: React.FC = () => {
  const [featuredModels, setFeaturedModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadModels = async () => {
      try {
        const models = await fetchModels(); // Usando la función fetchModels
        setFeaturedModels(models.slice(0, 5)); // Toma solo los primeros 5 modelos
      } catch (error: any) {
        setError('Error loading featured models');
        console.error('Error fetching models:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, []);

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

  if (loading) {
    return <div>Loading featured models...</div>; // Mensaje mientras se cargan los modelos
  }

  if (error) {
    return <div>{error}</div>; // Mensaje si ocurre un error
  }

  return (
    <div className="bg-bgMain py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-title text-3xl text-primary mb-8 text-center">Featured Models</h2>
        <Slider {...settings}>
          {featuredModels.length === 0 ? (
            <div>No models available</div>  // Mensaje si no hay modelos disponibles
          ) : (
            featuredModels.map((model) => (
              <div key={model.id} className="px-2">
                <Link to={`/models/${model.slug}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={model.images[0]}  // Usando la primera imagen de 'images'
                      alt={model.name} 
                      className="w-full h-64 object-cover" 
                      loading="lazy"  // Cargar la imagen de forma perezosa
                    />
                    <div className="p-4">
                      <h3 className="font-title text-xl text-primary">{model.name}</h3>
                      <p className="text-complement1 text-sm mt-2">Supermodel from {model.country}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedModelsCarousel;
