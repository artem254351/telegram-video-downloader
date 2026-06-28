require('dotenv').config();
const { Telegraf } = require('telegraf');
const { downloadVideo } = require('./src/downloader');
const { handleStart, handleHelp } = require('./src/handlers');

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN не установлен в .env файле');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Логирование
bot.use((ctx, next) => {
  console.log(`[${new Date().toISOString()}] ${ctx.from?.username || ctx.from?.id} - ${ctx.message?.text || ctx.message?.type}`);
  return next();
});

// Команды
bot.command('start', handleStart);
bot.command('help', handleHelp);

// Обработчик для ссылок
bot.on('message', async (ctx) => {
  try {
    const text = ctx.message.text;

    // Проверяем, является ли это ссылкой
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);

    if (!urls) {
      return ctx.reply('❌ Пожалуйста, отправьте корректную ссылку на видео');
    }

    const url = urls[0];

    // Проверяем поддерживаемые источники
    const supportedDomains = [
      'youtube.com', 'youtu.be', 'tiktok.com',
      'instagram.com', 'twitter.com', 'x.com',
      'facebook.com', 'vk.com', 'twitch.tv',
      'reddit.com'
    ];

    const isSupported = supportedDomains.some(domain => url.includes(domain));

    if (!isSupported) {
      return ctx.reply(
        '⚠️ Этот источник может быть не поддерживаться. Но я попытаюсь скачать видео...'
      );
    }

    // Отправляем сообщение о загрузке
    const statusMessage = await ctx.reply('⏳ Скачиваю видео...\n\nЭто может занять некоторое время.');

    // Скачиваем видео
    const videoInfo = await downloadVideo(url);

    // Удаляем сообщение о загрузке
    try {
      await ctx.deleteMessage(statusMessage.message_id);
    } catch (e) {
      // Игнорируем ошибки удаления
    }

    // Отправляем видео
    if (videoInfo.filePath) {
      await ctx.replyWithVideo(
        { source: videoInfo.filePath },
        {
          caption: `✅ ${videoInfo.title || 'Видео'}\n\n📊 Размер: ${videoInfo.size}`,
          parse_mode: 'HTML'
        }
      );
    } else {
      await ctx.reply('❌ Не удалось скачать видео. Попробуйте позже.');
    }
  } catch (error) {
    console.error('Ошибка при обработке сообщения:', error.message);
    await ctx.reply(
      `❌ Произошла ошибка: ${error.message}\n\n` +
      'Попробуйте отправить другую ссылку.'
    );
  }
});

// Запуск бота
bot.launch();

console.log('🤖 Бот запущен!');
console.log('Нажмите Ctrl+C для остановки');

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
