const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Переменная для хранения баланса пользователя (в данном примере - это просто число)
const userBalances = {};

// Настройка парсера для POST-запросов
app.use(bodyParser.json());

// Запуск телеграм-бота
// Вам нужно будет подключить свой телеграм-бот и заменить <YOUR_BOT_TOKEN> на реальный токен
const TELEGRAM_BOT_TOKEN = '6487748195:AAGjyQZW6IAt3RuaU88u3HxZDkmkFpBUb1U';
const TELEGRAM_API_BASE_URL = 'https://api.telegram.org/bot$6487748195:AAGjyQZW6IAt3RuaU88u3HxZDkmkFpBUb1U';

// Обработка команды /start и /help
app.post('/start', (req, res) => {
  const chatId = req.body.message.chat.id;
  sendTelegramMessage(chatId, 'Привет! Это твой рекламный бот. Выбери действие:', getMainKeyboard());
  res.sendStatus(200);
});

// Обработка текстовых сообщений
app.post('/message', (req, res) => {
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  if (text === 'Смотреть рекламу') {
    const inlineKeyboard = {
      inline_keyboard: [
        [{ text: 'Смотреть рекламу', url: 'https://fun21game21.github.io/?${chatId}' }]
      ]
    };
    sendTelegramMessage(chatId, 'Просмотрите рекламу и заработайте 1р!', inlineKeyboard);
  } else if (text === 'Баланс') {
    const balance = userBalances[chatId] || 0;
    sendTelegramMessage(chatId, 'Ваш баланс: ${balance} очков.');
  } else {
    sendTelegramMessage(chatId, 'Я не понимаю. Выбери действие:', getMainKeyboard());
  }

  res.sendStatus(200);
});

// Обработка сигнала о зачислении вознаграждения
app.post('/user_activity_signal', (req, res) => {
  const chatId = req.body.chat_id;
  userBalances[chatId] = (userBalances[chatId] || 0) + 1;
  sendTelegramMessage(chatId, 'Вознаграждение зачислено! Ты заработал еще 1 очко!');
  res.json({ status: 'success' });
});

// Функция для отправки сообщения в телеграм
function sendTelegramMessage(chatId, text, replyMarkup) {
  const params = { chat_id: chatId, text };
  if (replyMarkup) {
    params.reply_markup = JSON.stringify(replyMarkup);
  }
  axios.post('${TELEGRAM_API_BASE_URL}/sendMessage', params);
}

// Функция для получения клавиатуры
function getMainKeyboard() {
  return {
    keyboard: [
      [{ text: 'Смотреть рекламу' }, { text: 'Баланс' }]
    ],
    resize_keyboard: true
  };
}

// Запуск сервера
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});
