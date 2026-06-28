# Telegram Video Downloader Bot 🎥

Telegram бот для скачивания видео со всех популярных соцсетей и видеохостингов.

## Поддерживаемые источники

- ✅ YouTube
- ✅ TikTok
- ✅ Instagram
- ✅ Twitter / X
- ✅ Facebook
- ✅ VK
- ✅ Twitch
- ✅ Reddit
- ✅ и многое другое (yt-dlp поддерживает 1000+ сайтов)

## Требования

- Node.js >= 16
- npm или yarn
- Telegram Bot Token (получить у [@BotFather](https://t.me/botfather))
- FFmpeg (для обработки видео)

## Установка

### 1. Клонируем репозиторий

```bash
git clone https://github.com/artem254351/telegram-video-downloader.git
cd telegram-video-downloader
```

### 2. Устанавливаем зависимости

```bash
npm install
```

### 3. Настраиваем переменные окружения

```bash
cp .env.example .env
```

Отредактируйте `.env` и добавьте ваш токен бота:

```
BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

### 4. Устанавливаем FFmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**Windows:**
Загрузите с https://ffmpeg.org/download.html

### 5. Запускаем бота

```bash
npm start
```

Для разработки с горячей перезагрузкой:

```bash
npm run dev
```

## Использование

1. Найдите бота в Telegram
2. Отправьте команду `/start`
3. Отправьте ссылку на видео
4. Бот скачает и отправит вам видео

## Команды

- `/start` - Начало работы
- `/help` - Справка
- `/quality` - Выбрать качество видео

## Структура проекта

```
.
├── index.js              # Главный файл бота
├── src/
│   ├── handlers.js       # Обработчики команд
│   ├── downloader.js     # Логика скачивания видео
│   └── utils.js          # Вспомогательные функции
├── downloads/            # Папка для сохранения видео
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Лицензия

MIT
