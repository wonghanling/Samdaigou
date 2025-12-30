import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();

    const {
      orderNo,
      userId,
      userName,
      userPhone,
      userAddress,
      items,
      totalAmount,
    } = body;

    // 插入订单到数据库
    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_no: orderNo,
        user_id: userId || null,
        user_name: userName,
        user_phone: userPhone,
        user_address: userAddress,
        items: items,
        total_amount: totalAmount,
        status: 'pending',
        payment_method: 'alipay',
      })
      .select()
      .single();

    if (error) {
      console.error('保存订单失败:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error: any) {
    console.error('保存订单失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || '保存订单失败',
      },
      { status: 500 }
    );
  }
}
