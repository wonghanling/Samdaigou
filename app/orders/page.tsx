'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: string;
  order_no: string;
  user_name: string;
  user_phone: string;
  user_address: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  payment_method: string;
  trade_no?: string;
  created_at: string;
  paid_at?: string;
}

export default function OrdersPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [user, userLoading, router]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('获取订单失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待支付';
      case 'paid':
        return '已支付';
      case 'cancelled':
        return '已取消';
      case 'refunded':
        return '已退款';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-500';
      case 'paid':
        return 'text-green-600 bg-green-50 border-green-500';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50 border-gray-500';
      case 'refunded':
        return 'text-red-600 bg-red-50 border-red-500';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-500';
    }
  };

  if (userLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container-custom">
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">加载中...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-black mb-8 uppercase">我的订单</h1>

          {orders.length === 0 ? (
            <div className="bg-white border-4 border-black p-12 text-center">
              <p className="text-lg text-gray-600 mb-6">您还没有订单</p>
              <Link
                href="/"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 uppercase transition-colors border-4 border-black"
              >
                去逛逛
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border-4 border-black p-6">
                  {/* 订单头部 */}
                  <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        订单号: <span className="font-mono font-bold">{order.order_no}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        下单时间: {new Date(order.created_at).toLocaleString('zh-CN')}
                      </p>
                      {order.paid_at && (
                        <p className="text-sm text-gray-600">
                          支付时间: {new Date(order.paid_at).toLocaleString('zh-CN')}
                        </p>
                      )}
                    </div>
                    <div className={`px-4 py-2 border-2 font-bold ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </div>
                  </div>

                  {/* 商品列表 */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative w-16 h-16 border-2 border-black flex-shrink-0">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm mb-1">{item.productName}</h3>
                          <p className="text-sm text-gray-600">
                            €{item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">€{item.subtotal.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 收货信息 */}
                  <div className="bg-gray-50 border-2 border-gray-300 p-4 mb-4">
                    <p className="text-sm font-bold mb-2">收货信息：</p>
                    <p className="text-sm text-gray-700">{order.user_name} | {order.user_phone}</p>
                    <p className="text-sm text-gray-700">{order.user_address}</p>
                  </div>

                  {/* 订单金额 */}
                  <div className="flex justify-end items-center gap-4">
                    <span className="text-gray-700">订单金额：</span>
                    <span className="text-2xl font-black text-pink-500">
                      €{parseFloat(order.total_amount.toString()).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
