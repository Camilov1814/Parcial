import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart";
import { useSelector } from "react-redux";
// Importa la función desde api.ts
import { fetchMakeupBySlug } from "../services/api";

export const DetailMakeup = () => {
  const { slug } = useParams();
  const [detail, setDetail] = useState<any>({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const carts = useSelector((state: any) => state.cart.items);
  console.log(carts);

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const data = await fetchMakeupBySlug(slug || "");
        setDetail(data);
      } catch (error) {
        window.location.href = '/makeup'; // Redirigir en caso de error
      }
    };

    if (slug) {
      loadProductDetail();
    }
  }, [slug]);

  const handleMinusQ = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlusQ = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: detail.id, quantity: quantity }));
  };

  return (
    <div>
      <h2 className="text-3xl text-center">PRODUCT DETAIL</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <img src={detail.imageUrl} alt={detail.name} />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl">{detail.name}</h2>
          <p>${parseFloat(detail.price).toFixed(2)}</p>

          <div className="flex gap-5">
            <div className="flex gap-2 justify-center items-center">
              <button className="bg-primary text-white p-2 rounded-md" onClick={handleMinusQ}>
                -
              </button>
              <span className="bg-primary text-black p-2 rounded-md">{quantity}</span>
              <button className="bg-primary text-white p-2 rounded-md" onClick={handlePlusQ}>
                +
              </button>
            </div>
            <button className="bg-primary text-white px-7 py-3 rounded-xl shadow-2xl" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
          <p>{detail.description}</p>
        </div>
      </div>
    </div>
  );
};
