import telebot
from flask import Flask, request, jsonify
from telebot import types

app = Flask(__name__)

# Замените 'YOUR_BOT_TOKEN' на токен вашего бота
bot_token = '6487748195:AAGjyQZW6IAt3RuaU88u3HxZDkmkFpBUb1U'
bot = telebot.TeleBot(bot_token)

# Переменная для хранения баланса пользователя (в данном примере - это просто число)
user_balances = {}

@bot.message_handler(commands=['start', 'help'])
def handle_start(message):
    bot.send_message(message.chat.id, "Привет! Это твой рекламный бот. Выбери действие:", reply_markup=get_main_keyboard())

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id
    text = message.text

    if text == 'Смотреть рекламу':
        # Добавлена инлайн-кнопка с ссылкой на рекламный сайт
        keyboard = types.InlineKeyboardMarkup(row_width=1)
        url_button = types.InlineKeyboardButton(text="Смотреть рекламу", url=f"https://fun21game21.github.io/?{chat_id}")
        keyboard.add(url_button)
        bot.send_message(chat_id, "Просмотрите рекламу и заработайте 1р!", reply_markup=keyboard)
    elif text == 'Баланс':
        balance = user_balances.get(chat_id, 0)
        bot.send_message(chat_id, f"Ваш баланс: {balance} очков.")
    else:
        bot.send_message(chat_id, "Я не понимаю. Выбери действие:", reply_markup=get_main_keyboard())

def get_main_keyboard():
    keyboard = telebot.types.ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
    buttons = ["Смотреть рекламу", "Баланс"]
    keyboard.add(*[telebot.types.KeyboardButton(button) for button in buttons])
    return keyboard

@app.route('/increase_points', methods=['POST'])
def increase_points():
    # Здесь добавьте логику для увеличения баланса пользователя
    # В данном примере просто увеличиваем баланс на 10 очков
    chat_id = request.json.get('chat_id')
    user_balances[chat_id] = user_balances.get(chat_id, 0) + 10
    return jsonify({"status": "success"})

@app.route('/user_activity_signal', methods=['POST'])
def user_activity_signal():
    # Здесь добавьте логику для отправки сообщения о зачислении вознаграждения
    chat_id = request.json.get('chat_id')
    user_balances[chat_id] = user_balances.get(chat_id, 0) + 5  # Пример: зачисляем 5 очков
    bot.send_message(chat_id, "Вознаграждение зачислено! Ты заработал еще 5 очков!")
    return jsonify({"status": "success"})

if __name__ == "__main__":
    bot.polling(none_stop=True)
