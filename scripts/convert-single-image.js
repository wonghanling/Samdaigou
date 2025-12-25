const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 这个脚本用于转换单张图片
const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('用法: node convert-single-image.js <输入路径> <输出路径>');
  process.exit(1);
}

async function convertImage() {
  try {
    await sharp(inputPath)
      .webp({ quality: 90 })
      .toFile(outputPath);

    console.log(`✓ 转换成功: ${outputPath}`);
  } catch (error) {
    console.error('转换失败:', error.message);
  }
}

convertImage();
