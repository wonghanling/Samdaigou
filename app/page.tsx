'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

// 示例商品数据（后续会从Firebase获取）
const newArrivals = [
  {
    id: '1',
    name: '山姆商品1 山姆海盐苏打饼干1.5kg',
    price: 73.00,
    imageUrl: '/16.webp',
    isNew: true,
  },
  {
    id: '2',
    name: '山姆商品2 山姆牛肉馅酥脆饼干1kg',
    price: 95.00,
    imageUrl: '/17.webp',
    isNew: true,
  },
  {
    id: '3',
    name: '山姆商品3 黑松露火腿苏打饼干1.16kg',
    price: 71.00,
    imageUrl: '/18.webp',
    isNew: true,
  },
  {
    id: '4',
    name: '山姆商品4 卡乐比Jagabee淡盐味薯条600g',
    price: 99.00,
    imageUrl: '/19.webp',
    isNew: true,
  },
  {
    id: '5',
    name: '山姆商品5',
    price: 74.80,
    imageUrl: '/20.webp',
    isNew: true,
  },
  {
    id: '6',
    name: '山姆商品6',
    price: 48.90,
    imageUrl: '/21.webp',
    isNew: true,
  },
  {
    id: '7',
    name: '山姆商品7',
    price: 55.90,
    imageUrl: '/22.webp',
    isNew: true,
  },
  {
    id: '8',
    name: '山姆商品8',
    price: 37.90,
    imageUrl: '/23.webp',
    isNew: true,
  },
  {
    id: '9',
    name: '山姆商品9',
    price: 60.90,
    imageUrl: '/24.webp',
    isNew: true,
  },
  {
    id: '10',
    name: '山姆商品10',
    price: 106.90,
    imageUrl: '/25.webp',
    isNew: true,
  },
  {
    id: '11',
    name: '山姆商品11',
    price: 99.80,
    imageUrl: '/26.webp',
    isNew: true,
  },
  {
    id: '12',
    name: '山姆商品12',
    price: 65.90,
    imageUrl: '/28.webp',
    isNew: true,
  },
  {
    id: '13',
    name: '山姆商品13',
    price: 59.90,
    imageUrl: '/29.webp',
    isNew: true,
  },
  {
    id: '14',
    name: '山姆商品14',
    price: 75.90,
    imageUrl: '/178.webp',
    isNew: true,
  },
  {
    id: '15',
    name: '山姆商品15',
    price: 92.90,
    imageUrl: '/179.webp',
    isNew: true,
  },
  {
    id: '16',
    name: '山姆商品16',
    price: 95.90,
    imageUrl: '/180.webp',
    isNew: true,
  },
];

const categories = [
  { id: 'cookies', name: '爆款饼干 / 脆零食', color: 'bg-gradient-to-br from-red-400 to-red-500', shape: 'zigzag' },
  { id: 'dessert', name: '黄油甜点 / 西式点心', color: 'bg-gradient-to-br from-pink-400 to-pink-500', shape: 'wave' },
  { id: 'chocolate', name: '巧克力.糖果', color: 'bg-gradient-to-br from-blue-400 to-blue-500', shape: 'wave-bottom' },
  { id: 'nuts', name: '坚果 · 健康零食', color: 'bg-gradient-to-br from-green-400 to-green-500', shape: 'diagonal' },
  { id: 'drinks', name: '饮品', color: 'bg-gradient-to-br from-yellow-400 to-yellow-500', shape: 'zigzag-top' },
  { id: 'instant', name: '即刻速食', color: 'bg-gradient-to-br from-orange-400 to-orange-500', shape: 'wave' },
];

