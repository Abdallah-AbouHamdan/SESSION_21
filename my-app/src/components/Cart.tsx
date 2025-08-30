import type { CartItem, Product } from "../types";
import CartItemComponent from "./CartItem";

interface CartProps {
  cartItems: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

const Cart = ({ cartItems, products, onUpdateQuantity, onRemove, onClear }: CartProps) => {
  const total = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Cart</h2>
        {cartItems.length > 0 && (
          <button 
            onClick={onClear}
            className="text-red-500 text-sm hover:text-red-700"
          >
            Clear Cart
          </button>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="max-h-[70vh] overflow-y-auto flex-1">
            {cartItems.map(item => (
              <CartItemComponent 
                key={item.productId}
                item={item}
                products={products}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>
          
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span>Items:</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600 transition-colors">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
