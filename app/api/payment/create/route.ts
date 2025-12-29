import { NextRequest, NextResponse } from 'next/server';
import { createPCPayment, createMobilePayment, isMobile, generateOrderNo } from '@/lib/alipay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, userInfo } = body;

    // 计算金额
    const itemsTotal = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const totalAmount = itemsTotal.toFixed(2);

    // 生成订单号
    const orderNo = generateOrderNo();

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
      totalAmount: totalAmount,
      subject: '山姆代购订单',
      body: `订单号:${orderNo}, 共${items.length}件商品`,
      returnUrl: `${baseUrl}/payment/return?orderNo=${orderNo}`,
      notifyUrl: `${baseUrl}/api/payment/notify`,
    };

    // 根据设备类型选择支付方式
    let paymentUrl;
    if (isMobileDevice) {
      // 手机网站支付
      paymentUrl = await createMobilePayment(paymentParams);
    } else {
      // 电脑网站支付
      paymentUrl = await createPCPayment(paymentParams);
    }

    // TODO: 这里应该将订单信息保存到数据库
    // 暂时返回订单信息和支付URL

    return NextResponse.json({
      success: true,
      data: {
        orderNo,
        paymentUrl,
        totalAmount,
        isMobile: isMobileDevice,
      },
    });
  } catch (error: any) {
    console.error('创建支付订单失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || '创建支付订单失败',
      },
      { status: 500 }
    );
  }
}
