import { throttle } from 'throttle-debounce';

// виборка елементів
const form = document.querySelector('.js-feedback-form');
const input = document.querySelector('.js-input');
const textarea = document.querySelector('.js-textarea');

// навішування прослуховувачів
form.addEventListener('input', throttle(500, onLocalStorageSet));
form.addEventListener('submit', onFormSubmit);

// код
let formData = {};
lastFormInput(); // функція відновлює останні дані, що було до перезавантаження сторінки

// сет функцій
function onLocalStorageSet(evt) {
  formData[evt.target.name] = evt.target.value; //зберігаємо введені дані як властивість у об'єкт
  localStorage.setItem('feedback-form-state', JSON.stringify(formData)); //записуємо отримані дані в локал Сторедж
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const outputDataToConsol = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  console.log(outputDataToConsol);

  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {};
}

function lastFormInput() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const obj = JSON.parse(savedData);
    if (obj.email) {
      input.value = obj.email;
      formData.email = obj.email;
    }
    if (obj.message) {
      textarea.value = obj.message;
      formData.message = obj.message;
    }
  }
}
