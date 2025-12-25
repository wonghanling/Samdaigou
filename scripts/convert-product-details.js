const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/product-details');
const files = fs.readdirSync(inputDir);

// 过滤出图片文件
const imageFiles = files.filter(file =>
  file.match(/\.(jpg|jpeg|png)$/i) && !file.startsWith('.')
);

console.log(`找到 ${imageFiles.length} 个图片文件待处理`);

async function convertImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    try {
      await sharp(inputPath)
        .webp({ quality: 90 })
        .toFile(outputPath);

      console.log(`✓ ${file} -> ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`✗ ${file} 转换失败:`, error.message);
    }
  }

  console.log('\n转换完成！');
}

convertImages();
