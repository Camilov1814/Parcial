import NavbarComp from "../components/Navbar";
import { useState, useEffect } from "react";
import MakeupCard from "../components/MakeupCard";
import { CartTab } from "../components/CartTab";
import { useSelector } from "react-redux";
import { fetchMakeup } from "../services/api"; // Asumiendo que fetchMakeup está correctamente importado

export const Makeup = () => {
  const statusTabCart = useSelector((state: any) => state.cart.statusTab);
  const [makeup, setMakeup] = useState<any[]>([]); // Cambié el tipo para manejar el array de productos
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMakeup(); // Llamar la función para obtener los productos
        console.log(data); // Ver los datos en la consola para comprobar si llegan correctamente
        setMakeup(data); // Asignar los datos al estado de makeup
      } catch (error) {
        setError('Error fetching makeup data');
        console.error(error); // Mostrar el error en la consola
      } finally {
        setLoading(false); // Detener la carga una vez que los datos estén disponibles
      }
    };

    fetchData();
  }, []); // Solo se ejecuta al montar el componente

  // Filtrar y ordenar los productos
  const sortedAndFilteredMakeup = makeup
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return parseFloat(a.price) - parseFloat(b.price); // Asegurarse de que el precio sea un número
      } else {
        return a[sortBy].toString().localeCompare(b[sortBy].toString());
      }
    });

  if (loading) {
    return <div>Loading...</div>; // Mostrar "Loading..." mientras se cargan los datos
  }

  if (error) {
    return <div>{error}</div>; // Mostrar el error si no se pueden obtener los datos
  }

  return (
    <>
      <CartTab />
      <NavbarComp />
      <div className="mb-8 flex flex-col md:flex-row justify-center items-center pt-16">
        <div className="mb-4 md:mb-0">
          <label htmlFor="sort" className="mr-2 p-2">Sort by:</label>
          <select 
            id="sort"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
            className="p-2 rounded border border-complement1"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <label htmlFor="search" className="mr-2 p-2">Search:</label>
          <input 
            id="search"
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-complement1"
            placeholder="Search by name"
          />
        </div>
      </div>

      <div className={`max-w-screen-lg mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 transform transition-transform duration-500
        ${statusTabCart === false ? '' : '-translate-x-56'}`}>
        
        {sortedAndFilteredMakeup.map((product, key) => (
          <MakeupCard
            key={key}
            id={product.id}
            name={product.name}
            price={parseFloat(product.price)} // Convertir el precio a número
            image={product.imageUrl} // Usar imageUrl según la API
            slug={product.slug}
          />
        ))}
      </div>
    </>
  );
};
