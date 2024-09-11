import { UseSelector } from "react-redux";
import { useEffect, useState } from "react";
import { makeup } from "../products/makeup";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../stores/cart";

interface CartTabProps {
    productId: number;
    quantity: number;
  }
  

export const CartItem = (props:CartTabProps) => {
    const productId = props.productId;
    const quantity = props.quantity;
    const [detail, setDetail] = useState<any>({})	
    useEffect(() => {
        const findDetail = makeup.filter((product) => product.id === productId)[0]
        setDetail(findDetail)
    }
    , [productId])

    const dispatch = useDispatch()
    const handleMinusQ = () => {
        dispatch(changeQuantity({
            productId: productId
            , quantity: quantity - 1}))
        
    }
    const handlePlusQ = () => {
        dispatch(changeQuantity({productId: productId, quantity: quantity + 1}))
    }


  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700  gap-5 rounded-md">
        <img src={detail.image} alt={detail.name} className="w-12 h-20 object-cover object-top rounded-md" />
        <h3 className="text-lg font-title font-semibold">{detail.name}</h3>
        <p className="text-black font-sans"> ${quantity* detail.price}</p>
        <div className="w-20 flex justify-between ">
            <button className="bg-primary text-white p-2 rounded-md" onClick={handleMinusQ}>-</button>
            <span className="bg-primary text-black p-2 rounded-md">{quantity}</span>
            <button className="bg-primary text-white p-2 rounded-md" onClick={handlePlusQ}>+</button>
        </div>
        
    </div>
  )
}
