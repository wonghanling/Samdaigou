// 订单状态
export enum OrderStatus {
  PENDING = 'pending', // 待支付
  PAID = 'paid', // 已支付
  CANCELLED = 'cancelled', // 已取消
  REFUNDED = 'refunded', // 已退款
}

// 订单项
export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

// 订单信息
export interface Order {
  id?: string;
  orderNo: string;
  userId?: string;
  userName?: string;
  userPhone?: string;
  userAddress?: string;
  items: OrderItem[];
  itemsTotal: number; // 商品总价
  serviceFee: number; // 服务费 (9.9元)
  totalAmount: number; // 总金额
  status: OrderStatus;
  paymentMethod?: string;
  tradeNo?: string; // 支付宝交易号
  createdAt: Date;
  paidAt?: Date;
}
