import { useState, useEffect } from 'react';
import { fetchMemberships } from '../services/api';// Importa la función para obtener membresías desde la API

interface Membership {
  tier: string;
  price: string;
  benefits: string[];
}

const Membership = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);  // Estado para almacenar las membresías obtenidas de la API
  const [loading, setLoading] = useState<boolean>(true);  // Estado para el loading
  const [error, setError] = useState<string>('');  // Estado para manejar errores

  useEffect(() => {
    const loadMemberships = async () => {
      try {
        const fetchedMemberships = await fetchMemberships();  // Llamamos a la API para obtener las membresías
        setMemberships(fetchedMemberships);  // Almacenamos las membresías en el estado
      } catch (error) {
        setError('Error loading memberships');  // Si hay un error, lo guardamos en el estado
      } finally {
        setLoading(false);  // Terminamos el estado de carga
      }
    };

    loadMemberships();
  }, []);  // Solo ejecutamos este efecto cuando el componente se monta

  if (loading) {
    return <div>Loading memberships...</div>;  // Mensaje mientras se cargan las membresías
  }

  if (error) {
    return <div>{error}</div>;  // Mensaje si ocurre un error
  }

  return (
    <div className="bg-complement2 shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
      <div className="ml-4 mr-4">
        <h1 className="text-3xl font-bold mb-6 mt-4">Exclusive Membership Tiers</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberships.map((membership: Membership, index: number) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{membership.tier}</h2>
              <p className="text-lg font-semibold mb-4">{membership.price}</p>
              <ul className="list-disc ml-5">
                {membership.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
