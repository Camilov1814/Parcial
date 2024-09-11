import { useSelector, useDispatch } from "react-redux"
import { CartItem } from "./CartItem";
import { toggleStatusTab } from "../stores/cart";


export const CartTab = () => {

  const carts = useSelector((state: any) => state.cart.items);
  const statusTab = useSelector((state: any) => state.cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  }
  return (
    <div className={`fixed top-0 right-0 bg-complement1 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] z-50 transition-transform duration-500 transform
    ${statusTab === false ? 'translate-x-full' : ''}
    `}>
      <h2 className="p-5 text-white text-2xl ">Shopping Cart</h2>
      <div className="p-5">
        {carts.map((item:any,key:any) => 
          <CartItem 
          key={key} 
          productId={item.productId} 
          quantity={item.quantity}
          />
        )}
      </div>
      <div className="grid grid-cols-2">
        <button className=" bg-primary bg-white" onClick={handleCloseTabCart}>CLOSE</button>
        <button className="bg-complement2 text-white">CHECKOUT</button>
      </div>


    </div>
  )
}
