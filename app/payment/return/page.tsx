'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'success' | 'failed'>('checking');
  const orderNo = searchParams.get('orderNo');

  useEffect(() => {
    // 从URL参数中获取支付宝返回的参数
    const tradeNo = searchParams.get('trade_no');
    const outTradeNo = searchParams.get('out_trade_no');

    if (tradeNo && outTradeNo) {
      // 支付成功
      setStatus('success');
    } else {
      // 参数不完整，可能支付失败或取消
      setTimeout(() => setStatus('failed'), 1000);
    }
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-2xl">
          {status === 'checking' && (
            <div className="bg-white border-4 border-black p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold mb-2">正在确认支付状态...</h2>
              <p className="text-gray-600">请稍候</p>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-white border-4 border-black p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-4 text-green-600">支付成功！</h2>
              <p className="text-gray-700 mb-2">订单号：{orderNo}</p>
              <p className="text-gray-600 mb-8">
                感谢您的购买！我们会尽快为您处理订单。
              </p>

              <div className="space-y-4">
                <Link
                  href="/"
                  className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 uppercase transition-colors border-4 border-black"
                >
                  返回首页
                </Link>
                <Link
                  href="/orders"
                  className="block w-full bg-white hover:bg-gray-100 text-black font-bold py-4 px-6 uppercase transition-colors border-4 border-black"
                >
                  查看订单详情
                </Link>
              </div>
            </div>
          )}

          {status === 'failed' && (
            <div className="bg-white border-4 border-black p-12 text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-4 text-red-600">支付失败或已取消</h2>
              <p className="text-gray-600 mb-8">
                您的支付未完成，请重试或联系客服。
              </p>

              <div className="space-y-4">
                <Link
                  href="/cart"
                  className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 uppercase transition-colors border-4 border-black"
                >
                  返回购物车
                </Link>
                <Link
                  href="/"
                  className="block w-full bg-white hover:bg-gray-100 text-black font-bold py-4 px-6 uppercase transition-colors border-4 border-black"
                >
                  返回首页
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container-custom max-w-2xl">
            <div className="bg-white border-4 border-black p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold mb-2">加载中...</h2>
            </div>
          </div>
        </div>
      </>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
}
