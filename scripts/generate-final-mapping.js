// 正确的映射：商品37只有3张，其他都是4张
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

for (let productNumber = 37; productNumber <= 106; productNumber++) {
  // 跳过商品38和73
  if (productNumber === 38 || productNumber === 73) {
    continue;
  }

  const productId = productIdMap[productNumber];
  const images = [];

  // 商品37只有3张图片，其他都是4张
  const imageCount = (productNumber === 37) ? 3 : 4;

  for (let i = 0; i < imageCount; i++) {
    images.push(String(imageIndex).padStart(4, '0'));
    imageIndex++;
  }

  mappings.push(`  '${productId}': ['${images.join("', '")}'], // 商品${productNumber}`);
}

console.log('生成的映射代码：\n');
console.log(mappings.join('\n'));
console.log(`\n最后使用的图片编号: ${String(imageIndex - 1).padStart(4, '0')}`);
console.log(`总共映射了 ${mappings.length} 个商品`);
