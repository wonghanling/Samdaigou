'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type RegisterMode = 'otp' | 'password';

export default function RegisterPage() {
  const router = useRouter();
  const [mode, setMode] = useState<RegisterMode>('otp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      // 先尝试用shouldCreateUser: false发送验证码，检查用户是否已存在
      const { error: checkError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false, // 不创建新用户，只为已存在用户发送
        },
      });

      // 如果成功（没有错误），说明用户已存在
      if (!checkError) {
        setMessage('该邮箱已注册，请前往登录页面登录');
        setLoading(false);
        return;
      }

      // 如果失败且错误提示用户不存在，说明可以注册
      if (checkError.message.includes('User not found') || checkError.message.includes('not found')) {
        // 用户不存在，可以发送注册验证码
        const { error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            shouldCreateUser: true, // 允许创建新用户
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
      } else {
        // 其他错误
        throw checkError;
      }
    } catch (error: any) {
      console.error('发送验证码失败:', error);
      setMessage(error.message || '发送验证码失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 验证码注册
  const handleOTPRegister = async (e: React.FormEvent) => {
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
        setMessage('注册成功！正在跳转...');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1000);
      }
    } catch (error: any) {
      console.error('注册失败:', error);
      setMessage(error.message || '验证码错误或已过期，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 密码注册
  const handlePasswordRegister = async (e: React.FormEvent) => {
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

      if (error) {
        // Supabase会返回特定错误如果邮箱已被注册
        if (error.message.includes('already') || error.message.includes('exists') || error.message.includes('registered')) {
          setMessage('该邮箱已注册，请前往登录页面登录');
        } else {
          throw error;
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        // 检查是否是新创建的用户
        const userCreatedAt = new Date(data.user.created_at || '');
        const now = new Date();
        const timeDiff = now.getTime() - userCreatedAt.getTime();

        // 如果用户创建时间超过5秒，说明是已存在的用户
        if (timeDiff > 5000) {
          setMessage('该邮箱已注册，请前往登录页面登录');
          setLoading(false);
          return;
        }

        setMessage('注册成功！正在跳转...');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1000);
      }
    } catch (error: any) {
      console.error('注册失败:', error);
      setMessage(error.message || '注册失败，请重试');
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

              {/* 切换注册方式 */}
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
                  密码注册
                </button>
              </div>

              {/* 验证码注册 */}
              {mode === 'otp' && (
                <form onSubmit={handleOTPRegister} className="space-y-4">
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
                        {loading ? '注册中...' : '注册'}
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

              {/* 密码注册 */}
              {mode === 'password' && (
                <form onSubmit={handlePasswordRegister} className="space-y-4">
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
                      className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-green-500"
                      placeholder="再次输入密码"
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '注册中...' : '注册'}
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
                  已有账号？{' '}
                  <Link href="/login" className="text-green-500 hover:text-green-600 font-bold">
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
