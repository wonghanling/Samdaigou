// 生成商品107-152的详情图片映射（跳过108和116）
// 不使用的图片：0389-0392, 0421-0424

// 商品ID映射表
const productIdMap = {
  107: '131', 108: '132', 109: '133', 110: '134', 111: '135', 112: '136', 113: '137', 114: '138',
  115: '139', 116: '140', 117: '141', 118: '142', 119: '143', 120: '144', 121: '145', 122: '146',
  123: '147', 124: '148', 125: '149', 126: '150', 127: '151', 128: '152', 129: '153', 130: '154',
  131: '155', 132: '156', 133: '158', 134: '159', 135: '160', 136: '161', 137: '162', 138: '163',
  139: '164', 140: '165', 141: '166', 142: '167', 143: '168', 144: '169', 145: '170', 146: '171',
  147: '172', 148: '173', 149: '174', 150: '175', 151: '176', 152: '177'
};

// 禁用的图片范围
const excludedImages = new Set([
  '0389', '0390', '0391', '0392',  // 商品116用了
  '0421', '0422', '0423', '0424'   // 商品108用了
]);

let imageIndex = 385;  // 从0385开始
const mappings = [];

// 从商品107到商品152
for (let productNumber = 107; productNumber <= 152; productNumber++) {
  // 跳过商品108和116（它们已经配置了）
  if (productNumber === 108 || productNumber === 116) {
    console.log(`跳过商品${productNumber}（已配置）`);
    continue;
  }

  const productId = productIdMap[productNumber];
  if (!productId) {
    console.log(`警告：商品${productNumber}没有ID映射`);
    continue;
  }

  const images = [];
  for (let i = 0; i < 4; i++) {
    // 跳过被排除的图片
    while (excludedImages.has(String(imageIndex).padStart(4, '0'))) {
      console.log(`跳过图片 ${String(imageIndex).padStart(4, '0')}（已被使用）`);
      imageIndex++;
    }

    images.push(String(imageIndex).padStart(4, '0'));
    imageIndex++;
  }

  mappings.push(`  '${productId}': ['${images.join("', '")}'], // 商品${productNumber}`);
}

console.log('\n生成的映射代码：\n');
console.log(mappings.join('\n'));
console.log(`\n总共生成了 ${mappings.length} 个商品的映射`);
console.log(`最后使用的图片编号: ${String(imageIndex - 1).padStart(4, '0')}`);
console.log(`商品范围: 107-152 (跳过108和116)`);
