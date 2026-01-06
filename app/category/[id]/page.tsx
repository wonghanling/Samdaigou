'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';

// 分类数据
const categories = [
  { id: 'cookies', name: '爆款饼干 / 脆零食' },
  { id: 'dessert', name: '黄油甜点 / 西式点心' },
  { id: 'chocolate', name: '巧克力.糖果' },
  { id: 'nuts', name: '坚果 · 健康零食' },
  { id: 'drinks', name: '饮品' },
  { id: 'instant', name: '即刻速食' },
];

// 商品数据 - 🔥 爆款饼干 / 脆零食
const cookiesProducts = [
  { id: '30', name: '山姆商品17', specs: '104.4g', price: 53.9, imageUrl: '/30.webp' },
  { id: '32', name: '山姆商品18', specs: '101.7g', price: 54.9, imageUrl: '/32.webp' },
  { id: '34', name: '山姆商品19', specs: '50g', price: 59.9, imageUrl: '/34.webp' },
  { id: '36', name: '山姆商品20', specs: '75g', price: 41.9, imageUrl: '/36.webp' },
  { id: '38', name: '山姆商品21', specs: '75g', price: 74.9, imageUrl: '/38.webp' },
  { id: '40', name: '山姆商品22', specs: '55g', price: 47.9, imageUrl: '/40.webp' },
  { id: '41', name: '山姆商品23', specs: '55g', price: 37.9, imageUrl: '/41.webp' },
  { id: '42', name: '山姆商品24', specs: '100g', price: 64.9, imageUrl: '/42.webp' },
  { id: '43', name: '山姆商品25', specs: '100g', price: 99.9, imageUrl: '/43.webp' },
  { id: '44', name: '山姆商品26', specs: '100g', price: 74.9, imageUrl: '/44.webp' },
];

// 商品数据 - 黄油甜点 / 西式点心
const dessertProducts = [
  { id: '45', name: '山姆商品27', specs: '150g', price: 54.9, imageUrl: '/45.webp' },
  { id: '46', name: '山姆商品28', specs: '150g', price: 55.9, imageUrl: '/46.webp' },
  { id: '47', name: '山姆商品29', specs: '150g', price: 104.9, imageUrl: '/47.webp' },
  { id: '48', name: '山姆商品30', specs: '150g', price: 54.9, imageUrl: '/48.webp' },
  { id: '49', name: '山姆商品31', specs: '150g', price: 47.9, imageUrl: '/49.webp' },
  { id: '50', name: '山姆商品32', specs: '150g', price: 54.9, imageUrl: '/50.webp' },
  { id: '51', name: '山姆商品33', specs: '150g', price: 64.9, imageUrl: '/51.webp' },
  { id: '52', name: '山姆商品34', specs: '150g', price: 64.9, imageUrl: '/52.webp' },
  { id: '53', name: '山姆商品35', specs: '150g', price: 54.9, imageUrl: '/53.webp' },
  { id: '54', name: '山姆商品36', specs: '150g', price: 48.9, imageUrl: '/54.webp' },
  { id: '55', name: '山姆商品37', specs: '150g', price: 54.9, imageUrl: '/55.webp' },
];

