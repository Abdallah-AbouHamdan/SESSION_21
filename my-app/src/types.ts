export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}
