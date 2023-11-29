document.getElementById('completeAdButton').addEventListener('click', function() {
    window.close();
    // Пример: отправка запроса на сервер Python (Telebot) для начисления очков
    fetch('/increase_points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat_id: chatId }), // Замените на фактический chat_id пользователя
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Пример: После успешного запроса, перенаправляем пользователя на телеграмм бот
        window.location.href = 'https://t.me/@Coockie_Clicker_Bot'; // Замените на фактический юзернейм вашего бота
    })
    .catch(error => console.error(error));
});

// Получаем текущий URL
var currentUrl = window.location.href;

// Функция для извлечения параметра из URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Извлекаем chat_id из текущего URL
var chatId = getParameterByName('chat_id', currentUrl);


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
            // По истечении 30 секунд, изменяем заголовок страницы и отправляем сигнал в телеграмм бот
            clearInterval(timerInterval); // Останавливаем таймер
            document.title = "Вознаграждение зачислено!";

            // Пример: отправка сигнала в телеграмм бот
            fetch('/user_activity_signal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: chatId }), // Замените на фактический chat_id пользователя
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        }
    }, 1000);
}

window.onload = function () {
    // Устанавливаем продолжительность таймера в секундах (например, 30 секунд)
    let duration = 3;
    startTimer(duration);
};
