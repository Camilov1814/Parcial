import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

interface MakeupCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
}

const MakeupCard = (props: MakeupCardProps) => {
  const carts = useSelector((state: any) => state.cart.items);
  console.log(carts);
  const id = props.id;
  const name = props.name;
  const price = props.price;
  const image = props.image;
  const slug = props.slug;

  const dispatch = useDispatch();
  const handleAddCart = () => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  return (
    <div className="bg-complement2 p-5 rounded-xl shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg">
      <Link to={slug}>
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
          className="bg-primary text-complement3 text-sm p-2 rounded-md hover:bg-secondary flex gap-2"
          onClick={handleAddCart}
        >
          <ShoppingCartIcon className="w-5 text-complement3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MakeupCard;
