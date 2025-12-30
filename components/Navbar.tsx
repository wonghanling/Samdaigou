'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import CartSidebar from './CartSidebar';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, profile, loading, signOut } = useUser();

  const navLinks = [
    { name: '首页', href: '/' },
    { name: '商品分类', href: '/category/cookies' },
    { name: '我的订单', href: '/orders' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <div className="text-base font-bold text-black flex items-center gap-1">
              购物车付款
              <Image
                src="/right-arrow-svgrepo-com.svg"
                alt="arrow"
                width={16}
                height={16}
                className="inline-block"
              />
            </div>
            <div className="text-xs font-medium text-gray-700">
              模式① 和模式② 不可同时购买谨慎
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* 购物车图标 */}
            <button
              onClick={() => setCartSidebarOpen(true)}
              className="relative p-2 hover:text-primary transition-colors"
            >
              <Image
                src="/shopping-cart-svgrepo-com.svg"
                alt="购物车"
                width={24}
                height={24}
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* 用户菜单 */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                        {profile?.name?.[0] || user.email?.[0].toUpperCase()}
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* 下拉菜单 */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-lg">
                        <div className="px-4 py-3 border-b-2 border-gray-200">
                          <p className="text-sm font-bold truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm hover:bg-gray-100 font-medium"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          我的订单
                        </Link>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm hover:bg-gray-100 font-medium"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          个人资料
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-medium text-red-600"
                        >
                          退出登录
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="btn-primary text-sm">
                    登录
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* 移动端购物车图标 */}
            <button
              onClick={() => setCartSidebarOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <Image
                src="/shopping-cart-svgrepo-com.svg"
                alt="购物车"
                width={24}
                height={24}
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 px-4 text-sm font-medium ${
                  pathname === link.href ? 'text-primary bg-blue-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!loading && (
              <>
                {user ? (
                  <div className="mt-4 px-4">
                    <div className="p-3 bg-gray-100 border-2 border-gray-300 mb-2">
                      <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      个人资料
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-4 text-sm font-medium text-red-600 hover:bg-gray-100"
                    >
                      退出登录
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block mt-4 mx-4 text-center btn-primary text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    登录
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* 购物车侧边栏 */}
      <CartSidebar isOpen={cartSidebarOpen} onClose={() => setCartSidebarOpen(false)} />
    </nav>
  );
}
