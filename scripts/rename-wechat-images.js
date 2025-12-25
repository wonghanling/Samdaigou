const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/product-details');

// 获取所有微信图片文件
const files = fs.readdirSync(inputDir)
  .filter(file => file.startsWith('微信图片_') && file.endsWith('_2.jpg'));

// 按文件名中的数字排序
files.sort((a, b) => {
  const numA = parseInt(a.match(/_(\d+)_2\.jpg$/)[1]);
  const numB = parseInt(b.match(/_(\d+)_2\.jpg$/)[1]);
  return numA - numB;
});

console.log(`找到 ${files.length} 个微信图片文件`);
console.log('开始重命名...\n');

// 从 0115 开始重命名
let counter = 115;

files.forEach((oldName) => {
  const oldPath = path.join(inputDir, oldName);
  const newName = String(counter).padStart(4, '0') + '.jpg';
  const newPath = path.join(inputDir, newName);

  try {
    fs.renameSync(oldPath, newPath);
    console.log(`✓ ${oldName} -> ${newName}`);
    counter++;
  } catch (error) {
    console.error(`✗ ${oldName} 重命名失败:`, error.message);
  }
});

console.log(`\n重命名完成！最后一张图片编号: ${String(counter - 1).padStart(4, '0')}.jpg`);
