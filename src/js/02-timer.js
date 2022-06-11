import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateChosen = document.querySelector('#datetime-picker');
const d = document.querySelector('[data-days]');
const h = document.querySelector('[data-hours]');
const m = document.querySelector('[data-minutes]');
const s = document.querySelector('[data-seconds]');

let timer = null;

startBtn.disabled = true;

//flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    // const currentDate = new Date();
    if (selectedDate[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;

      startBtn.addEventListener('click', countdownTime);

      // time counter

      function countdownTime() {
        timer = setInterval(() => {
          startBtn.disabled = true;

          // https://stackoverflow.com/questions/4310953/invalid-date-in-safari

          const dateChoosenMs = new Date(dateChosen.value.replace(/-/g, '/')).getTime();
          const now = new Date().getTime();
          const timeLeft = dateChoosenMs - now;

          const { days, hours, minutes, seconds } = convertMs(timeLeft);

          d.innerHTML = days < 10 ? addLeadingZero(days) : days;
          h.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
          m.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
          s.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

          if (timeLeft < 1000) {
            clearInterval(timer);
            startBtn.disabled = false;
          }
        }, 1000);
      }

      // addLeadingZero

      function addLeadingZero(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
      }

      // convert 
      
      function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
      }
    }
  },
};

flatpickr(dateChosen, options);