// 商品数据 - 巧克力.糖果
const chocolateProducts = [
  { id: '56', name: '山姆商品38', specs: '200g', price: 106.9, imageUrl: '/56.webp' },
  { id: '57', name: '山姆商品39', specs: '200g', price: 204.9, imageUrl: '/57.webp' },
  { id: '60', name: '山姆商品40', specs: '200g', price: 74.9, imageUrl: '/60.webp' },
  { id: '61', name: '山姆商品41', specs: '200g', price: 174.9, imageUrl: '/61.webp' },
  { id: '63', name: '山姆商品42', specs: '200g', price: 94.9, imageUrl: '/63.webp' },
  { id: '65', name: '山姆商品43', specs: '200g', price: 94.9, imageUrl: '/65.webp' },
  { id: '66', name: '山姆商品44', specs: '200g', price: 153.9, imageUrl: '/66.webp' },
  { id: '67', name: '山姆商品45', specs: '200g', price: 164.9, imageUrl: '/67.webp' },
  { id: '68', name: '山姆商品46', specs: '200g', price: 83.9, imageUrl: '/68.webp' },
  { id: '69', name: '山姆商品47', specs: '200g', price: 84.9, imageUrl: '/69.webp' },
  { id: '70', name: '山姆商品48', specs: '200g', price: 84.9, imageUrl: '/70.webp' },
  { id: '72', name: '山姆商品49', specs: '200g', price: 164.9, imageUrl: '/72.webp' },
  { id: '73', name: '山姆商品50', specs: '200g', price: 74.9, imageUrl: '/73.webp' },
  { id: '74', name: '山姆商品51', specs: '200g', price: 174.9, imageUrl: '/74.webp' },
  { id: '75', name: '山姆商品52', specs: '200g', price: 94.9, imageUrl: '/75.webp' },
  { id: '76', name: '山姆商品53', specs: '200g', price: 64.9, imageUrl: '/76.webp' },
  { id: '77', name: '山姆商品54', specs: '200g', price: 74.9, imageUrl: '/77.webp' },
  { id: '78', name: '山姆商品55', specs: '200g', price: 74.9, imageUrl: '/78.webp' },
  { id: '79', name: '山姆商品56', specs: '200g', price: 154.8, imageUrl: '/79.webp' },
  { id: '80', name: '山姆商品57', specs: '200g', price: 54.9, imageUrl: '/80.webp' },
  { id: '81', name: '山姆商品58', specs: '200g', price: 104.9, imageUrl: '/81.webp' },
  { id: '82', name: '山姆商品59', specs: '200g', price: 64.9, imageUrl: '/82.webp' },
  { id: '83', name: '山姆商品60', specs: '200g', price: 54.9, imageUrl: '/83.webp' },
  { id: '84', name: '山姆商品61', specs: '200g', price: 74.9, imageUrl: '/84.webp' },
  { id: '85', name: '山姆商品62', specs: '200g', price: 74.9, imageUrl: '/85.webp' },
  { id: '86', name: '山姆商品63', specs: '200g', price: 64.9, imageUrl: '/86.webp' },
  { id: '87', name: '山姆商品64', specs: '200g', price: 74.9, imageUrl: '/87.webp' },
  { id: '88', name: '山姆商品65', specs: '200g', price: 104.9, imageUrl: '/88.webp' },
  { id: '89', name: '山姆商品66', specs: '200g', price: 74.9, imageUrl: '/89.webp' },
];

// 商品数据 - 坚果 · 健康零食
const nutsProducts = [
  { id: '90', name: '山姆商品67', specs: '250g', price: 54.9, imageUrl: '/90.webp' },
  { id: '91', name: '山姆商品68', specs: '250g', price: 54.9, imageUrl: '/91.webp' },
  { id: '92', name: '山姆商品69', specs: '250g', price: 74.9, imageUrl: '/92.webp' },
  { id: '93', name: '山姆商品70', specs: '250g', price: 94.9, imageUrl: '/93.webp' },
  { id: '94', name: '山姆商品71', specs: '250g', price: 104, imageUrl: '/94.webp' },
  { id: '95', name: '山姆商品72', specs: '250g', price: 110.9, imageUrl: '/95.webp' },
  { id: '96', name: '山姆商品73', specs: '250g', price: 60.9, imageUrl: '/96.webp' },
  { id: '97', name: '山姆商品74', specs: '250g', price: 54.9, imageUrl: '/97.webp' },
  { id: '98', name: '山姆商品75', specs: '250g', price: 354, imageUrl: '/98.webp' },
  { id: '99', name: '山姆商品76', specs: '250g', price: 134.9, imageUrl: '/99.webp' },
  { id: '100', name: '山姆商品77', specs: '250g', price: 111.9, imageUrl: '/100.webp' },
  { id: '101', name: '山姆商品78', specs: '250g', price: 54.9, imageUrl: '/101.webp' },
  { id: '102', name: '山姆商品79', specs: '250g', price: 73, imageUrl: '/102.webp' },
  { id: '103', name: '山姆商品80', specs: '250g', price: 84.9, imageUrl: '/103.webp' },
  { id: '104', name: '山姆商品81', specs: '250g', price: 61.9, imageUrl: '/104.webp' },
  { id: '105', name: '山姆商品82', specs: '250g', price: 74.9, imageUrl: '/105.webp' },
  { id: '106', name: '山姆商品83', specs: '250g', price: 50.9, imageUrl: '/106.webp' },
  { id: '107', name: '山姆商品84', specs: '250g', price: 104, imageUrl: '/107.webp' },
  { id: '108', name: '山姆商品85', specs: '250g', price: 54.9, imageUrl: '/108.webp' },
  { id: '109', name: '山姆商品86', specs: '250g', price: 114.9, imageUrl: '/109.webp' },
  { id: '110', name: '山姆商品87', specs: '250g', price: 74.9, imageUrl: '/110.webp' },
  { id: '111', name: '山姆商品88', specs: '250g', price: 84.9, imageUrl: '/111.webp' },
];

