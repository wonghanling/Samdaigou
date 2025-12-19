export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  stock: number;
  status: 'available' | 'unavailable';
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  orderNo: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  finalAmount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  paymentMethod?: 'wechat' | 'alipay';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  remark?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  phone?: string;
  createdAt: Date;
}
