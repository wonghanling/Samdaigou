import { NextRequest, NextResponse } from 'next/server';
import { createPCPayment, createMobilePayment, isMobile } from '@/lib/alipay';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNo } = body;

    if (!orderNo) {
      return NextResponse.json(
        { success: false, error: '订单号不能为空' },
        { status: 400 }
      );
    }

    // 从数据库获取订单信息
    const supabase = createServerSupabaseClient();
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_no', orderNo)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { success: false, error: '订单不存在' },
        { status: 404 }
      );
    }

    // 检查订单状态
    if (order.status !== 'pending') {
      return NextResponse.json(
        { success: false, error: '该订单无法支付' },
        { status: 400 }
      );
    }

    // 获取User-Agent判断设备类型
    const userAgent = request.headers.get('user-agent') || '';
    const isMobileDevice = isMobile(userAgent);

    // 获取部署域名
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // 支付参数
    const paymentParams = {
      outTradeNo: orderNo,
      totalAmount: order.total_amount.toString(),
      subject: '山姆代购订单',
      body: `订单号:${orderNo}, 共${order.items.length}件商品`,
      returnUrl: `${baseUrl}/payment/return?orderNo=${orderNo}`,
      notifyUrl: `${baseUrl}/api/payment/notify`,
    };

    // 根据设备类型选择支付方式
    let paymentUrl;
    if (isMobileDevice) {
      paymentUrl = await createMobilePayment(paymentParams);
    } else {
      paymentUrl = await createPCPayment(paymentParams);
    }

    return NextResponse.json({
      success: true,
      data: {
        orderNo,
        paymentUrl,
        isMobile: isMobileDevice,
      },
    });
  } catch (error: any) {
    console.error('继续支付失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || '继续支付失败',
      },
      { status: 500 }
    );
  }
}
