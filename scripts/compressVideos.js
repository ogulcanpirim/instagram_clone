// compress-videos.js
import { readdir, stat } from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

/*
  ffmpeg is required for this script to work.
  brew install ffmpeg
*/

const execPromise = promisify(exec);

const videosDir = path.resolve('feeds/videos');
const allowedExtensions = ['.mp4', '.mov', '.mkv', '.avi', '.webm'];

async function compressVideo(inputPath) {
  const ext = path.extname(inputPath);
  const tempOutput = inputPath.replace(ext, `_temp${ext}`);

  const cmd = `ffmpeg -y -i "${inputPath}" -vf "scale='min(720,iw)':-2,fps=30" -c:v libx264 -crf 28 -preset veryfast -an "${tempOutput}"`;

  try {
    await execPromise(cmd);
    await execPromise(`mv "${tempOutput}" "${inputPath}"`);
    console.log(`Compressed: ${path.basename(inputPath)}\n`);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  try {
    const files = await readdir(videosDir);
    const videoFiles = files
      .filter(f => allowedExtensions.includes(path.extname(f).toLowerCase()))
      .map(f => path.join(videosDir, f));

    if (videoFiles.length === 0) {
      return;
    }

    for (const file of videoFiles) {
      const fileStats = await stat(file);
      console.log(
        `Original size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`,
      );
      await compressVideo(file);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
