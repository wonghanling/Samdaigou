import { NextRequest, NextResponse } from 'next/server';
import { verifyCallback } from '@/lib/alipay';

// 支付宝异步通知回调
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const params: any = {};

    formData.forEach((value, key) => {
      params[key] = value;
    });

    console.log('支付宝异步通知:', params);

    // 验证签名
    const isValid = verifyCallback(params);

    if (!isValid) {
      console.error('签名验证失败');
      return new NextResponse('fail', { status: 400 });
    }

    // 提取关键信息
    const {
      out_trade_no, // 商户订单号
      trade_no, // 支付宝交易号
      trade_status, // 交易状态
      total_amount, // 订单金额
    } = params;

    // 处理支付成功
    if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
      console.log(`订单 ${out_trade_no} 支付成功，支付宝交易号: ${trade_no}`);

      // TODO: 更新数据库订单状态为已支付
      // await updateOrderStatus(out_trade_no, {
      //   status: 'paid',
      //   tradeNo: trade_no,
      //   paidAt: new Date(),
      // });
    }

    // 返回success给支付宝，表示已收到通知
    return new NextResponse('success');
  } catch (error) {
    console.error('处理支付回调失败:', error);
    return new NextResponse('fail', { status: 500 });
  }
}

// 不允许GET请求
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
