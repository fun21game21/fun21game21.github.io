function getChatIdFromUrl() {
  const url = window.location.href;
  const match = url.match(/\?(\d+)/);
  return match ? match[1] : null;
}

const chatId = Number(getChatIdFromUrl());






 


// Добавляем динамический таймер в title и отправку сигнала через 30 секунд
function startTimer(duration) {
    let timer = duration;
    let timerInterval = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.title = `Таймер: ${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            document.title = "Вознаграждение зачислено!";

            // Функция для отправки сигнала телеграм-боту
    function sendTelegramSignal() {
      const botToken = '6487748195:AAGjyQZW6IAt3RuaU88u3HxZDkmkFpBUb1U';
      const chatId = 'YOUR_CHAT_ID';
      const signalUrl = `http://192.168.0.29:8908/user_activity_signal`;
  
      // Отправляем POST-запрос на сервер Flask
      fetch(signalUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chat_id: chatId }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    }
            sendTelegramSignal();
            
            
            // Пример: отправка сигнала в телеграмм бот
            // fetch('/user_activity_signal', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ chat_id: chatId }), // Замените на фактический chat_id пользователя
            // })
            // .then(response => response.json())
            // .then(data => console.log(data))
            // .catch(error => console.error(error));
            // document.title = chatId;
            // window.close();
        }
    }, 1000);
}
document.getElementById('completeAdButton').addEventListener('click', function() {
    sendTelegramSignal();

    window.close();
});

window.onload = function () {
    // Устанавливаем продолжительность таймера в секундах (например, 30 секунд)
    let duration = 3;
    startTimer(duration);
};
