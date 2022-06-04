function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const colorValSpan = document.querySelector('.color');

let timerId = null;

const backgroundColorSwitcher = function () {
  body.style.backgroundColor = getRandomHexColor();
  body.style.color = getRandomHexColor();
  colorValSpan.textContent = getRandomHexColor();
};

btnStart.addEventListener('click', () => {
  timerId = setInterval(backgroundColorSwitcher, 1000);
  btnStart.disabled = true;
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
});
