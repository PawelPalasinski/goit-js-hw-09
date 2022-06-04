function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const colorValSpan = document.querySelector('.color');

let timerId = null;

// function to switch color to random

const backgroundColorSwitcher = function () {
  body.style.backgroundColor = getRandomHexColor();
  body.style.color = getRandomHexColor();
  colorValSpan.textContent = getRandomHexColor();
};

// start changing color

btnStart.addEventListener('click', () => {
  timerId = setInterval(backgroundColorSwitcher, 1000);
  btnStart.disabled = true;
});

// stop changing color

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
});
