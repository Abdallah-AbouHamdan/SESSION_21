import type { CartItem, Product } from "../types";

interface CartItemProps {
  item: CartItem;
  products: Product[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItemComponent = ({ item, products, onUpdateQuantity, onRemove }: CartItemProps) => {
  const product = products.find(p => p.id === item.productId);
  if (!product) return null;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="ml-4">
          <h4 className="font-medium">{product.name}</h4>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          className="bg-gray-200 px-2 py-1 rounded-l"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="px-3 py-1 bg-white">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          className="bg-gray-200 px-2 py-1 rounded-r"
        >
          +
        </button>
        <button 
          onClick={() => onRemove(item.productId)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
