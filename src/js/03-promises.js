import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';


// Form and its inputs

const form = document.querySelector('.form');

const firstDelayMs = document.querySelector('[name="delay"]');
const delayStepMs = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

// Event listener after submitting the form

form.addEventListener('submit', submitCreatePromises);

// Loop to create promises from function createPromise after event listener

function submitCreatePromises(e) {

  e.preventDefault();

  let delay = firstDelayMs.valueAsNumber;
  const delayStepMsVal = delayStepMs.valueAsNumber;
  const amountVal = amount.valueAsNumber;

  for (let i = 1; i <= amountVal; i++) {
    createPromise(i, delay)
      .then({ i, delay })
      .catch({ i, delay });
    delay += delayStepMsVal;
  }
}

//function createPromise with Notiflix notifications

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${[position]} in ${delay}ms`
        );
      } else {
        reject({ position, delay });
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      }
    }, delay);
  });
}
