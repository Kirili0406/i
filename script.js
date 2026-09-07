// ==========================================
// ЭЛЕМЕНТЫ
// ==========================================

const hero =
    document.getElementById("hero");

const invitation =
    document.getElementById("invitation");

const placesSection =
    document.getElementById("places");

const finalSection =
    document.getElementById("final");


const startButton =
    document.getElementById("startButton");

const yesButton =
    document.getElementById("yesButton");

const maybeButton =
    document.getElementById("maybeButton");


const datePicker =
    document.getElementById("datePicker");

const selectedDateText =
    document.getElementById("selectedDate");


const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalYes =
    document.getElementById("modalYes");


const romanticMusic =
    document.getElementById("romanticMusic");

const musicButton =
    document.getElementById("musicButton");


const againButton =
    document.getElementById("againButton");


const heartsContainer =
    document.getElementById("hearts");


const placeCards =
    document.querySelectorAll(".place-card");


// ==========================================
// ПЕРЕМЕННЫЕ
// ==========================================

let selectedDate = "";

let selectedPlace = "";

let noButtonMoves = 0;


// ==========================================
// МИНИМАЛЬНАЯ ДАТА
// ==========================================

function getToday() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


datePicker.min = getToday();


// ==========================================
// МУЗЫКА
// ==========================================

// Очень тихая музыка
romanticMusic.volume = 0.14;


// ==========================================
// ОТКРЫТЬ ПРИГЛАШЕНИЕ
// ==========================================

