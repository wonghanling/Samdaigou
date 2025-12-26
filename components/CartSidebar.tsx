'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* 背景遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* 头部 */}
          <div className="flex items-center justify-between p-6 border-b-4 border-black">
            <h2 className="text-3xl font-black uppercase">Your cart 购物车</h2>
            <button
              onClick={onClose}
              className="bg-black text-white font-bold px-4 py-2 hover:bg-gray-800 transition-colors uppercase text-sm"
            >
              × CLOSE 关闭
            </button>
          </div>

          {/* 购物车内容 */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <svg
                  className="mx-auto h-20 w-20 text-gray-400 mb-4"
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
                <p className="text-gray-600 text-lg">购物车是空的</p>
              </div>
            </div>
          ) : (
            <>
              {/* 商品列表 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-4 border-black p-4 bg-white"
                  >
                    <div className="flex gap-4">
                      {/* 商品图片 */}
                      <div className="relative w-20 h-20 flex-shrink-0 border-2 border-black">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* 商品信息 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold">
                          €{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* 数量调整和删除 */}
                    <div className="flex items-center justify-between mt-4">
                      {/* 数量选择器 */}
                      <div className="flex items-center border-4 border-black">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 text-xl font-bold hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 font-bold border-x-4 border-black min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 text-xl font-bold hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* 删除按钮 */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部总价和结算按钮 */}
              <div className="border-t-4 border-black p-6 space-y-4 bg-white">
                <div className="border-4 border-green-500 p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black uppercase">Total 总计</span>
                    <span className="text-3xl font-black">€{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg py-4 text-center uppercase transition-colors border-4 border-black"
                >
                  去购物车付款 GO TO CART
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
