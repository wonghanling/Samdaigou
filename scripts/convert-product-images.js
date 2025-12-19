const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// 只处理 16-26 的商品图片
const imagesToConvert = [
  '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
  '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg'
];

async function convertImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputFilename = filename.replace('.jpg', '.webp');
  const outputPath = path.join(publicDir, outputFilename);

  if (!fs.existsSync(inputPath)) {
    console.log(`❌ 文件不存在: ${filename}`);
    return;
  }

  try {
    const info = await sharp(inputPath)
      .webp({
        quality: 90,
        lossless: false
      })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = info.size;
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(2);

    console.log(`✅ ${filename} -> ${outputFilename}`);
    console.log(`   压缩率: ${reduction}% (${(inputSize / 1024).toFixed(2)}KB -> ${(outputSize / 1024).toFixed(2)}KB)`);
  } catch (error) {
    console.error(`❌ 处理失败 ${filename}:`, error.message);
  }
}

async function main() {
  console.log('开始转换商品图片 (16-26)...\n');

  for (const filename of imagesToConvert) {
    await convertImage(filename);
  }

  console.log('\n✨ 全部完成!');
}

main();