startButton.addEventListener(
    "click",
    () => {

        hero.classList.add("hidden");

        invitation.classList.remove("hidden");


        // Запускаем музыку
        romanticMusic.volume = 0.14;

        romanticMusic
            .play()
            .then(() => {

                musicButton.textContent =
                    "🎵";

                musicButton.classList.add(
                    "playing"
                );

            })
            .catch(() => {

                musicButton.textContent =
                    "🔇";

            });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==========================================
// КНОПКА МУЗЫКИ
// ==========================================

musicButton.addEventListener(
    "click",
    () => {

        if (romanticMusic.paused) {

            romanticMusic.volume = 0.14;

            romanticMusic
                .play()
                .then(() => {

                    musicButton.textContent =
                        "🎵";

                    musicButton.classList.add(
                        "playing"
                    );

                });

        } else {

            romanticMusic.pause();

            musicButton.textContent =
                "🔇";

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);


// ==========================================
// ВЫБОР ДАТЫ
// ==========================================

datePicker.addEventListener(
    "change",
    () => {

        selectedDate =
            datePicker.value;

        if (!selectedDate) {

            selectedDateText.textContent =
                "";

            return;
        }


        const date =
            new Date(
                selectedDate +
                "T00:00:00"
            );


        const formatted =
            date.toLocaleDateString(
                "ru-RU",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        selectedDateText.textContent =
            `Ты выбрала: ${formatted} ❤️`;

    }
);


// ==========================================
// ПРОВЕРКА ДАТЫ
// ==========================================

function checkDate() {

    if (!datePicker.value) {

        datePicker.focus();

        datePicker.classList.add(
            "error"
        );


        setTimeout(() => {

            datePicker.classList.remove(
                "error"
            );

        }, 700);


        return false;
    }

    return true;
}


// ==========================================
// КНОПКА ДА
// ==========================================

yesButton.addEventListener(
    "click",
    () => {

        if (!checkDate()) {
            return;
        }


        invitation.classList.add(
            "hidden"
        );

        placesSection.classList.remove(
            "hidden"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==========================================
// КНОПКА НЕТ — УБЕГАЕТ
// ==========================================

function moveNoButton() {

    noButtonMoves++;


    // После нескольких попыток
    // меняем текст
    if (noButtonMoves === 2) {

        maybeButton.textContent =
            "Точно нет? 🥺";

    }

    if (noButtonMoves === 4) {

        maybeButton.textContent =
            "Ну пожалуйста ❤️";

    }

    if (noButtonMoves === 6) {

        maybeButton.textContent =
            "Ты почти нажала 😭";

    }


    // Делаем кнопку fixed
    maybeButton.style.position =
        "fixed";


    const padding = 15;


    const maxX =
        window.innerWidth -
        maybeButton.offsetWidth -
        padding;


    const maxY =
        window.innerHeight -
        maybeButton.offsetHeight -
        padding;


    const randomX =
        padding +
        Math.random() *
        Math.max(
            0,
            maxX - padding
        );


    const randomY =
        padding +
        Math.random() *
        Math.max(
            0,
            maxY - padding
        );


    maybeButton.style.left =
        `${randomX}px`;

    maybeButton.style.top =
        `${randomY}px`;

}


// Компьютер
maybeButton.addEventListener(
    "mouseenter",
    moveNoButton
);


// Дополнительное событие
maybeButton.addEventListener(
    "mouseover",
    moveNoButton
);


// Телефон
maybeButton.addEventListener(
    "touchstart",
    (event) => {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


// ==========================================
// МОДАЛКА
// ==========================================

// Здесь кнопка "Нет" уже практически
// не нажимается, но если событие click
// всё-таки произойдёт — показываем окно.

maybeButton.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "hidden"
        );

    }
);


// ==========================================
// ЗАКРЫТЬ МОДАЛКУ
// ==========================================

closeModal.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);


document
    .querySelector(".modal-background")
    .addEventListener(
        "click",
        () => {

            modal.classList.add(
                "hidden"
            );

        }
    );


// ==========================================
// СОГЛАСИЕ ИЗ МОДАЛКИ
// ==========================================

modalYes.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );


        if (!checkDate()) {
            return;
        }


        invitation.classList.add(
            "hidden"
        );

        placesSection.classList.remove(
            "hidden"
        );


        createManyHearts();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==========================================
// ВЫБОР МЕСТА
// ==========================================

placeCards.forEach(
    (place) => {

        place.addEventListener(
            "click",
            () => {

                placeCards.forEach(
                    (item) => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                place.classList.add(
                    "selected"
                );


                selectedPlace =
                    place.dataset.place;


                setTimeout(
                    showFinal,
                    400
                );

            }
        );

    }
);


// ==========================================
// ФИНАЛ
// ==========================================

function showFinal() {

    const finalDate =
        document.getElementById(
            "finalDate"
        );

    const finalPlace =
        document.getElementById(
            "finalPlace"
        );


    const date =
        new Date(
            selectedDate +
            "T00:00:00"
        );


    const formatted =
        date.toLocaleDateString(
            "ru-RU",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    finalDate.textContent =
        formatted;


    finalPlace.textContent =
        selectedPlace;


    placesSection.classList.add(
        "hidden"
    );

    finalSection.classList.remove(
        "hidden"
    );


    createManyHearts();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// НАЧАТЬ ЗАНОВО
// ==========================================

againButton.addEventListener(
    "click",
    () => {

        finalSection.classList.add(
            "hidden"
        );

        invitation.classList.remove(
            "hidden"
        );


        selectedPlace = "";

        noButtonMoves = 0;


        maybeButton.textContent =
            "Нет 🙈";


        maybeButton.style.position =
            "";

        maybeButton.style.left =
            "";

        maybeButton.style.top =
            "";


        placeCards.forEach(
            (place) => {

                place.classList.remove(
                    "selected"
                );

            }
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==========================================
// СОЗДАНИЕ СЕРДЕЧЕК
// ==========================================

function createHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > .5
            ? "♥️"
            : "♡";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        12 +
        Math.random() * 22 +
        "px";


    heart.style.animationDuration =
        5 +
        Math.random() * 7 +
        "s";


    heart.style.animationDelay =
        Math.random() * 2 +
        "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        14000
    );

}


// Обычные сердечки
setInterval(
    createHeart,
    1400
);


// ==========================================
// МНОГО СЕРДЕЧЕК
// ==========================================

function createManyHearts() {

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 100
        );

    }

}


// ==========================================
// ESC
// ==========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            modal.classList.add(
                "hidden"
            );

        }

    }
);