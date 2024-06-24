class App {
  constructor() {
    this.step = 0

    this.form = document.querySelector('[aria-modal="form"]')
    this.inputs = this.form.querySelectorAll('input:not([type="hidden"])')

    this.buttonSbm = this.form.querySelector('[aria-input="submitBtn"]')

    this.firstname = this.form.querySelector('[aria-input="firstname"]')
    this.lastname = this.form.querySelector('[aria-input="lastname"]')
    this.email = this.form.querySelector('[aria-input="email"]')

    this.loader = document.querySelector('[aria-modal="loader"]');

    this.videos = document.querySelectorAll('[aria-video*="video"]');
    this.video1 = document.querySelector('[aria-video="video-1"]');
    this.video2 = document.querySelector('[aria-video="video-2"]');
    this.video3a = document.querySelector('[aria-video="video-3a"]');
    this.video3b = document.querySelector('[aria-video="video-3b"]');
    this.video4 = document.querySelector('[aria-video="video-4"]');
    this.video5 = document.querySelector('[aria-video="video-5"]');
    this.video6 = document.querySelector('[aria-video="video-6"]');
    this.video7 = document.querySelector('[aria-video="video-7"]');

    this.btnSoundOn = document.querySelector('[aria-sound="on"]')
    this.header = document.querySelector('.modal__header')
  }

  init() {
    this.validation();
    this.unmuteAllVideos();
    this.step0();
    this.hendleNextBtnClick();
  }

  setBtnColor(inputsWrapper) {
    const inputs = inputsWrapper.map((iw) => iw.childNodes[1])

    const toggleBtnDisabled = (button, shouldDisable) => {
      button.disabled = shouldDisable;
    };

    inputs.forEach(input => {
      input.addEventListener('keyup', () => {
        const hasError = Array.from(inputs).some(input => input.classList.contains('error'));
        toggleBtnDisabled(this.buttonSbm, hasError);
      });

      input.addEventListener('blur', () => {
        const hasError = Array.from(inputs).some(input => input.classList.contains('error'));
        toggleBtnDisabled(this.buttonSbm, hasError);
      });
    });
  }

  unmuteAllVideos() {
    this.btnSoundOn.addEventListener('click', () => {
      this.videos.forEach(video => {
        video.muted = false;
      });
    })
  }

  hendleNextBtnClick() {
    const checkStep = (step) => {
      switch (step) {
        case 1:
          console.log('Шаг 1');
          this.step1()
          break;
        case 2:
          console.log('Шаг 2');
          break;
        case 3:
          console.log('Шаг 3');
          break;
        default:
          console.log('Неизвестный шаг');
          break;
      }
    }

    this.buttonSbm.addEventListener('click', () => { checkStep(this.step) })
  }


  step0() {
    this.setBtnColor([this.firstname, this.lastname]);

    setTimeout(() => {
      this.header.textContent = "Соединение успешно установлено";
      this.show(this.btnSoundOn);
    }, 1500);

    this.btnSoundOn.addEventListener('click', () => {
      this.loader.classList.add('hidden');

      // Скрыть телефон
      const iti = this.form.querySelector('.iti');
      this.hide(iti);

      this.play(this.video1);
      this.afterVideoEnd(this.video1, [this.video1], [this.form, this.firstname, this.lastname]);

      setTimeout(() => {
        this.hide(this.loader);
      }, 500);

      this.step = 1;
      this.buttonSbm.setAttribute('step', this.step);
    });
  }

  step1() {
    const inputs = [this.firstname, this.lastname].map((iw) => iw.childNodes[1])

    if (inputs.some(input => !input.value)) {
      setTimeout(() => {
        this.buttonSbm.disabled = true;
      }, 0);

    } else {


      this.hide(this.form)
      this.show(this.video2)
      this.play(this.video2);
      this.afterVideoEnd(this.video2, [this.video2,], [this.form, this.firstname, this.lastname]);

      this.step = 2
      this.buttonSbm.setAttribute('step', this.step)
    }
  }

  hide(el) {
    el.classList.add('visually-hidden')
  }

  show(el) {
    el.classList.remove('visually-hidden')
  }

  play(video) {
    video.play();
  }

  afterVideoEnd(video, toHide = [], toShow = []) {
    video.addEventListener('ended', () => {
      if (toHide.length) {
        toHide.forEach((el) => {
          this.hide(el);
        });
      }

      if (toShow.length) {
        toShow.forEach((el) => {
          this.show(el);
        });
      }
    });
  }

  validation() {
    var input1 = document.querySelector("#phone1");
    var phoneInput1 = window.intlTelInput(input1, {
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      initialCountry: "auto",
      excludeCountries: ["UA"],
      geoIpLookup: function (success, failure) {
        $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
          $("#country1").val(resp.country);
          $("#country2").val(resp.country);
          var countryCode =
            resp && checkCountry(resp.country) ? resp.country : "DE";
          success(countryCode);
        });
      },
    });


    function checkCountry(code) {
      var arr = ["UA"];
      return !arr.includes(code);
    }

    $.validator.addMethod(
      "validNumber",
      function (value, element, params) {
        var obj = params.object;
        if (obj.isValidNumber()) {
          var num = obj.getNumber().replace("+", "");
          $(element)
            .closest("form")
            .find(".hidden-phone")
            .val("+" + num);
        }
        return obj.isValidNumber();
      },
      "Введите правильный номер!"
    );

    function removeExtraSpaces(e) {
      const valueWithoutSpaces = e.target.value.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
      e.target.value = valueWithoutSpaces
    }

    this.firstname.addEventListener("focusout", removeExtraSpaces);
    this.lastname.addEventListener("focusout", removeExtraSpaces);

    $.validator.addMethod(
      "alphanumeric",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Zа-яА-ЯЁё\s]+$/.test(value.replace(/ +/g, ' ').trim());
      },
      "Введите правильное имя"
    );

    $.validator.addMethod(
      "alphanumericLastName",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Zа-яА-ЯЁё\s]+$/.test(value.replace(/ +/g, ' ').trim());
      },
      "Введите правильную фамилию"
    );


    $.validator.addMethod("emailValidation", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9_.!#$%&\'*+\-\/=?^_`{|}~]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,61}$/g.test(value);
    }, "Введите правильный адрес");


    function removeDotsHyphens(e) {
      const valueWithoutDotsHyphens = e.target.value.replace(/\.+/g, '.').replace(/-{2,}/g, '--').replace(/^\.|^-*/, '').replace(/\.@/, '@');
      e.target.value = valueWithoutDotsHyphens;
    }

    this.email.addEventListener("change", removeDotsHyphens);

    $(function () {
      $('input[type=email]').on('keypress', function (e) {
        if (e.which == 32)
          return false;
      });
    });

    $("#leadform1").validate({
      rules: {
        phone1: {
          required: true,
          validNumber: {
            object: phoneInput1,
          },
        },
        firstname: {
          required: true,
          alphanumeric: true,

        },
        lastname: {
          required: true,
          alphanumericLastName: true,
        },
        email: {
          required: true,
          email: false,
          emailValidation: true,
        }
      },
      messages: {
        phone1: {
          required: "Заполните это поле",
        },
        firstname: {
          required: "Заполните это поле",
        },
        lastname: {
          required: "Заполните это поле",
        },
        email: {
          required: "Заполните это поле"
        },
      },
      submitHandler: function (form, event) {
        if ($('.submit_btn').attr('step') !== '7') {
          event.preventDefault();
          return;
        }

        $("#name").val($("#firstName").val() + " " + $("#lastName").val());
        sendAjaxForm(form);
        return false;
      }
    });

    function sendAjaxForm(form) {
      $.ajax({
        url: $(form).attr("action"),
        type: "POST",
        dataType: "json",
        data: $(form).serialize(),
        timeout: 30000,
        beforeSend: function () {
          $(form).find(".submit_btn ").html("Отправление");
          $(form).find(".submit_btn").prop("disabled", true);
        },
      })
        .done(function (response) {
          let result = response;
          let url = result.url;
          if (response.status === "ok") {
            if (typeof sendAnalytics !== "undefined") sendAnalytics();
            $(form).find(".submit_btn").html("Данные отправлены успешно.");
            if (response.url) {
              setTimeout(function () {
                window.location.href = response.url;
              }, 1000);
            } else {
              $(form).html(
                '<div class="form_message success">Ваши данные успешно отправлены. Ожидайте звонка от нашего менеджера.</div>'
              );
            }
          } else {
            $(form).find(".error.form_message").addClass("active");
            $(form).find(".error.form_message").html(response.message);
            $(form)
              .find(".submit_btn ")
              .html("Зарегистрироваться на обучение");
            $(form).find(".submit_btn").prop("disabled", false);
          }
        })
        .fail(function (response) {
          $(form).find(".error.form_message").addClass("active");
          $(form)
            .find(".error.form_message")
            .html("Во время отправки данных произошла ошибка!");
          $(form).find(".submit_btn ").html("Зарегистрироваться на обучение");
          $(form).find(".submit_btn").prop("disabled", false);
        });
    }

    $(window).on("load", function () {
      setTimeout(function () {
        const selectedCountryIso1 = phoneInput1.getSelectedCountryData().iso2;
        if (selectedCountryIso1 === 'at' || selectedCountryIso1 === 'de') {
          var mask1 = jQuery("#phone1").attr("placeholder").replace(/[0-9]/g, 9) + "?9?9";
        } else {
          var mask1 = jQuery("#phone1").attr("placeholder").replace(/[0-9]/g, 9);
        }

        $(document).ready(function () {
          jQuery("#phone1").mask(mask1, {
            autoclear: false
          });
        });

        jQuery("#phone1").on("countrychange", function (e, countryData) {
          jQuery("#phone1").val("");
          const selectedCountryIso1 = phoneInput1.getSelectedCountryData().iso2;
          if (selectedCountryIso1 === 'at' || selectedCountryIso1 === 'de') {
            var mask1 = jQuery("#phone1").attr("placeholder").replace(/[0-9]/g, 9) + "?9?9";
          } else {
            var mask1 = jQuery("#phone1").attr("placeholder").replace(/[0-9]/g, 9);
          }
          jQuery("#phone1").mask(mask1, {
            autoclear: false
          });
        });
      }, 1000);
    });

  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
