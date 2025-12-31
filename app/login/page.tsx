'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type LoginMode = 'otp' | 'password';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>('otp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState('');

  // 发送验证码
  const handleSendCode = async () => {
    if (!email) {
      setMessage('请输入邮箱地址');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('请输入有效的邮箱地址');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false, // 不自动创建用户，必须先注册
        },
      });

      if (error) {
        if (error.message.includes('User not found')) {
          setMessage('该邮箱未注册，请先注册账号');
        } else {
          throw error;
        }
      } else {
        setCodeSent(true);
        setMessage('验证码已发送到您的邮箱，请查收！');

        // 倒计时60秒
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error: any) {
      console.error('发送验证码失败:', error);
      setMessage(error.message || '发送验证码失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 验证码登录
  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) {
      setMessage('请输入邮箱和验证码');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: code,
        type: 'email',
      });

      if (error) throw error;

      if (data.user) {
        setMessage('登录成功！');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 500);
      }
    } catch (error: any) {
      console.error('登录失败:', error);
      setMessage(error.message || '验证码错误或已过期，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 密码登录
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('请输入邮箱和密码');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setMessage('邮箱或密码错误，请重试');
        } else {
          throw error;
        }
      } else if (data.user) {
        setMessage('登录成功！');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 500);
      }
    } catch (error: any) {
      console.error('登录失败:', error);
      setMessage(error.message || '登录失败，请重试');
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
              <h1 className="text-3xl font-black mb-8 uppercase text-center">登录</h1>

              {/* 切换登录方式 */}
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('otp')}
                  className={`flex-1 py-2 px-4 font-bold border-2 border-black transition-colors ${
                    mode === 'otp'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  邮箱验证码
                </button>
                <button
                  type="button"
                  onClick={() => setMode('password')}
                  className={`flex-1 py-2 px-4 font-bold border-2 border-black transition-colors ${
                    mode === 'password'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  密码登录
                </button>
              </div>

              {/* 验证码登录 */}
              {mode === 'otp' && (
                <form onSubmit={handleOTPLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      QQ邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-green-500"
                      placeholder="example@qq.com"
                      disabled={codeSent}
                    />
                  </div>

                  {!codeSent ? (
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={loading || countdown > 0}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? '发送中...' : countdown > 0 ? `${countdown}秒后重试` : '发送验证码'}
                    </button>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          验证码 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-green-500"
                          placeholder="请输入6位验证码"
                          maxLength={6}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? '登录中...' : '登录'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCodeSent(false);
                          setCode('');
                          setCountdown(0);
                        }}
                        className="w-full text-sm text-gray-600 hover:text-gray-900"
                      >
                        重新输入邮箱
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* 密码登录 */}
              {mode === 'password' && (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      QQ邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-green-500"
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
                      className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-green-500"
                      placeholder="请输入密码"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '登录中...' : '登录'}
                  </button>
                </form>
              )}

              {/* 提示信息 */}
              {message && (
                <div
                  className={`mt-4 p-4 border-2 ${
                    message.includes('成功')
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : message.includes('验证码已发送')
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                  }`}
                >
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  还没有账号？{' '}
                  <Link href="/register" className="text-green-500 hover:text-green-600 font-bold">
                    立即注册
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
