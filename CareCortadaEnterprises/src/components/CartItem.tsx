import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../stores/cart";
import { fetchMakeup, fetchPhotos } from "../services/api";  // Funciones para obtener productos desde la API

interface CartTabProps {
    productId: number;
    quantity: number;
}

export const CartItem = (props: CartTabProps) => {
    const productId = props.productId;
    const quantity = props.quantity;
    const [detail, setDetail] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);  // Estado para controlar la carga
    const [error, setError] = useState<string>('');  // Estado para manejar errores

    useEffect(() => {
        const loadProductDetails = async () => {
            try {
                // Obtenemos los productos de la API
                const makeupProducts = await fetchMakeup();
                const photoProducts = await fetchPhotos();

                // Combinamos las listas de productos
                const products = [...makeupProducts, ...photoProducts];
                const findDetail = products.find((product) => product.id === productId);
                setDetail(findDetail);  // Establecemos el detalle del producto
            } catch (error) {
                setError('Error loading product details');  // Si ocurre un error, lo manejamos aquí
            } finally {
                setLoading(false);  // Terminamos el estado de carga
            }
        };

        loadProductDetails();
    }, [productId]);

    const dispatch = useDispatch();

    const handleMinusQ = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    };

    const handlePlusQ = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    };

    if (loading) {
        return <div>Loading product details...</div>;  // Mensaje mientras se cargan los detalles
    }

    if (error) {
        return <div>{error}</div>;  // Mensaje si ocurre un error
    }

    return (
        <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
            <img src={detail?.imageUrl || detail?.image} alt={detail?.name || detail?.title} className="w-12 h-20 object-cover object-top rounded-md" />
            <h3 className="text-lg font-title font-semibold">{detail?.name || detail?.title}</h3>
            <p className="text-black font-sans"> ${(quantity * (detail?.price || 0)).toFixed(2)}</p>
            <div className="w-20 flex justify-between">
                <button className="bg-primary text-white p-2 rounded-md" onClick={handleMinusQ}>-</button>
                <span className="bg-primary text-black p-2 rounded-md">{quantity}</span>
                <button className="bg-primary text-white p-2 rounded-md" onClick={handlePlusQ}>+</button>
            </div>
        </div>
    );
};
