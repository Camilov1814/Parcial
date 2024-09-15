import React from 'react';
import { useParams } from 'react-router-dom';
import { models } from '../products/models';
import NavbarComp from '../components/Navbar';

const ModelDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const model = models.find(m => m.slug === slug);

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <>
    <NavbarComp />
    <div className="bg-bgMain min-h-screen p-8">
      <h1 className="font-title text-4xl text-primary mb-8 text-center">{model.name}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda: Información del modelo */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-title text-2xl text-primary mb-4">About {model.name}</h2>
            <p className="text-complement1 mb-4">{model.description}</p>
            {/* Añade más información del modelo aquí */}
            <ul className="text-complement1 ">
              <li><strong>Height:</strong> <span className='text-primary'>{model.heigh}</span></li>
              <li><strong>Hair Color:</strong> <span className='text-primary'>{model.hairColor}</span> </li>
              <li><strong>Eye Color:</strong> <span className='text-primary'>{model.eyeColor}</span> </li>
              <li><strong>Experience:</strong><span className='text-primary'>{model.experience}</span> </li>
            </ul>
            <button className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors">
              Book Now
            </button>
          </div>
        </div>

        {/* Columna derecha: Collage de fotos */}
        <div className="md:w-2/3">
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {model.image.map((image, index) => (
              <div key={index} className="break-inside-avoid">
                <img 
                  src={image} 
                  alt={`${model.name} - ${index + 1}`} 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModelDetails;