import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { makeup } from "../products/makeup"
import { useDispatch } from "react-redux"
import  { addToCart } from "../stores/cart"
import { useSelector } from "react-redux"

export const DetailMakeup = () => {
    const {slug} = useParams()
    const [detail, setDetail] = useState<any>({})
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const carts = useSelector((state: any) => state.cart.items);
    console.log(carts);
    useEffect(() => {
        const findDetail = makeup.filter((product) => product.slug === slug)
        if (findDetail.length > 0) {
            setDetail(findDetail[0])
        
    }else {
        window.location.href = '/makeup'
    }
    }, [slug])

    const handleMinusQ = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handlePlusQ = () => {
        setQuantity(quantity + 1)
    }

    const handleAddToCart = () => {
        dispatch(addToCart({productId: detail.id, quantity: quantity}))
    }

  return (
    <div>
        <h2 className="text-3xl text-center">PRODUCT DETAIL</h2>
        <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
                <img src={detail.image} alt="" />
            </div>
            <div className="felx flex-col gap-5">
                <h2 className="text-2xl">{detail.name}</h2>
                <p>{detail.price}</p>

                <div className="flex gap-5">
                    <div className=" flex gap-2 justify-center items-center">
                        <button className="bg-primary text-white p-2 rounded-md" onClick={handleMinusQ}>-</button>
                        <span className="bg-primary text-black p-2 rounded-md">{quantity}</span>
                        <button className="bg-primary text-white p-2 rounded-md" onClick={handlePlusQ}>+</button>
                    </div>
                    <button className="bg-primary text-white px-7 py-3 rounded-xl shadow-2xl" onClick={handleAddToCart}>Add To Cart</button>
                </div>
                <p>{detail.description}</p>

            </div>
        </div>
    </div>
  )
}
