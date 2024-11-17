import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import { fetchMakeupBySlug } from '../services/api'; // Importar la función fetch

interface MakeupCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
}

const MakeupCard = ({ id, name, price, image, slug }: MakeupCardProps) => {
  const [productDetail, setProductDetail] = useState<any>(null); // Estado para almacenar los detalles
  const carts = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  // Comprobar si el producto ya está en el carrito
  const isInCart = carts.some((item: any) => item.productId === id);

  // Cargar los detalles del producto usando fetch
  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const data = await fetchMakeupBySlug(slug);
        setProductDetail(data); // Establecer los detalles del producto
      } catch (error) {
        console.error("Error al cargar el producto", error);
      }
    };
    
    loadProductDetail();
  }, [slug]);

  const handleAddCart = () => {
    if (!isInCart) {
      dispatch(addToCart({ productId: id, quantity: 1 }));
    }
  };

  return (
    <div className="bg-complement2 p-5 rounded-xl shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg">
      <Link to={`/makeup/${slug}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007] rounded mb-4"
        />
      </Link>
      <h4 className="text-xl font-title font-semibold mb-2">{name}</h4>
      <div className="flex justify-between items-center">
        <p>
          $<span className="text-2xl font-medium">{price.toFixed(2)}</span>
        </p>
        <button
          className={`bg-primary text-complement3 text-sm p-2 rounded-md hover:bg-secondary flex gap-2 ${isInCart ? 'bg-gray-500 cursor-not-allowed' : ''}`}
          onClick={handleAddCart}
          disabled={isInCart} // Deshabilitar el botón si el producto ya está en el carrito
        >
          <ShoppingCartIcon className="w-5 text-complement3" />
          {isInCart ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default MakeupCard;
