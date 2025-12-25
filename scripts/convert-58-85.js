const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/product-details');

// 只处理 058-085 的 jpg 文件
const files = [];
for (let i = 58; i <= 85; i++) {
  const filename = String(i).padStart(3, '0') + '.jpg';
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
