import NavbarComp from "../components/Navbar"
import { makeup } from "../products/makeup"
import  MakeupCard from "../components/MakeupCard"

export const Makeup = () => {
  return (
    <>
    <NavbarComp />
    <div className="pt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
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
