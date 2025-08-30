import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import { productsData } from "./products";
import type { CartItem, Product } from "./types";

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.productId === product.id);
      if (existingItem) {
        return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity: newQuantity } : i));
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(i => i.productId !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <div className="w-full px-4 py-8">
      <header className="text-center mb-12 bg-blue-600 h-20 ">
        <h1 className="text-4xl font-bold text-gray-800 text-white mt-[40px]">Shopping Cart</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {productsData.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="h-full">
          <Cart 
            cartItems={cartItems}
            products={productsData}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
