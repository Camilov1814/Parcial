import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import { useState, useEffect } from 'react';
import { fetchPhotos } from '../services/api';  // Importa la función para obtener fotos desde la API

interface Photo {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

const Photos = () => {
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState<Photo[]>([]);  // Estado para almacenar las fotos obtenidas de la API
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);  // Estado para el loading
  const [error, setError] = useState<string>('');  // Estado para manejar errores

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const fetchedPhotos = await fetchPhotos();  // Llamamos a la API para obtener las fotos
        setPhotos(fetchedPhotos);  // Almacenamos las fotos en el estado
      } catch (error) {
        setError('Error loading photos');  // Si hay un error, lo guardamos en el estado
      } finally {
        setLoading(false);  // Terminamos el estado de carga
      }
    };

    loadPhotos();
  }, []);  // Solo ejecutamos este efecto cuando el componente se monta

  const handleAddCart = (photo: Photo) => {
    dispatch(addToCart({ productId: photo.id, quantity: 1 }));
  };

  const handleOptionChange = (photoId: number, option: string) => {
    setSelectedOption((prev) => ({
      ...prev,
      [photoId]: option,
    }));
  };

  if (loading) {
    return <div>Loading photos...</div>;  // Mensaje mientras se cargan las fotos
  }

  if (error) {
    return <div>{error}</div>;  // Mensaje si ocurre un error
  }

  return (
    <div className="bg-complement2 shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
      <div className="ml-4 mr-4">
        <h1 className="text-3xl font-bold mb-4 mt-4">Photo Sales</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{photo.title}</h2>
              <p className="text-lg font-semibold mb-4">${photo.price}</p>

              <div className="mb-4">
                <label className="mr-2">Choose format:</label>
                <select
                  value={selectedOption[photo.id] || ''}
                  onChange={(e) => handleOptionChange(photo.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select</option>
                  <option value="digital">Digital</option>
                  <option value="printed">Printed</option>
                </select>
              </div>

              <button
                className="bg-primary text-sm p-2 rounded-md hover:bg-secondary flex gap-2"
                onClick={() => handleAddCart(photo)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photos;
