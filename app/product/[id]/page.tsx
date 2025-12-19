'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

// 临时商品数据（后续从Firebase获取）
const products = [
  { id: '1', name: '山姆商品1', price: 35.00, imageUrl: '/16.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '2', name: '山姆商品2', price: 58.00, imageUrl: '/17.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '3', name: '山姆商品3', price: 128.00, imageUrl: '/18.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '4', name: '山姆商品4', price: 158.00, imageUrl: '/19.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '5', name: '山姆商品5', price: 42.00, imageUrl: '/20.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '6', name: '山姆商品6', price: 68.00, imageUrl: '/21.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '7', name: '山姆商品7', price: 188.00, imageUrl: '/22.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '8', name: '山姆商品8', price: 98.00, imageUrl: '/23.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '9', name: '山姆商品9', price: 76.00, imageUrl: '/24.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '10', name: '山姆商品10', price: 88.00, imageUrl: '/25.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '11', name: '山姆商品11', price: 108.00, imageUrl: '/26.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '12', name: '山姆商品12', price: 65.00, imageUrl: '/28.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
  { id: '13', name: '山姆商品13', price: 92.00, imageUrl: '/29.webp', description: '优质山姆会员店商品，新鲜直达，品质保证。' },
];

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [additionalInfoOpen, setAdditionalInfoOpen] = useState(false);
  const [legalDisclaimerOpen, setLegalDisclaimerOpen] = useState(false);

  if (!product) {
    return <div>商品不存在</div>;
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          {/* 面包屑导航 */}
          <nav className="text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-gray-900">首页</Link>
            <span className="mx-2">•</span>
            <Link href="/category" className="hover:text-gray-900">商品分类</Link>
            <span className="mx-2">•</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* 商品详情主体 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* 左侧：商品图片 */}
            <div className="relative">
              <div className="border-4 border-black bg-white p-8">
                <div className="relative aspect-square">
                  {/* NEW 标签 */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full uppercase z-10">
                    NEW
                  </div>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    quality={95}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 右侧：商品信息 */}
            <div>
              {/* 品牌Logo占位 */}
              <div className="mb-6">
                <div className="w-16 h-16 border-2 border-gray-300 flex items-center justify-center text-xs text-gray-400">
                  LOGO
                </div>
              </div>

              {/* 商品标题 */}
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                {product.name}
              </h1>

              {/* 价格 */}
              <div className="text-4xl font-bold text-gray-900 mb-6">
                €{product.price.toFixed(2)}
              </div>

              {/* 简短描述 */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* SKU */}
              <p className="text-sm text-gray-400 mb-6">
                SKU: PROD{product.id.padStart(6, '0')}
              </p>

              {/* 数量选择器和加购按钮 */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* 数量选择器 */}
                <div className="flex items-center border-4 border-black">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-6 py-4 text-2xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 text-center text-xl font-bold border-x-4 border-black"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-6 py-4 text-2xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* 加入购物车按钮 */}
                <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-black text-lg py-4 px-8 uppercase transition-colors">
                  加入购物车
                </button>
              </div>

              {/* 支付方式图标 */}
              <div className="flex justify-end gap-2 mb-6">
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">iD</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">BC</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">AE</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">MC</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">V</div>
                <div className="w-12 h-8 border border-gray-300 flex items-center justify-center text-xs">PP</div>
              </div>

              {/* 分享和帮助 */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm">分享:</span>
                  <button className="hover:opacity-70">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="hover:opacity-70">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold hover:text-pink-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  需要帮助?
                </button>
              </div>
            </div>
          </div>

          {/* 可折叠的详细信息部分 */}
          <div className="max-w-5xl mx-auto space-y-4">
            {/* Description */}
            <div className="border-t-2 border-black">
              <button
                onClick={() => setDescriptionOpen(!descriptionOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">商品描述 Description</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${descriptionOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {descriptionOpen && (
                <div className="pb-6 text-gray-700 leading-relaxed">
                  <p>
                    {product.description}这是一款来自山姆会员店的优质商品，经过精心挑选和严格的品质把控。
                    我们保证每一件商品都是正品，并提供快速配送服务，让您足不出户就能享受到山姆会员店的优质商品。
                  </p>
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div className="border-t-2 border-black">
              <button
                onClick={() => setIngredientsOpen(!ingredientsOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">原料 ingredients</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${ingredientsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {ingredientsOpen && (
                <div className="pb-6 text-gray-700">
                  <p>详细成分信息请查看商品包装。</p>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="border-t-2 border-black">
              <button
                onClick={() => setAdditionalInfoOpen(!additionalInfoOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">附加信息 Additional Information</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${additionalInfoOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {additionalInfoOpen && (
                <div className="pb-6 text-gray-700">
                  <p>配送信息：我们提供快速配送服务，一般2-3个工作日送达。</p>
                </div>
              )}
            </div>

            {/* Legal Disclaimer */}
            <div className="border-t-2 border-b-2 border-black">
              <button
                onClick={() => setLegalDisclaimerOpen(!legalDisclaimerOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold">法律声明 Legal Disclaimer</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${legalDisclaimerOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {legalDisclaimerOpen && (
                <div className="pb-6 text-gray-700">
                  <p>本商品信息仅供参考，实际商品以收到的实物为准。</p>
                </div>
              )}
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
