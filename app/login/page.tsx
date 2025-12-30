'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type AuthMode = 'email' | 'password';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('email');
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

    // 验证邮箱格式
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
          shouldCreateUser: true, // 如果用户不存在则自动注册
        },
      });

      if (error) throw error;

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
    } catch (error: any) {
      console.error('发送验证码失败:', error);
      setMessage(error.message || '发送验证码失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 验证码登录
  const handleEmailLogin = async (e: React.FormEvent) => {
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

  // 密码登录/注册
  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('请输入邮箱和密码');
      return;
    }

    if (password.length < 6) {
      setMessage('密码至少需要6位字符');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // 先尝试登录
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        // 如果登录失败，尝试注册
        if (signInError.message.includes('Invalid login credentials')) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
          });

          if (signUpError) throw signUpError;

          if (signUpData.user) {
            setMessage('注册成功！请查收邮箱验证邮件');
            // Supabase 默认需要邮箱验证，所以这里等待用户验证
            return;
          }
        } else {
          throw signInError;
        }
      }

      if (signInData.user) {
        setMessage('登录成功！');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 500);
      }
    } catch (error: any) {
      console.error('操作失败:', error);
      setMessage(error.message || '操作失败，请重试');
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
              <h1 className="text-3xl font-black mb-8 uppercase text-center">登录 / 注册</h1>

              {/* 切换登录方式 */}
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('email')}
                  className={`flex-1 py-2 px-4 font-bold border-2 border-black transition-colors ${
                    mode === 'email'
                      ? 'bg-pink-500 text-white'
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
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  密码登录
                </button>
              </div>

              {/* 邮箱验证码登录 */}
              {mode === 'email' && (
                <form onSubmit={handleEmailLogin} className="space-y-4">
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
                      disabled={codeSent}
                    />
                  </div>

                  {!codeSent ? (
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={loading || countdown > 0}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
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
                          className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                          placeholder="请输入6位验证码"
                          maxLength={6}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
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

              {/* 密码登录/注册 */}
              {mode === 'password' && (
                <form onSubmit={handlePasswordAuth} className="space-y-4">
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '处理中...' : '登录 / 注册'}
                  </button>

                  <p className="text-xs text-gray-600 text-center">
                    首次使用密码登录将自动注册账号
                  </p>
                </form>
              )}

              {/* 提示信息 */}
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

              {/* 返回首页 */}
              <Link
                href="/"
                className="block mt-6 text-center text-sm text-gray-600 hover:text-gray-900 font-medium"
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
