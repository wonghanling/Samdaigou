# 支付宝支付配置指南

## 📋 已实现的功能

✅ 支付宝电脑网站支付（PC端显示二维码）
✅ 支付宝手机网站支付（移动端跳转APP）
✅ 自动设备检测（PC/移动端自动选择支付方式）
✅ 支付回调处理（异步通知 + 同步跳转）
✅ 结账页面（填写收货信息）
✅ 支付成功/失败页面

## 🚀 部署到Vercel

### 步骤1：配置环境变量

在Vercel项目设置中添加以下环境变量：

1. 进入Vercel项目 → Settings → Environment Variables

2. 添加以下3个变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `ALIPAY_APP_ID` | `2021006122604702` | 你的支付宝APPID |
| `ALIPAY_PRIVATE_KEY` | 应用私钥内容 | 见下方格式说明 |
| `ALIPAY_PUBLIC_KEY` | 支付宝公钥内容 | 见下方格式说明 |

### 步骤2：准备私钥内容

#### 应用私钥 (ALIPAY_PRIVATE_KEY)

1. 打开文件：`D:\Users\WONGHANLING\Documents\支付宝开放平台密钥工具\密钥20251226120724\应用私钥RSA2048-敏感数据，请妥善保管.txt`

2. 文件内容类似：
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
（很多行）
...xxx
-----END PRIVATE KEY-----
```

3. **去掉第一行和最后一行**，只保留中间的密钥内容

4. **把所有换行符删除**，变成一行连续的字符串

5. 最终格式应该是：
```
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...（一长串，没有换行）
```

#### 支付宝公钥 (ALIPAY_PUBLIC_KEY)

1. 打开支付宝开放平台 → 你的应用 → 开发设置
2. 点击"下载支付宝公钥"按钮
3. 同样去掉 `-----BEGIN PUBLIC KEY-----` 和 `-----END PUBLIC KEY-----`
4. 去掉所有换行，变成一行

### 步骤3：部署

1. 推送代码到GitHub
```bash
git add .
git commit -m "feat: 添加支付宝支付功能"
git push
```

2. Vercel会自动部署

### 步骤4：配置支付宝回调地址

部署完成后，在支付宝开放平台配置回调地址：

1. 进入你的应用 → 开发设置
2. 找到"授权回调地址"或"接口加签方式"下方
3. 添加你的Vercel域名：
   - 异步通知地址：`https://your-app.vercel.app/api/payment/notify`
   - 同步跳转地址：`https://your-app.vercel.app/payment/return`

## 🧪 本地测试

### 方法1：使用沙箱环境（推荐测试）

1. 在支付宝开放平台切换到沙箱环境
2. 获取沙箱的APPID和密钥
3. 下载支付宝沙箱APP进行测试

### 方法2：使用正式环境

注意：本地测试时，支付宝无法回调到localhost，需要：
- 使用ngrok等内网穿透工具
- 或者直接部署到Vercel测试

## 📂 项目文件结构

```
app/
├── api/
│   └── payment/
│       ├── create/
│       │   └── route.ts          # 创建支付订单API
│       └── notify/
│           └── route.ts          # 支付宝异步回调API
├── checkout/
│   └── page.tsx                  # 结账页面
└── payment/
    └── return/
        └── page.tsx              # 支付成功/失败页面

lib/
└── alipay.ts                     # 支付宝工具类

types/
└── order.ts                      # 订单类型定义
```

## 🔄 支付流程

1. 用户添加商品到购物车
2. 点击"去结算" → 跳转到结账页 (`/checkout`)
3. 填写收货信息，点击"提交订单并支付"
4. 调用 `/api/payment/create` 创建支付订单
5. **PC端**：跳转到支付宝页面，显示二维码
6. **移动端**：唤起支付宝APP
7. 用户完成支付
8. 支付宝异步通知 `/api/payment/notify`
9. 用户跳转回 `/payment/return` 显示支付结果

## ⚠️ 注意事项

1. **密钥安全**：
   - 绝对不要把`.env.local`文件提交到Git
   - 私钥只配置在Vercel环境变量中

2. **HTTPS要求**：
   - 支付宝回调URL必须是HTTPS
   - Vercel自动提供HTTPS

3. **域名白名单**：
   - 在支付宝后台配置授权域名

4. **数据库**：
   - 当前代码未连接数据库
   - 建议后续集成Supabase存储订单信息

## 🐛 常见问题

### Q: 提示"签名错误"
A: 检查私钥格式是否正确，确保去掉了首尾的标记，且没有换行

### Q: 支付后没有回调
A: 检查支付宝后台是否正确配置了回调地址，且域名可访问

### Q: 本地测试无法回调
A: 支付宝无法回调到localhost，请部署到Vercel测试

## 📞 技术支持

如有问题，可以查看：
- [支付宝开放平台文档](https://opendocs.alipay.com/)
- [Next.js API Routes文档](https://nextjs.org/docs/api-routes/introduction)
