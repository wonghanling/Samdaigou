'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });

  // 如果购物车为空，重定向到购物车页面
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container-custom">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">购物车是空的</h2>
              <Link
                href="/"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 uppercase transition-colors border-4 border-black"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 调用支付API
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          userInfo,
        }),
      });

      const result = await response.json();
      console.log('支付API返回:', result); // 调试日志

      if (result.success) {
        const paymentUrl = result.data?.paymentUrl;
        console.log('支付URL:', paymentUrl); // 调试日志

        if (!paymentUrl) {
          alert('支付URL生成失败，请检查Vercel环境变量配置');
          setLoading(false);
          return;
        }

        // 清空购物车
        clearCart();

        // 创建一个临时div来渲染支付表单
        const div = document.createElement('div');
        div.innerHTML = paymentUrl;
        document.body.appendChild(div);

        // 自动提交表单（支付宝SDK返回的HTML包含自动提交脚本）
        const script = div.querySelector('script');
        if (script) {
          eval(script.innerHTML);
        }
      } else {
        alert('创建订单失败：' + (result.error || '未知错误'));
        setLoading(false);
      }
    } catch (error) {
      console.error('支付失败:', error);
      alert('支付失败，请重试');
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-black mb-8 uppercase">确认订单</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：收货信息 */}
              <div className="lg:col-span-2 space-y-6">
                {/* 收货信息表单 */}
                <div className="bg-white border-4 border-black p-6">
                  <h2 className="text-2xl font-black mb-6 uppercase">收货信息</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        收货人姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                        placeholder="请输入收货人姓名"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        联系电话 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                        placeholder="请输入联系电话"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">
                        收货地址 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={userInfo.address}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        rows={3}
                        className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                        placeholder="请输入详细收货地址"
                      />
                    </div>
                  </div>
                </div>

                {/* 商品列表 */}
                <div className="bg-white border-4 border-black p-6">
                  <h2 className="text-2xl font-black mb-6 uppercase">商品清单</h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b-2 border-gray-200 last:border-b-0">
                        <div className="relative w-20 h-20 border-2 border-black flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600">€{item.price.toFixed(2)} × {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">€{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：订单摘要 */}
              <div className="lg:col-span-1">
                <div className="bg-white border-4 border-black p-6 sticky top-24">
                  <h2 className="text-2xl font-black mb-6 uppercase">订单摘要</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-700">商品数量：</span>
                      <span className="font-bold">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)} 件
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-700">商品总价：</span>
                      <span className="font-bold">€{totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between text-2xl font-black">
                        <span>应付总额：</span>
                        <span className="text-pink-500">€{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black text-lg py-4 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '处理中...' : '提交订单并支付'}
                  </button>

                  <Link
                    href="/cart"
                    className="block mt-4 text-center text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    返回购物车
                  </Link>

                  <div className="mt-6 p-4 bg-gray-100 border-2 border-gray-300">
                    <p className="text-xs text-gray-600">
                      <strong>支付说明：</strong><br />
                      • 点击"提交订单"后将跳转到支付宝支付页面<br />
                      • PC端显示二维码，请用支付宝扫码支付<br />
                      • 手机端自动跳转支付宝APP完成支付
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
