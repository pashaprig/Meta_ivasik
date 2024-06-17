// MENU

class App {
  init() {
    this.initMobileMenu();
    this.initRange();
    this.showHideLicense();
    this.scroll();
    this.initSlider();
    this.afterVideoPlay();
    this.onButtonPlay();
  }

  constructor() {
    this.iframe = document.querySelector('iframe');
    this.player = new Vimeo.Player(this.iframe);
    this.btnPlay = document.querySelector('#button-play')
  }

  initMobileMenu() {
    const navMain = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.main-nav__toggle');
    const navButtonText = document.querySelector('.main-nav__open-btn-text');

    const initJS = () => {
      navMain.classList.remove('main-nav--nojs');
    }

    const closeOpen = () => {
      navToggle.addEventListener('click', function () {
        if (navMain.classList.contains('main-nav--closed')) {
          navMain.classList.remove('main-nav--closed');
          navMain.classList.add('main-nav--opened');
          navButtonText.classList.add('visually-hidden');
        } else {
          navMain.classList.add('main-nav--closed');
          navMain.classList.remove('main-nav--opened');
        }
      });
    }

    const linksClick = () => {
      const mainNav = document.querySelector('.main-nav');
      const links = mainNav.querySelectorAll('a');

      const navLinckHandleClick = () => {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }

      links.forEach(link => {
        link.addEventListener('click', navLinckHandleClick)
      })
    }

    initJS();
    closeOpen();
    linksClick();
  }

  initRange() {
    $(function () {
      $(".js-range-slider").ionRangeSlider({
        skin: "round",
        hide_min_max: false,
        hide_from_to: true,
        min: 50000,
        max: 10000000,
        from: 18000,
        postfix: " ₸",
        grid: false,
        onStart: function (data) {
          $("#calcResult").text(data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸');
        },
        onChange: function (data) {
          $("#profitValue").text(Math.round((data.from * 0.32) + data.from).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸');
          $("#calcResult").text(data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸');
        },
      });
    });
    $(function () {
      $(".js-range-slider2").ionRangeSlider({
        skin: "round",
        hide_min_max: false,
        hide_from_to: false,
        min: 1,
        max: 60,
        from: 1,
        postfix: " мес.",
        grid: false,
        onChange: function (data) {
          const summValue = document.querySelector('#profitValue')
          const value = summValue.textContent.slice(0, -1).replace(/ /g, '');
          summValue.textContent = Math.round(Number(value * 1.02).toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₸';
        },
      });
    });
  }

  showHideLicense() {
    const $openBtn = document.querySelector('[data-open-modal]')
    const $closeBtn = document.querySelector('[data-close-modal]')
    const $modal = document.querySelector('[data-modal]')
    const $licenseImg = document.querySelector('.license__img')

    $licenseImg.addEventListener('click', showModal);
    $openBtn.addEventListener('click', showModal);

    function showModal() {
      $modal.showModal();
    }

    $closeBtn.addEventListener('click', () => {
      $modal.close()
    })

    $modal.addEventListener('click', e => {
      const dialogDimentions = $modal.getBoundingClientRect()
      if (
        e.clientX < dialogDimentions.left ||
        e.clientX > dialogDimentions.right ||
        e.clientY < dialogDimentions.top ||
        e.clientY > dialogDimentions.bottom
      ) {
        $modal.close()
      }
    })
  }

  scroll() {
    let scrollToFirst, scrollToSecond, scrollToThird, scrollToLast;
    const deviceWidth = document.documentElement.clientWidth

    if (deviceWidth > 768) {
      // desktop
      scrollToFirst = 4700
      scrollToSecond =4850
      scrollToThird =5000
      scrollToLast =5200
    } else {
      // mobile
      scrollToFirst = 5200
      scrollToSecond =5400
      scrollToThird =5700
      scrollToLast =5900
    }

    const circles = document.querySelectorAll('.start__about')

    function resetColors() {
      circles.forEach(c => { c.classList.remove('start__about--active') })
    }

    window.addEventListener('scroll', () => {
      if (window.pageYOffset < scrollToFirst) {
        resetColors();
        circles[0].classList.add('start__about--active')
      } else if (window.pageYOffset < scrollToSecond) {
        resetColors();
        circles[1].classList.add('start__about--active')
      } else if (window.pageYOffset < scrollToThird) {
        resetColors();
        circles[2].classList.add('start__about--active')
      } else if (window.pageYOffset > scrollToLast) {
        resetColors();
        circles[3].classList.add('start__about--active')
      }
    })

  }

  initSlider() {
    $(function () {
      $('.slider').slick({
        arrows: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              dots: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              dots: true,
            }
          },
        ]
      });
    })
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
