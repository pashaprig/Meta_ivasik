class App {
  init() {

    this.afterVideoPlay();
    this.onButtonPlay();
    this.modal1()
  }

  constructor() {

  }

  afterVideoPlay() {

  }

  onButtonPlay() {

  }

  modal1() {
    const modal1 = document.querySelector('[aria-modal="modal1"]');
    if (modal1) {
      modal1.classList.remove('hidden', 'visually-hidden');
      setTimeout(() => {
        modal1.classList.add('hidden');
      }, 1500);
      setTimeout(() => {
        modal1.classList.add('visually-hidden');
      }, 2000);
    }
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', app.init());
