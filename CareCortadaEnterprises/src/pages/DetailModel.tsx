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
        <p className="text-complement1 text-center mb-8">{model.description}</p>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
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
      </>
    );
  };
  
  export default ModelDetails;