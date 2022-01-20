window.addEventListener('load', () => {
  const fromDays = document.querySelector('.main__tab-days');
  const fromHours = document.querySelector('.main__tab-hours');
  const fromMinutes = document.querySelector('.main__tab-minutes');
  const fromSeconds = document.querySelector('.main__tab-seconds');

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  let totalSeconds = 0;

  let futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 9);

  function init() {
    totalSeconds = Math.floor((futureDate - new Date()) / 1000);
    setTimeLeft();
    let interval = setInterval(() => {
      if (totalSeconds < 0) {
        clearInterval(interval);
      }
      countTime();
    }, 1000);
  }

  function countTime() {
    if (totalSeconds > 0) {
      --timeLeft.seconds;
      if (timeLeft.minutes >= 0 && timeLeft.seconds < 0) {
        timeLeft.seconds = 59;
        --timeLeft.minutes;
        if (timeLeft.hours >= 0 && timeLeft.minutes < 0) {
          timeLeft.minutes = 59;
          --timeLeft.hours;
          if (timeLeft.days >= 0 && timeLeft.hours < 0) {
            timeLeft.hours = 23;
            --timeLeft.days;
          }
        }
      }
    }
    --totalSeconds;
    printTime();
  }

  function printTime() {
    animateFlip(fromDays, timeLeft.days);
    animateFlip(fromHours, timeLeft.hours);
    animateFlip(fromMinutes, timeLeft.minutes);
    animateFlip(fromSeconds, timeLeft.seconds);
  }

  function animateFlip(element, value) {
    const valueInDom = element.querySelector('.number-bottom-back').innerText;
    const currentValue = value < 10 ? '0' + value : '' + value;

    if (valueInDom === currentValue) return;

    element.querySelector('.number-top-back span').innerText = currentValue;
    element.querySelector('.number-bottom-back span').innerText = currentValue;

    gsap.to(element.querySelector('.number-top'), 0.7, {
      rotationX: '-180deg',
      transformPerspective: 300,
      ease: Quart.easeOut,
      onComplete: function () {
        element.querySelector('.number-top').innerText = currentValue;
        element.querySelector('.number-bottom').innerText = currentValue;
        gsap.set(element.querySelector('.number-top'), { rotationX: 0 });
      },
    });

    gsap.to(element.querySelector('.number-top-back'), 0.7, {
      rotationX: 0,
      transformPerspective: 300,
      ease: Quart.easeOut,
      clearProps: 'all',
    });
  }

  function setTimeLeft() {
    timeLeft.days = Math.floor(totalSeconds / (60 * 60 * 24));
    timeLeft.hours = Math.floor((totalSeconds / (60 * 60)) % 24);
    timeLeft.minutes = Math.floor((totalSeconds / 60) % 60);
    timeLeft.seconds = Math.floor(totalSeconds % 60);
  }

  init();
});
