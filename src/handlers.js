const handleStart = (ctx) => {
  const startMessage = `🎥 Добро пожаловать в Video Downloader Bot!

Я помогу вам скачать видео со всех популярных соцсетей.

📱 Поддерживаемые источники:
• YouTube
• TikTok
• Instagram
• Twitter / X
• Facebook
• VK
• Twitch
• Reddit
• и многое другое

📝 Просто отправьте ссылку на видео, и я его скачаю!

Звёздная команда:
/help - справка
/quality - выбрать качество`;

  ctx.reply(startMessage);
};

const handleHelp = (ctx) => {
  const helpMessage = `❓ Справка

🔗 Как использовать:
1. Отправьте ссылку на видео
2. Дождитесь загрузки
3. Получите видео

⚙️ Команды:
/start - начало
/help - эта справка

❗️ Важно:
• Убедитесь, что ссылка правильная
• Видео не должно быть защищено авторскими правами
• Размер видео не должен превышать 2GB

💬 При возникновении проблем используйте /start`;

  ctx.reply(helpMessage);
};

module.exports = {
  handleStart,
  handleHelp
};
