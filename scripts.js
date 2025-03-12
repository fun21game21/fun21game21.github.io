function openModal(type, icon) {
    const modalTelegram = document.getElementById('modal-telegram');
    const modalComponents = document.getElementById('modal-components');
    const modalGames = document.getElementById('modal-games');
    const modalResultEge = document.getElementById('modal-result_ege');
    const modalContentTelegram = document.getElementById('modal-content-telegram');
    const modalContentComponents = document.getElementById('modal-content-components');
    const modalContentGames = document.getElementById('modal-content-games');
    const modalContentResultEge = document.getElementById('modal-content-result_ege');

    let modal, modalContent;

    if (type === 'telegram') {
        modal = modalTelegram;
        modalContent = modalContentTelegram;
    } else if (type === 'components') {
        modal = modalComponents;
        modalContent = modalContentComponents;
    } else if (type === 'games') {
        modal = modalGames;
        modalContent = modalContentGames;
    } else if (type === 'result_ege') {
        modal = modalResultEge;
        modalContent = modalContentResultEge;
    }

    const iconRect = icon.getBoundingClientRect();
    const modalWidth = modalContent.offsetWidth;
    const modalHeight = modalContent.offsetHeight;

    // Устанавливаем позицию модального окна в зависимости от иконки
    modalContent.style.left = `${iconRect.left + iconRect.width / 2 - modalWidth / 2}px`;
    modalContent.style.top = `${iconRect.top - modalHeight - 10}px`;

    modal.style.display = "block"; // Показать модальное окно
    setTimeout(() => {
        modalContent.classList.add('show'); // Добавить класс show для анимации
    }, 10); // Небольшая задержка для анимации
}

function closeModal(type) {
    const modalContentTelegram = document.getElementById('modal-content-telegram');
    const modalContentComponents = document.getElementById('modal-content-components');
    const modalContentGames = document.getElementById('modal-content-games');
    const modalContentResultEge = document.getElementById('modal-content-result_ege');

    if (type === 'telegram') {
        modalContentTelegram.classList.remove('show'); // Удалить класс show для анимации
        setTimeout(() => {
            document.getElementById('modal-telegram').style.display = "none"; // Скрыть модальное окно после анимации
        }, 300); // Подождать завершения анимации
    } else if (type === 'components') {
        modalContentComponents.classList.remove('show'); // Удалить класс show для анимации
        setTimeout(() => {
            document.getElementById('modal-components').style.display = "none"; // Скрыть модальное окно после анимации
        }, 300); // Подождать завершения анимации
    } else if (type === 'games') {
        modalContentGames.classList.remove('show'); // Удалить класс show для анимации
        setTimeout(() => {
            document.getElementById('modal-games').style.display = "none"; // Скрыть модальное окно после анимации
        }, 300); // Подождать завершения анимации
    } else if (type === 'result_ege') {
        modalContentResultEge.classList.remove('show'); // Удалить класс show для анимации
        setTimeout(() => {
            document.getElementById('modal-result_ege').style.display = "none"; // Скрыть модальное окно после анимации
        }, 300); // Подождать завершения анимации
    }
}

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        closeModal('telegram'); // Закрыть модальное окно при клике вне его
        closeModal('components'); // Закрыть модальное окно при клике вне его
        closeModal('games'); // Закрыть модальное окно при клике вне его
        closeModal('result_ege'); // Закрыть модальное окно при клике вне его
    }
}

// script.js
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const container = document.querySelector('.container'); // Получаем основной блок

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    container.classList.toggle('dark-theme'); // Добавляем переключение класса для контейнера
    container.classList.toggle('light-theme'); // Добавляем переключение класса для контейнера
});
