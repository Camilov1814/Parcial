import NavbarComp from "../components/Navbar"
import { makeup } from "../products/makeup"
import  MakeupCard from "../components/MakeupCard"
import { CartTab } from "../components/CartTab"
import { useSelector } from "react-redux"

export const Makeup = () => {
  const statusTabCart = useSelector((state:any) => state.cart.statusTab)
  return (
    <>
    <CartTab />
    <NavbarComp />
    <div className={`pt-16 max-w-screen-lg mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 transform transition-transform duration-500
      ${statusTabCart === false ? '' : '-translate-x-56'}
      `}>
    {makeup.map((product,key) =>
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
