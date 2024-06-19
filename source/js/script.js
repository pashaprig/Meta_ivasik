class App {
  constructor() {
    // Возможно, здесь могут быть инициализации или объявления переменных
  }

  init() {
    this.afterVideoPlay();
    this.onButtonPlay();
    this.modal1();
  }

  afterVideoPlay() {
    // Можно добавить логику для обработки после воспроизведения видео
  }

  onButtonPlay() {
    // Можно добавить логику для обработки нажатия кнопки воспроизведения
  }

  modal1() {
    const loader = document.querySelector('[aria-modal="loader"]');
    const video1 = document.querySelector('[aria-video="1"]');
    const btnPlay = document.querySelector('[aria-sound="on"]')
    const header = document.querySelector('.modal__header')

    setTimeout(() => {
      header.textContent = "Соединение успешно";
      btnPlay.classList.remove('visually-hidden')
    }, 1500);

    const play = () => {
      loader.classList.add('hidden');
      video1.muted = false;
      video1.play();

      setTimeout(() => {
        loader.classList.add('visually-hidden');
      }, 500);
    }

    btnPlay.addEventListener('click', play)

  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
