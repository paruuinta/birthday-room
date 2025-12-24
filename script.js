let typingInterval = null;

const texts = {
  balloons: "Воздушные шарики для самого праздничного настроения!",
  fly: "Упс!!! Небольшой летящий сюрприз. Кто её сюда пустил?",
  macbook: "Почему он сегодня включён? Давай закрывай, сегодня у тебя компьютерный детокс!",
  note: "Записка? Кажется там написано, что я люблю тебя Ванечка!",
  piano: "Что? Прямо сейчас хочешь написать музыкальный шедевр? Отличная идея!! Когда новый альбом?",
  socrates: "Бюст Сократа в твоей панамке. Может пусть Сократ в панамке поработает завтра вместо тебя?",
  sun: "Солнце светит почти так же ярко как твоя улыбка. Кстати, я обожаю твою улыбку!!",
  tea: "Святая кружка чая! Без неё ни один день не начинается правильно. Интересно, какое сегодня послание?",
  trash: "Мусорное ведро для твоих точных бросков, баскетбольное прошлое даёт о себе знать"
};

document.addEventListener('DOMContentLoaded', () => {

  // ====== ЭЛЕМЕНТЫ СЦЕН ======
  const introScreen = document.getElementById('intro-screen');
  const enterButton = document.getElementById('enter-room');
  const mainScene = document.getElementById('main-scene');
  const fadeOverlay = document.getElementById('fade');
  const transitionSound = document.getElementById('transition-sound');
  const bgMusic = document.getElementById('background-music');
  const closeButton = document.getElementById('close-button');
  const finalScreen = document.getElementById('final-screen');
  const finalSound = new Audio('sounds/door.mp3');
  const hotspots = document.querySelectorAll('.hotspot');
  const textBox = document.querySelector('.text-box');
  const textContent = document.getElementById('text-content');
  const typeSound = new Audio('sounds/type.mp3');

  // ====== ПЕРЕХОД ИНТРО → КОМНАТА И ЗАПУСК МУЗЫКИ ======
  enterButton.addEventListener('click', () => {
    // Запускаем музыку один раз после клика
    bgMusic.volume = 0.3;
    bgMusic.loop = true;
    bgMusic.play();

    // Переход сцены
    fadeOverlay.classList.add('active');
    transitionSound.currentTime = 0;
    transitionSound.play();

    setTimeout(() => {
      introScreen.classList.remove('active');
      mainScene.classList.add('active');
      closeButton.style.display = 'block';
    }, 800);

    setTimeout(() => {
      fadeOverlay.classList.remove('active');
    }, 1200);
  });

  // ====== ИНТЕРАКТИВНЫЕ ОБЪЕКТЫ С ДВАЖДЫ ЗВУКОМ ======
 hotspots.forEach(h => {
  h.addEventListener('click', () => {

    // Останавливаем предыдущую печать
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }

    const id = h.dataset.id;
    const text = texts[id];

    if (!text) return;

    textBox.classList.add('show');
    textContent.textContent = '';

    // Воспроизводим звук печатной машинки дважды
    const typeSound1 = new Audio('sounds/type.mp3');
    typeSound1.play();

    setTimeout(() => {
      const typeSound2 = new Audio('sounds/type.mp3');
      typeSound2.play();
    }, 300); // повтор через 0.3 секунды

    // Печатаем текст по буквам
    let i = 0;
    typingInterval = setInterval(() => {
      textContent.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typingInterval);
        typingInterval = null;
      }
    }, 30);
  });
});

  // ====== КРЕСТИК И ФИНАЛ ======
  closeButton.addEventListener('click', () => {
    fadeOverlay.classList.add('active');
    finalSound.currentTime = 0;
    finalSound.play();

    textBox.classList.remove('show');
    textContent.textContent = '';

    setTimeout(() => {
      mainScene.classList.remove('active');
      finalScreen.classList.add('active');
      closeButton.style.display = 'none';
    }, 800);

    setTimeout(() => {
      fadeOverlay.classList.remove('active');
    }, 1200);
  });

});