// 客户评价数据
const reviews = [
  {
    id: 1,
    name: '张明',
    rating: 5,
    comment: '商品质量很好，价格实惠，配送速度快！👍'
  },
  {
    id: 2,
    name: '李晓红',
    rating: 5,
    comment: '山姆的商品一直很信赖，代购服务很专业'
  },
  {
    id: 3,
    name: '王建国',
    rating: 5,
    comment: '包装完好，新鲜度很高，会继续购买'
  },
  {
    id: 4,
    name: '刘芳',
    rating: 5,
    comment: '非常满意的一次购物体验，强烈推荐！'
  },
  {
    id: 5,
    name: '陈伟',
    rating: 5,
    comment: '服务态度好，送货准时，商品正品保证'
  },
  {
    id: 6,
    name: '赵丽',
    rating: 5,
    comment: '性价比很高，比自己去店里买方便多了'
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const { addToCart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [animatingProductId, setAnimatingProductId] = useState<string | null>(null);

  // 添加到购物车函数
  const handleAddToCart = (e: React.MouseEvent, product: typeof newArrivals[0]) => {
    e.preventDefault(); // 阻止Link的默认导航
    e.stopPropagation();

    // 检查是否登录
    if (!user) {
      alert('请先登录后再添加商品到购物车');
      router.push('/login');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    // 触发动画
    setAnimatingProductId(product.id);
    setTimeout(() => setAnimatingProductId(null), 600);
  };

  // 添加9.9代下单服务
  const handleAddVipService = () => {
    addToCart({
      id: 'vip-service',
      name: '9.9会员代下单服务',
      price: 9.9,
      imageUrl: '/icon_bright_256.webp',
    });
    // 跳转到购物车
    router.push('/cart');
  };

  // 每页显示的产品数量
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 4 : 4;
  const totalSlides = Math.ceil(newArrivals.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // 评价轮播
  const [reviewsPerPage, setReviewsPerPage] = useState(1);
  const totalReviewSlides = Math.ceil(reviews.length / reviewsPerPage);

  // 处理响应式布局
  useEffect(() => {
    const handleResize = () => {
      setReviewsPerPage(window.innerWidth >= 1024 ? 3 : 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextReviewSlide = () => {
    setCurrentReviewSlide((prev) => (prev + 1) % totalReviewSlides);
  };

  const prevReviewSlide = () => {
    setCurrentReviewSlide((prev) => (prev - 1 + totalReviewSlides) % totalReviewSlides);
  };

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gray-100 text-white min-h-[600px] md:min-h-[700px] flex items-end md:items-center overflow-hidden">
          {/* 背景图片 - 手机端 */}
          <div className="absolute inset-0 z-0 md:hidden">
            <Image
              src="/5.webp"
              alt="Sam's Club"
              fill
              quality={95}
              priority
              className="object-cover"
            />
            {/* 轻微的底部遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          </div>

          {/* 背景图片 - 桌面端 */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <Image
              src="/1.webp"
              alt="Sam's Club"
              fill
              quality={95}
              priority
              className="object-cover"
            />
            {/* 轻微的底部遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          </div>

          <div className="w-full relative z-10 pb-8 md:pb-0 md:flex md:justify-end md:pr-32 md:-mt-20">
            {/* 文字在手机端左下角，电脑端右侧中间偏上 */}
            <div className="max-w-lg px-4 pl-12 md:px-0 md:pl-0 md:mr-20 md:max-w-2xl md:backdrop-blur-md md:bg-black/30 md:pl-28 md:pr-20 md:py-16 md:rounded-3xl md:flex md:items-center md:justify-start" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)' }}>
              <div className="text-left">
              <p className="text-lg md:text-xl italic mb-3 font-light">Special discount</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                山姆会员店
                <br />
                <span className="text-yellow-300">代购服务</span>
              </h1>
              <p className="text-base md:text-lg mb-6">
                新鲜商品每日直送，正品保证，便捷配送
              </p>
              <button className="bg-white text-pink-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all shadow-lg">
                立即购物
              </button>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-pink-500 text-3xl italic font-light mb-2">New Arrivals</p>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 uppercase">JUST IN</h2>
              <div className="mt-4">
                <span className="inline-block bg-yellow-400 text-black font-bold px-10 py-4 rounded-full text-lg shadow-lg">
                  模式① 代购
                </span>
              </div>
            </div>

            <div className="relative">
              {/* 轮播容器 */}
              <div className="overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  <div className="flex">
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                          {newArrivals
                            .slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage)
                            .map((product) => (
                              <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="bg-white border-t border-r border-l-4 border-b-4 border-black rounded-none p-4 md:p-8 hover:shadow-2xl transition-all group relative"
                              >
                                {/* NEW 标签 */}
                                {product.isNew && (
                                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                                    NEW
                                  </div>
                                )}

                                {/* 产品图 */}
                                <div className="relative w-full aspect-square bg-gray-50 mb-4 md:mb-6 overflow-hidden">
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    quality={95}
                                    className="object-cover group-hover:scale-105 transition-transform"
                                  />
                                </div>

                                {/* 产品信息 */}
                                <h3 className="font-bold text-xs md:text-base mb-3 md:mb-4 text-gray-900 min-h-[36px] md:min-h-[44px] leading-tight">
                                  {product.name.split(' ').length > 1 ? (
                                    <>
                                      {product.name.split(' ')[0]}
                                      <br />
                                      {product.name.split(' ').slice(1).join(' ')}
                                    </>
                                  ) : (
                                    product.name
                                  )}
                                </h3>

                                <div className="flex items-center justify-between">
                                  <span className="text-lg md:text-2xl font-bold text-gray-900">
                                    € {product.price.toFixed(2)}
                                  </span>

                                  {/* 加入购物车按钮 */}
                                  <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className={`w-10 h-10 md:w-14 md:h-14 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
                                      animatingProductId === product.id ? 'animate-bounce-scale' : ''
                                    }`}
                                  >
                                    <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                    </svg>
                                  </button>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 轮播导航 */}
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={prevSlide}
                  className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentSlide === index ? 'bg-pink-500' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* ALL PRODUCTS 按钮 */}
              <div className="text-center mt-10">
                <Link
                  href="/category"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full transition-all shadow-lg text-lg"
                >
                  <div>健身房</div>
                  <div className="text-sm">Gym</div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-pink-500 text-3xl italic font-light mb-2">Choose Your Mood</p>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 uppercase">SHOP BY CATEGORY</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 手机端：单列。电脑端：左上大块，占2行 - 锯齿形 */}
              <Link
                href={`/category/${categories[0].id}`}
                className={`relative ${categories[0].color} overflow-hidden group hover:scale-[1.02] transition-all h-[300px] md:h-[600px] md:row-span-2`}
                style={{
                  clipPath: 'polygon(0 0, 4% 2%, 8% 0, 12% 2%, 16% 0, 20% 2%, 24% 0, 28% 2%, 32% 0, 36% 2%, 40% 0, 44% 2%, 48% 0, 52% 2%, 56% 0, 60% 2%, 64% 0, 68% 2%, 72% 0, 76% 2%, 80% 0, 84% 2%, 88% 0, 92% 2%, 96% 0, 100% 2%, 100% 100%, 96% 98%, 92% 100%, 88% 98%, 84% 100%, 80% 98%, 76% 100%, 72% 98%, 68% 100%, 64% 98%, 60% 100%, 56% 98%, 52% 100%, 48% 98%, 44% 100%, 40% 98%, 36% 100%, 32% 98%, 28% 100%, 24% 98%, 20% 100%, 16% 98%, 12% 100%, 8% 98%, 4% 100%, 0 98%)'
                }}
              >
                <Image
                  src="/10.webp"
                  alt={categories[0].name}
                  fill
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-8 left-8 md:top-8 md:left-8 bg-white px-3 py-1.5 md:px-6 md:py-3 border-[3px] md:border-[6px] border-black shadow-lg z-10">
                  <span className="text-gray-900 font-bold text-xs md:text-lg lg:text-xl">{categories[0].name}</span>
                </div>
              </Link>

              {/* 右上 - 波浪形 */}
              <Link
                href={`/category/${categories[1].id}`}
                className={`relative ${categories[1].color} overflow-hidden group hover:scale-[1.02] transition-all h-[300px] md:h-[290px]`}
                style={{
                  clipPath: 'polygon(0 8%, 5% 6%, 10% 8%, 15% 6%, 20% 8%, 25% 6%, 30% 8%, 35% 6%, 40% 8%, 45% 6%, 50% 8%, 55% 6%, 60% 8%, 65% 6%, 70% 8%, 75% 6%, 80% 8%, 85% 6%, 90% 8%, 95% 6%, 100% 8%, 100% 92%, 95% 94%, 90% 92%, 85% 94%, 80% 92%, 75% 94%, 70% 92%, 65% 94%, 60% 92%, 55% 94%, 50% 92%, 45% 94%, 40% 92%, 35% 94%, 30% 92%, 25% 94%, 20% 92%, 15% 94%, 10% 92%, 5% 94%, 0 92%)'
                }}
              >
                <Image
                  src="/11.webp"
                  alt={categories[1].name}
                  fill
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-8 left-8 md:top-10 md:left-8 bg-white px-3 py-1.5 md:px-6 md:py-3 border-[3px] md:border-[6px] border-black shadow-lg z-10">
                  <span className="text-gray-900 font-bold text-xs md:text-lg lg:text-xl">{categories[1].name}</span>
                </div>
              </Link>

              {/* 右中 - 波浪形 */}
              <Link
                href={`/category/${categories[3].id}`}
                className={`relative ${categories[3].color} overflow-hidden group hover:scale-[1.02] transition-all h-[300px] md:h-[300px]`}
                style={{
                  clipPath: 'polygon(0 8%, 5% 6%, 10% 8%, 15% 6%, 20% 8%, 25% 6%, 30% 8%, 35% 6%, 40% 8%, 45% 6%, 50% 8%, 55% 6%, 60% 8%, 65% 6%, 70% 8%, 75% 6%, 80% 8%, 85% 6%, 90% 8%, 95% 6%, 100% 8%, 100% 92%, 95% 94%, 90% 92%, 85% 94%, 80% 92%, 75% 94%, 70% 92%, 65% 94%, 60% 92%, 55% 94%, 50% 92%, 45% 94%, 40% 92%, 35% 94%, 30% 92%, 25% 94%, 20% 92%, 15% 94%, 10% 92%, 5% 94%, 0 92%)'
                }}
              >
                <Image
                  src="/13.webp"
                  alt={categories[3].name}
                  fill
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-8 left-8 md:top-10 md:left-8 bg-white px-3 py-1.5 md:px-6 md:py-3 border-[3px] md:border-[6px] border-black shadow-lg z-10">
                  <span className="text-gray-900 font-bold text-xs md:text-lg lg:text-xl">{categories[3].name}</span>
                </div>
              </Link>

              {/* 第三行左 - 波浪形 */}
              <Link
                href={`/category/${categories[2].id}`}
                className={`relative ${categories[2].color} overflow-hidden group hover:scale-[1.02] transition-all h-[300px]`}
                style={{
                  clipPath: 'polygon(0 8%, 5% 6%, 10% 8%, 15% 6%, 20% 8%, 25% 6%, 30% 8%, 35% 6%, 40% 8%, 45% 6%, 50% 8%, 55% 6%, 60% 8%, 65% 6%, 70% 8%, 75% 6%, 80% 8%, 85% 6%, 90% 8%, 95% 6%, 100% 8%, 100% 92%, 95% 94%, 90% 92%, 85% 94%, 80% 92%, 75% 94%, 70% 92%, 65% 94%, 60% 92%, 55% 94%, 50% 92%, 45% 94%, 40% 92%, 35% 94%, 30% 92%, 25% 94%, 20% 92%, 15% 94%, 10% 92%, 5% 94%, 0 92%)'
                }}
              >
                <Image
                  src="/12.webp"
                  alt={categories[2].name}
                  fill
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-8 left-8 md:top-10 md:left-8 bg-white px-3 py-1.5 md:px-6 md:py-3 border-[3px] md:border-[6px] border-black shadow-lg z-10">
                  <span className="text-gray-900 font-bold text-xs md:text-lg lg:text-xl">{categories[2].name}</span>
                </div>
              </Link>

              {/* 第三行右 - 波浪形 */}
              <Link
                href={`/category/${categories[4].id}`}
                className={`relative ${categories[4].color} overflow-hidden group hover:scale-[1.02] transition-all h-[300px]`}
                style={{
                  clipPath: 'polygon(0 8%, 5% 6%, 10% 8%, 15% 6%, 20% 8%, 25% 6%, 30% 8%, 35% 6%, 40% 8%, 45% 6%, 50% 8%, 55% 6%, 60% 8%, 65% 6%, 70% 8%, 75% 6%, 80% 8%, 85% 6%, 90% 8%, 95% 6%, 100% 8%, 100% 92%, 95% 94%, 90% 92%, 85% 94%, 80% 92%, 75% 94%, 70% 92%, 65% 94%, 60% 92%, 55% 94%, 50% 92%, 45% 94%, 40% 92%, 35% 94%, 30% 92%, 25% 94%, 20% 92%, 15% 94%, 10% 92%, 5% 94%, 0 92%)'
                }}
              >
                <Image
                  src="/14.webp"
                  alt={categories[4].name}
                  fill
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-8 left-8 md:top-10 md:left-8 bg-white px-3 py-1.5 md:px-6 md:py-3 border-[3px] md:border-[6px] border-black shadow-lg z-10">
                  <span className="text-gray-900 font-bold text-xs md:text-lg lg:text-xl">{categories[4].name}</span>
                </div>
              </Link>

              {/* 底部全宽 - 锯齿形 */}
              <Link
                href={`/category/${categories[5].id}`}
                className={`relative ${categories[5].color} overflow-hidden group hover:scale-[1.02] transition-all h-[300px] md:col-span-2`}
                style={{
                  clipPath: 'polygon(0 0, 4% 2%, 8% 0, 12% 2%, 16% 0, 20% 2%, 24% 0, 28% 2%, 32% 0, 36% 2%, 40% 0, 44% 2%, 48% 0, 52% 2%, 56% 0, 60% 2%, 64% 0, 68% 2%, 72% 0, 76% 2%, 80% 0, 84% 2%, 88% 0, 92% 2%, 96% 0, 100% 2%, 100% 100%, 96% 98%, 92% 100%, 88% 98%, 84% 100%, 80% 98%, 76% 100%, 72% 98%, 68% 100%, 64% 98%, 60% 100%, 56% 98%, 52% 100%, 48% 98%, 44% 100%, 40% 98%, 36% 100%, 32% 98%, 28% 100%, 24% 98%, 20% 100%, 16% 98%, 12% 100%, 8% 98%, 4% 100%, 0 98%)'
                }}
              >
                <Image
                  src="/15.webp"
                  alt={categories[5].name}
                  fill
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-8 left-8 md:top-8 md:left-8 bg-white px-3 py-1.5 md:px-6 md:py-3 border-[3px] md:border-[6px] border-black shadow-lg z-10">
                  <span className="text-gray-900 font-bold text-xs md:text-lg lg:text-xl">{categories[5].name}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 会员代下单服务 */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            {/* 模式2标注 */}
            <div className="text-center mb-8">
              <span className="inline-block bg-yellow-400 text-black font-bold px-10 py-4 rounded-full text-lg shadow-lg">
                模式② 代下单
              </span>
            </div>

            <div className="relative" style={{ filter: 'drop-shadow(0 0 0 4px black)' }}>
              <div
                className="bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 text-white px-12 py-16 md:px-20 md:py-20"
                style={{
                  clipPath: 'polygon(0 3%, 2% 1%, 4% 3%, 6% 1%, 8% 3%, 10% 1%, 12% 3%, 14% 1%, 16% 3%, 18% 1%, 20% 3%, 22% 1%, 24% 3%, 26% 1%, 28% 3%, 30% 1%, 32% 3%, 34% 1%, 36% 3%, 38% 1%, 40% 3%, 42% 1%, 44% 3%, 46% 1%, 48% 3%, 50% 1%, 52% 3%, 54% 1%, 56% 3%, 58% 1%, 60% 3%, 62% 1%, 64% 3%, 66% 1%, 68% 3%, 70% 1%, 72% 3%, 74% 1%, 76% 3%, 78% 1%, 80% 3%, 82% 1%, 84% 3%, 86% 1%, 88% 3%, 90% 1%, 92% 3%, 94% 1%, 96% 3%, 98% 1%, 100% 3%, 100% 97%, 98% 99%, 96% 97%, 94% 99%, 92% 97%, 90% 99%, 88% 97%, 86% 99%, 84% 97%, 82% 99%, 80% 97%, 78% 99%, 76% 97%, 74% 99%, 72% 97%, 70% 99%, 68% 97%, 66% 99%, 64% 97%, 62% 99%, 60% 97%, 58% 99%, 56% 97%, 54% 99%, 52% 97%, 50% 99%, 48% 97%, 46% 99%, 44% 97%, 42% 99%, 40% 97%, 38% 99%, 36% 97%, 34% 99%, 32% 97%, 30% 99%, 28% 97%, 26% 99%, 24% 97%, 22% 99%, 20% 97%, 18% 99%, 16% 97%, 14% 99%, 12% 97%, 10% 99%, 8% 97%, 6% 99%, 4% 97%, 2% 99%, 0 97%)'
                }}
              >
                <div className="text-center max-w-4xl mx-auto">
                  <div className="inline-block bg-white text-pink-500 px-6 py-2 mb-6 border-4 border-black shadow-lg">
                    <span className="font-black text-lg uppercase">专属服务</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">
                    山姆会员<br className="md:hidden" />协助代下单
                  </h2>

                  <div className="bg-white/10 backdrop-blur-sm border-3 border-white/30 rounded-2xl p-8 mb-8">
                    <p className="text-xl md:text-2xl leading-relaxed">
                      山姆官方配送根据可配送地址可购买<br className="hidden md:block" />
                      会员协助代下单
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                      <span className="text-lg font-bold">官方配送</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                      <span className="text-lg font-bold">正品保证</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                      <span className="text-lg font-bold">专人协助</span>
                    </div>
                  </div>

                  {/* 9.9会员代下单按钮 */}
                  <div className="mt-8">
                    <button
                      onClick={handleAddVipService}
                      className="bg-green-500 hover:bg-green-600 text-white font-black text-2xl px-12 py-5 rounded-full shadow-xl transition-all hover:scale-105 border-4 border-yellow-400"
                    >
                      9.9会员代下单
                    </button>

                    {/* 聊天咨询提示 */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-yellow-300">
                      <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm md:text-base font-bold">
                        有疑问？点击右下角咨询客服
                      </p>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom text-center">
          {/* 联系按钮 */}
          <div className="mb-6">
            <a
              href="https://work.weixin.qq.com/ca/cawcdeac58029da582"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              联系我们
            </a>
          </div>
          <p>&copy; 2024 山姆代购. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">南京克劳笛奥科技有限公司技术开发</p>
        </div>
      </footer>
    </>
  );
}
