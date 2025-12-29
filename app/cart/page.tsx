'use client';

import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container-custom">
            <div className="text-center py-20">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">购物车是空的</h2>
              <p className="text-gray-600 mb-8">快去添加一些商品吧！</p>
              <Link
                href="/"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                开始购物
              </Link>
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
          <h1 className="text-3xl font-black mb-8 uppercase">购物车</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 购物车商品列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white border-4 border-black p-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 py-4 border-b-2 border-gray-200 last:border-b-0"
                  >
                    {/* 商品图片 */}
                    <Link href={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 border-2 border-black">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* 商品信息 */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-bold text-lg mb-2 hover:text-pink-500 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-2xl font-bold text-gray-900">
                        €{item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* 数量调整和删除 */}
                    <div className="flex flex-col items-end justify-between">
                      {/* 数量选择器 */}
                      <div className="flex items-center border-2 border-black">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-lg font-bold hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center font-bold border-x-2 border-black"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-lg font-bold hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* 小计价格 */}
                      <p className="text-xl font-bold text-green-500">
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>

                      {/* 删除按钮 */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-green-500 hover:text-green-700 font-medium mt-2"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}

                {/* 清空购物车按钮 */}
                <div className="mt-6 text-right">
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                  >
                    清空购物车
                  </button>
                </div>
              </div>
            </div>

            {/* 订单摘要 */}
            <div className="lg:col-span-1">
              <div className="bg-white border-4 border-black p-6 sticky top-24">
                <h2 className="text-2xl font-black mb-6 uppercase">订单摘要</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">商品数量：</span>
                    <span className="font-bold">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)} 件
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between text-2xl font-black">
                      <span>总计：</span>
                      <span className="text-green-500">€{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg py-4 px-6 uppercase transition-colors mb-4 text-center"
                >
                  去结算
                </Link>

                <Link
                  href="/"
                  className="block text-center text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  继续购物
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom text-center">
          <p>&copy; 2024 山姆代购. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">南京克劳笛奥科技有限公司技术开发</p>
        </div>
      </footer>
    </>
  );
}
