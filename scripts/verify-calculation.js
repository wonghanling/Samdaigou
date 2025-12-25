// 验证计算
// 商品37到106，跳过38和73

let count = 0;
for (let i = 37; i <= 106; i++) {
  if (i !== 38 && i !== 73) {
    count++;
  }
}

console.log(`商品总数: ${count}`);
console.log(`需要的图片数量: ${count * 4}`);
console.log(`起始图片: 0114`);
console.log(`结束图片: ${String(114 + count * 4 - 1).padStart(4, '0')}`);

// 如果到0384，那么实际图片数量是
const actualImages = 384 - 114 + 1;
console.log(`\n实际图片数量(0114-0384): ${actualImages}`);
console.log(`可以分配的商品数: ${Math.floor(actualImages / 4)}`);
console.log(`还剩余图片: ${actualImages % 4}`);
