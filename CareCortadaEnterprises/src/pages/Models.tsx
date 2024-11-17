import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarComp from '../components/Navbar';
import { fetchModels } from '../services/api'; // Importa la función de la API centralizada

const ModelList: React.FC = () => {
  const [models, setModels] = useState<any[]>([]); 
  const [sortBy, setSortBy] = useState<'name' | 'experience'>('name'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const getModels = async () => {
      try {
        const data = await fetchModels();
        setModels(data); 
      } catch (err) {
        setError('Failed to fetch models'); 
      } finally {
        setLoading(false); 
      }
    };

    getModels();
  }, []); 

  
  const sortedAndFilteredModels = models
    .filter((model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.experience.toString().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'experience') {
        return b.experience - a.experience;
      } else {
        return a[sortBy].toString().localeCompare(b[sortBy].toString());
      }
    });

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <>
      <NavbarComp />
      <div className="bg-bgMain min-h-screen p-8">
        <h1 className="font-title text-4xl text-primary mb-8 text-center">Our Models</h1>

        <div className="mb-8 flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <label htmlFor="sort" className="mr-2 p-2">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'experience')}
              className="p-2 rounded border border-complement1"
            >
              <option value="name">Name</option>
              <option value="experience">Experience</option>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedAndFilteredModels.map((model) => (
            <Link to={`/models/${model.slug}`} key={model.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={model.images[0]} alt={model.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="font-title text-2xl text-primary mb-2">{model.name}</h2>
                  <p className="text-complement1">A super model from {model.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ModelList;
