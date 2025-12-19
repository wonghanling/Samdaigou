const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const inputPath = path.join(publicDir, '15.jpg');
const outputPath = path.join(publicDir, '15.webp');

async function convertImage() {
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

    console.log(`✅ 15.jpg -> 15.webp`);
    console.log(`   压缩率: ${reduction}% (${(inputSize / 1024).toFixed(2)}KB -> ${(outputSize / 1024).toFixed(2)}KB)`);
  } catch (error) {
    console.error(`❌ 处理失败:`, error.message);
  }
}

convertImage();