// 商品数据 - 饮品
const drinksProducts = [
  { id: '112', name: '山姆商品89', specs: '500ml', price: 704, imageUrl: '/112.webp' },
  { id: '113', name: '山姆商品90', specs: '500ml', price: 804.9, imageUrl: '/113.webp' },
  { id: '114', name: '山姆商品91', specs: '500ml', price: 80.9, imageUrl: '/114.webp' },
  { id: '115', name: '山姆商品92', specs: '500ml', price: 344.9, imageUrl: '/115.webp' },
  { id: '116', name: '山姆商品93', specs: '500ml', price: 804, imageUrl: '/116.webp' },
  { id: '117', name: '山姆商品94', specs: '500ml', price: 994.9, imageUrl: '/117.webp' },
  { id: '118', name: '山姆商品95', specs: '500ml', price: 894.9, imageUrl: '/118.webp' },
  { id: '119', name: '山姆商品96', specs: '500ml', price: 74.9, imageUrl: '/119.webp' },
  { id: '120', name: '山姆商品97', specs: '500ml', price: 73, imageUrl: '/120.webp' },
  { id: '121', name: '山姆商品98', specs: '500ml', price: 174, imageUrl: '/121.webp' },
  { id: '122', name: '山姆商品99', specs: '500ml', price: 84.9, imageUrl: '/122.webp' },
  { id: '123', name: '山姆商品100', specs: '500ml', price: 74.9, imageUrl: '/123.webp' },
  { id: '124', name: '山姆商品101', specs: '500ml', price: 69.9, imageUrl: '/124.webp' },
  { id: '125', name: '山姆商品102', specs: '500ml', price: 64.9, imageUrl: '/125.webp' },
  { id: '127', name: '山姆商品103', specs: '500ml', price: 55.9, imageUrl: '/127.webp' },
  { id: '128', name: '山姆商品104', specs: '500ml', price: 88.9, imageUrl: '/128.webp' },
  { id: '129', name: '山姆商品105', specs: '500ml', price: 66.9, imageUrl: '/129.webp' },
  { id: '130', name: '山姆商品106', specs: '500ml', price: 64.9, imageUrl: '/130.webp' },
  { id: '131', name: '山姆商品107', specs: '500ml', price: 50.9, imageUrl: '/131.webp' },
  { id: '132', name: '山姆商品108', specs: '500ml', price: 80.9, imageUrl: '/132.webp' },
  { id: '133', name: '山姆商品109', specs: '500ml', price: 94.9, imageUrl: '/133.webp' },
  { id: '134', name: '山姆商品110', specs: '500ml', price: 73, imageUrl: '/134.webp' },
  { id: '135', name: '山姆商品111', specs: '500ml', price: 84.9, imageUrl: '/135.webp' },
  { id: '136', name: '山姆商品112', specs: '500ml', price: 104.9, imageUrl: '/136.webp' },
  { id: '137', name: '山姆商品113', specs: '500ml', price: 84.9, imageUrl: '/137.webp' },
  { id: '138', name: '山姆商品114', specs: '500ml', price: 64.9, imageUrl: '/138.webp' },
  { id: '139', name: '山姆商品115', specs: '500ml', price: 61.9, imageUrl: '/139.webp' },
  { id: '140', name: '山姆商品116', specs: '500ml', price: 114.9, imageUrl: '/140.webp' },
  { id: '141', name: '山姆商品117', specs: '500ml', price: 94.9, imageUrl: '/141.webp' },
  { id: '142', name: '山姆商品118', specs: '500ml', price: 114.9, imageUrl: '/142.webp' },
  { id: '143', name: '山姆商品119', specs: '500ml', price: 73, imageUrl: '/143.webp' },
  { id: '144', name: '山姆商品120', specs: '500ml', price: 104.9, imageUrl: '/144.webp' },
  { id: '145', name: '山姆商品121', specs: '500ml', price: 104.9, imageUrl: '/145.webp' },
  { id: '146', name: '山姆商品122', specs: '500ml', price: 69.9, imageUrl: '/146.webp' },
  { id: '147', name: '山姆商品123', specs: '500ml', price: 53, imageUrl: '/147.webp' },
  { id: '148', name: '山姆商品124', specs: '500ml', price: 74.9, imageUrl: '/148.webp' },
  { id: '149', name: '山姆商品125', specs: '500ml', price: 94.9, imageUrl: '/149.webp' },
  { id: '150', name: '山姆商品126', specs: '500ml', price: 74.9, imageUrl: '/150.webp' },
  { id: '151', name: '山姆商品127', specs: '500ml', price: 174.9, imageUrl: '/151.webp' },
  { id: '152', name: '山姆商品128', specs: '500ml', price: 120.9, imageUrl: '/152.webp' },
  { id: '153', name: '山姆商品129', specs: '500ml', price: 94.9, imageUrl: '/153.webp' },
  { id: '154', name: '山姆商品130', specs: '500ml', price: 104.9, imageUrl: '/154.webp' },
  { id: '155', name: '山姆商品131', specs: '500ml', price: 129.9, imageUrl: '/155.webp' },
  { id: '156', name: '山姆商品132', specs: '500ml', price: 114.9, imageUrl: '/156.webp' },
  { id: '158', name: '山姆商品133', specs: '500ml', price: 104.9, imageUrl: '/158.webp' },
  { id: '159', name: '山姆商品134', specs: '500ml', price: 74.9, imageUrl: '/159.webp' },
  { id: '160', name: '山姆商品135', specs: '500ml', price: 94, imageUrl: '/160.webp' },
  { id: '161', name: '山姆商品136', specs: '500ml', price: 74.9, imageUrl: '/161.webp' },
  { id: '162', name: '山姆商品137', specs: '500ml', price: 40.9, imageUrl: '/162.webp' },
  { id: '163', name: '山姆商品138', specs: '500ml', price: 84.9, imageUrl: '/163.webp' },
  { id: '164', name: '山姆商品139', specs: '500ml', price: 64.9, imageUrl: '/164.webp' },
  { id: '165', name: '山姆商品140', specs: '500ml', price: 74.8, imageUrl: '/165.webp' },
  { id: '166', name: '山姆商品141', specs: '500ml', price: 114.9, imageUrl: '/166.webp' },
  { id: '167', name: '山姆商品142', specs: '500ml', price: 94, imageUrl: '/167.webp' },
];

