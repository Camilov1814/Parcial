import NavbarComp from "../components/Navbar"
import { makeup } from "../products/makeup"
import  MakeupCard from "../components/MakeupCard"
import { CartTab } from "../components/CartTab"
import { useSelector } from "react-redux"
import { useState } from "react"

export const Makeup = () => {
  const statusTabCart = useSelector((state:any) => state.cart.statusTab)
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const sortedAndFilteredMakeup = makeup
  .filter((makeup) =>
    makeup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    makeup.price.toString().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price; // Ordena el precio de menor a mayor
    } else {
      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    }
  });
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
    <div className={` max-w-screen-lg mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 transform transition-transform duration-500
      ${statusTabCart === false ? '' : '-translate-x-56'}
      `}>
    {sortedAndFilteredMakeup.map((product,key) =>
      <MakeupCard
        key={key}
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
        slug={product.slug}
        />
    
    )}
    
    </div>
    </>
    
  )
}
