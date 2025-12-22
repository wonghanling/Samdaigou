const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// 处理 178.jpg 到 180.jpg
const images = ['178.jpg', '179.jpg', '180.jpg'];

async function convertImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputFilename = filename.replace('.jpg', '.webp');
  const outputPath = path.join(publicDir, outputFilename);

  if (!fs.existsSync(inputPath)) {
    console.log(`⏭️  跳过: ${filename} (文件不存在)`);
    return false;
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
    return true;
  } catch (error) {
    console.error(`❌ 处理失败 ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log(`开始转换图片 178.jpg 到 180.jpg...\n`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (const filename of images) {
    const result = await convertImage(filename);

    if (result === true) {
      successCount++;
    } else if (result === false && !fs.existsSync(path.join(publicDir, filename))) {
      skipCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ 转换完成!`);
  console.log(`✅ 成功: ${successCount} 张`);
  console.log(`⏭️  跳过: ${skipCount} 张`);
  console.log(`❌ 失败: ${failCount} 张`);
  console.log('='.repeat(50));
}

main();
