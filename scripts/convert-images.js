const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// 获取所有jpg和png图片
const imageFiles = fs.readdirSync(publicDir).filter(file =>
  file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
);

async function convertToWebP() {
  console.log('开始转换图片...\n');

  for (const file of imageFiles) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    try {
      await sharp(inputPath)
        .webp({
          quality: 90, // 高质量，90是很好的平衡点
          lossless: false
        })
        .toFile(outputPath);

      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);

      console.log(`✓ ${file}`);
      console.log(`  原始大小: ${(inputStats.size / 1024).toFixed(2)} KB`);
      console.log(`  WebP大小: ${(outputStats.size / 1024).toFixed(2)} KB`);
      console.log(`  压缩率: ${reduction}%\n`);
    } catch (error) {
      console.error(`✗ 转换失败: ${file}`, error.message);
    }
  }

  console.log('转换完成！');
}

convertToWebP();
