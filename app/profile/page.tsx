'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, profile, loading: userLoading, refreshProfile } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
      return;
    }

    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
      });
    }
  }, [user, userLoading, profile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user!.id);

      if (error) throw error;

      await refreshProfile();
      setMessage('资料更新成功！');
    } catch (error: any) {
      console.error('更新资料失败:', error);
      setMessage('更新失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container-custom">
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">加载中...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-black mb-8 uppercase">个人资料</h1>

            <div className="bg-white border-4 border-black p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 邮箱（不可编辑） */}
                <div>
                  <label className="block text-sm font-bold mb-2">邮箱</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full border-2 border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">邮箱地址不可修改</p>
                </div>

                {/* 姓名 */}
                <div>
                  <label className="block text-sm font-bold mb-2">姓名</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                    placeholder="请输入您的姓名"
                  />
                </div>

                {/* 手机号 */}
                <div>
                  <label className="block text-sm font-bold mb-2">手机号</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:border-pink-500"
                    placeholder="请输入您的手机号"
                  />
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 uppercase transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '保存中...' : '保存资料'}
                </button>

                {/* 提示信息 */}
                {message && (
                  <div
                    className={`p-4 border-2 ${
                      message.includes('成功')
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                    }`}
                  >
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
