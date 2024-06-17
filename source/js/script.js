class App {
  init() {

    this.afterVideoPlay();
    this.onButtonPlay();
  }

  constructor() {
    this.iframe = document.querySelector('iframe');
    this.player = new Vimeo.Player(this.iframe);
    this.btnPlay = document.querySelector('#button-play')
  }



  afterVideoPlay() {
    const vidoWrapper = document.querySelector('.promo__video')

    const onPlay = () => {
      vidoWrapper.style.borderRadius = 'unset';
      this.btnPlay.style.display = 'none'
    };

    this.player.on('play', onPlay);
  }

  onButtonPlay() {
    const playVideo = () => {
      this.player.play()
      this.btnPlay.style.display = 'none'
    }

    this.btnPlay.addEventListener('click', playVideo);
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', app.init());
