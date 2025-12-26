import pandas as pd
import json

# 读取Excel文件
df = pd.read_excel('D:\\代账号码\\价格.xlsx')

# 提取价格数据（从索引3开始，对应商品5）
prices = {}
for i in range(3, len(df)):
    product_number = i + 2  # 商品5从索引3开始，所以是i+2
    price = df.iloc[i, 0]
    if pd.notna(price) and product_number <= 152:
        prices[product_number] = float(price)

# 输出价格映射
print(json.dumps(prices, indent=2, ensure_ascii=False))
