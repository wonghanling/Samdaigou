// 重新生成，确保最后用到0384
const productIdMap = {
  37: '55', 39: '57', 40: '60', 41: '61', 42: '63', 43: '65', 44: '66',
  45: '67', 46: '68', 47: '69', 48: '70', 49: '72', 50: '73', 51: '74', 52: '75',
  53: '76', 54: '77', 55: '78', 56: '79', 57: '80', 58: '81', 59: '82', 60: '83',
  61: '84', 62: '85', 63: '86', 64: '87', 65: '88', 66: '89', 67: '90', 68: '91',
  69: '92', 70: '93', 71: '94', 72: '95', 74: '97', 75: '98', 76: '99',
  77: '100', 78: '101', 79: '102', 80: '103', 81: '104', 82: '105', 83: '106', 84: '107',
  85: '108', 86: '109', 87: '110', 88: '111', 89: '112', 90: '113', 91: '114', 92: '115',
  93: '116', 94: '117', 95: '118', 96: '119', 97: '120', 98: '121', 99: '122', 100: '123',
  101: '124', 102: '125', 103: '127', 104: '128', 105: '129', 106: '130'
};

let imageIndex = 114;
const mappings = [];
const productList = [];

for (let p = 37; p <= 106; p++) {
  if (p !== 38 && p !== 73) {
    productList.push(p);
  }
}

console.log(`商品列表 (${productList.length}个):`, productList.join(', '));
console.log(`总共需要图片: ${productList.length} × 4 = ${productList.length * 4}`);
console.log(`可用图片: 0114-0384 = ${384-114+1}张`);

// 计算差异
const needed = productList.length * 4;
const available = 384 - 114 + 1;
console.log(`差异: ${needed} - ${available} = ${needed - available}`);

if (needed > available) {
  console.log(`\n需要${needed - available}张额外图片，或者最后${Math.ceil((needed - available) / 4)}个商品需要减少图片数`);
}

// 生成映射，最后一个商品只用到0384
productList.forEach((productNumber, index) => {
  const productId = productIdMap[productNumber];
  const images = [];

  const isLast = (index === productList.length - 1);
  const imageCount = isLast && (imageIndex + 4 > 385) ? (384 - imageIndex + 1) : 4;

  for (let i = 0; i < imageCount && imageIndex <= 384; i++) {
    images.push(String(imageIndex).padStart(4, '0'));
    imageIndex++;
  }

  mappings.push(`  '${productId}': ['${images.join("', '")}'], // 商品${productNumber} (${images.length}张)`);
});

console.log(`\n生成的映射:\n`);
console.log(mappings.join('\n'));
console.log(`\n最后使用的图片: ${String(imageIndex - 1).padStart(4, '0')}`);
