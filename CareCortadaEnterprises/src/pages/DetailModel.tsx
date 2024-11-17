import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchModelBySlug } from '../services/api'; // Asegúrate de importar la función correctamente
import NavbarComp from '../components/Navbar';

interface Model {
  name: string;
  description: string;
  height: string;
  hairColor: string;
  eyeColor: string;
  experience: string;
  images: string[]; // Cambiado a 'images' para coincidir con el backend
}

const ModelDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch model data when component mounts
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const fetchedModel = await fetchModelBySlug(slug || '');
        setModel(fetchedModel); // Set the model data
      } catch (error) {
        setError('Error fetching model data');
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [slug]);

  // If loading or error occurs
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !model) {
    return <div>{error || 'Model not found'}</div>;
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
              <ul className="text-complement1">
                <li><strong>Height:</strong> <span className='text-primary'>{model.height}</span></li>
                <li><strong>Hair Color:</strong> <span className='text-primary'>{model.hairColor}</span></li>
                <li><strong>Eye Color:</strong> <span className='text-primary'>{model.eyeColor}</span></li>
                <li><strong>Experience:</strong> <span className='text-primary'>{model.experience} years</span></li>
              </ul>
              <button className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors">
                Book Now
              </button>
            </div>
          </div>

          {/* Columna derecha: Collage de fotos */}
          <div className="md:w-2/3">
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {/* Verificar si 'model.images' tiene elementos y luego mapearlas */}
              {model.images && model.images.length > 0 ? (
                model.images.map((image, index) => (
                  <div key={index} className="break-inside-avoid">
                    <img
                      src={image}
                      alt={`${model.name} - ${index + 1}`}
                      className="w-full rounded-lg shadow-md"
                      onError={(e) => {
                        // Mostrar imagen predeterminada si falla la carga
                        e.currentTarget.src = '/path/to/default-image.jpg'; // Reemplaza con la ruta de una imagen por defecto
                      }}
                    />
                  </div>
                ))
              ) : (
                <div>No images available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelDetails;
