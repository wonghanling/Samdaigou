const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/product-details');

// 处理 086-099 (3位) 和 0100-0113 (4位)
const files = [];

// 086-099
for (let i = 86; i <= 99; i++) {
  const filename = String(i).padStart(3, '0') + '.jpg';
  const filepath = path.join(inputDir, filename);
  if (fs.existsSync(filepath)) {
    files.push(filename);
  }
}

// 0100-0113
for (let i = 100; i <= 113; i++) {
  const filename = String(i).padStart(4, '0') + '.jpg';
  const filepath = path.join(inputDir, filename);
  if (fs.existsSync(filepath)) {
    files.push(filename);
  }
}

console.log(`找到 ${files.length} 个需要转换的 jpg 文件`);

async function convertImages() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, file.replace('.jpg', '.webp'));

    try {
      await sharp(inputPath)
        .webp({ quality: 95 }) // 超清质量
        .toFile(outputPath);

      console.log(`✓ ${file} -> ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`✗ ${file} 转换失败:`, error.message);
    }
  }

  console.log('\n转换完成！');
}

convertImages();