// 商品数据 - 即刻速食
const instantProducts = [
  { id: '168', name: '山姆商品143', specs: '300g', price: 74.9, imageUrl: '/168.webp' },
  { id: '169', name: '山姆商品144', specs: '300g', price: 104.9, imageUrl: '/169.webp' },
  { id: '170', name: '山姆商品145', specs: '300g', price: 84.9, imageUrl: '/170.webp' },
  { id: '171', name: '山姆商品146', specs: '300g', price: 94.9, imageUrl: '/171.webp' },
  { id: '172', name: '山姆商品147', specs: '300g', price: 74.9, imageUrl: '/172.webp' },
  { id: '173', name: '山姆商品148', specs: '300g', price: 94.9, imageUrl: '/173.webp' },
  { id: '174', name: '山姆商品149', specs: '300g', price: 84.9, imageUrl: '/174.webp' },
  { id: '175', name: '山姆商品150', specs: '300g', price: 114.9, imageUrl: '/175.webp' },
  { id: '176', name: '山姆商品151', specs: '300g', price: 74.8, imageUrl: '/176.webp' },
  { id: '177', name: '山姆商品152', specs: '300g', price: 84.9, imageUrl: '/177.webp' },
];

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  const { addToCart } = useCart();
  const { user } = useUser();
  const [animatingProductId, setAnimatingProductId] = useState<string | null>(null);

  // 添加到购物车函数
  const handleAddToCart = (e: React.MouseEvent, product: any) => {
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

  // 根据选择的分类获取商品
  const getProductsByCategory = (categoryId: string) => {
    if (categoryId === 'cookies') {
      return cookiesProducts;
    }
    if (categoryId === 'dessert') {
      return dessertProducts;
    }
    if (categoryId === 'chocolate') {
      return chocolateProducts;
    }
    if (categoryId === 'nuts') {
      return nutsProducts;
    }
    if (categoryId === 'drinks') {
      return drinksProducts;
    }
    if (categoryId === 'instant') {
      return instantProducts;
    }
    // 其他分类暂时返回空数组
    return [];
  };

  const currentCategory = categories.find(cat => cat.id === categoryId);
  const currentProducts = getProductsByCategory(categoryId);

  if (!currentCategory) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-20 text-center">
          <p className="text-gray-500 text-lg">分类不存在</p>
          <Link href="/" className="text-pink-500 hover:underline mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          {/* 面包屑导航 */}
          <nav className="text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-gray-900">首页</Link>
            <span className="mx-2">•</span>
            <span className="text-gray-900">{currentCategory.name}</span>
          </nav>

          {/* 分类标题 */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 uppercase">
              {currentCategory.name}
            </h1>
            <p className="text-gray-600">优质山姆会员店商品精选</p>
          </div>

          {/* 其他分类导航 */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                    categoryId === cat.id
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-pink-500'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 商品网格 */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white border-t border-r border-l-4 border-b-4 border-black rounded-none p-6 hover:shadow-2xl transition-all group relative"
                >
                  {/* 产品图片 */}
                  <div className="relative w-full aspect-square bg-white mb-4 overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      quality={95}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* 产品信息 */}
                  <h3 className="font-bold text-sm mb-2 text-gray-900 min-h-[40px] leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{product.specs}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      € {product.price.toFixed(2)}
                    </span>

                    {/* 加入购物车按钮 */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`w-12 h-12 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
                        animatingProductId === product.id ? 'animate-bounce-scale' : ''
                      }`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">该分类暂无商品，敬请期待</p>
              <Link href="/" className="text-pink-500 hover:underline mt-4 inline-block">
                返回首页
              </Link>
            </div>
          )}
        </div>
      </div>

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
