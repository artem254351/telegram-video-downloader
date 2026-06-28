// Вспомогательные функции

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const extractUrls = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const getSupportedSources = () => {
  return [
    { name: 'YouTube', domain: 'youtube.com' },
    { name: 'TikTok', domain: 'tiktok.com' },
    { name: 'Instagram', domain: 'instagram.com' },
    { name: 'Twitter', domain: 'twitter.com' },
    { name: 'X', domain: 'x.com' },
    { name: 'Facebook', domain: 'facebook.com' },
    { name: 'VK', domain: 'vk.com' },
    { name: 'Twitch', domain: 'twitch.tv' },
    { name: 'Reddit', domain: 'reddit.com' },
  ];
};

module.exports = {
  isValidUrl,
  extractUrls,
  formatFileSize,
  delay,
  getSupportedSources
};
