'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setMessage('密码至少需要6位字符');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        setMessage('注册成功！请查收邮箱验证邮件，验证后即可登录');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('注册失败:', error);
      if (error.message.includes('already registered')) {
        setMessage('该邮箱已被注册，请直接登录');
      } else {
        setMessage(error.message || '注册失败，请重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="bg-white border-4 border-black p-8">
              <h1 className="text-3xl font-black mb-8 uppercase text-center">注册账号</h1>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    QQ邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                    placeholder="example@qq.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    密码 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                    placeholder="至少6位字符"
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    确认密码 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                    placeholder="再次输入密码"
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '注册中...' : '注册'}
                </button>
              </form>

              {message && (
                <div
                  className={`mt-4 p-4 border-2 ${
                    message.includes('成功')
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                  }`}
                >
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  已有账号？{' '}
                  <Link href="/login" className="text-pink-500 hover:text-pink-600 font-bold">
                    立即登录
                  </Link>
                </p>
              </div>

              <Link
                href="/"
                className="block mt-4 text-center text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
