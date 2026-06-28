const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const execPromise = promisify(exec);

const DOWNLOADS_DIR = path.join(__dirname, '..', 'downloads');

// Создаём папку downloads если её нет
(async () => {
  try {
    await fs.mkdir(DOWNLOADS_DIR, { recursive: true });
  } catch (error) {
    console.error('Ошибка при создании папки downloads:', error);
  }
})();

const downloadVideo = async (url) => {
  try {
    const timestamp = Date.now();
    const outputTemplate = path.join(DOWNLOADS_DIR, `video_${timestamp}.%(ext)s`);

    // Команда для скачивания видео с yt-dlp
    // Скачиваем в формате mp4, лучшего качества
    const command = `yt-dlp -f "best[ext=mp4]/best" -o "${outputTemplate}" "${url}" --quiet --no-warnings`;

    console.log(`📥 Скачиваю видео: ${url}`);

    const { stdout, stderr } = await execPromise(command, {
      timeout: 300000, // 5 минут
      maxBuffer: 10 * 1024 * 1024 // 10MB
    });

    // Ищем скачанный файл
    const files = await fs.readdir(DOWNLOADS_DIR);
    const downloadedFile = files
      .filter(f => f.startsWith(`video_${timestamp}`))
      .sort()
      .pop();

    if (!downloadedFile) {
      throw new Error('Видео не было скачано');
    }

    const filePath = path.join(DOWNLOADS_DIR, downloadedFile);
    const stats = await fs.stat(filePath);
    const fileSizeInMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`✅ Видео скачано: ${downloadedFile} (${fileSizeInMB}MB)`);

    return {
      filePath,
      fileName: downloadedFile,
      size: `${fileSizeInMB}MB`,
      title: downloadedFile.replace(`video_${timestamp}.`, '').split('.')[0]
    };
  } catch (error) {
    console.error('❌ Ошибка при скачивании видео:', error.message);
    throw new Error(`Не удалось скачать видео: ${error.message}`);
  }
};

// Очистка старых файлов (старше 24 часов)
const cleanupOldFiles = async () => {
  try {
    const files = await fs.readdir(DOWNLOADS_DIR);
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 часа

    for (const file of files) {
      const filePath = path.join(DOWNLOADS_DIR, file);
      const stats = await fs.stat(filePath);
      const age = now - stats.mtimeMs;

      if (age > maxAge) {
        await fs.unlink(filePath);
        console.log(`🗑️ Удалён старый файл: ${file}`);
      }
    }
  } catch (error) {
    console.error('Ошибка при очистке файлов:', error.message);
  }
};

// Запускаем очистку каждый час
setInterval(cleanupOldFiles, 60 * 60 * 1000);

module.exports = {
  downloadVideo,
  cleanupOldFiles
};
