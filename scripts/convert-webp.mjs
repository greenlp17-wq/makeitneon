import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public/images');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const ext = path.extname(file);
      const webpPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
      
      console.log(`Converting ${file} -> .webp...`);
      try {
        await sharp(fullPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(webpPath);
        
        // Remove original to save space
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

console.log('Starting WebP conversion...');
processDirectory(publicDir).then(() => {
  console.log('Finished!');
});
