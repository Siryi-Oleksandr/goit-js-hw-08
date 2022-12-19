import throttle from 'lodash.throttle';
// виборка елементів
const form = document.querySelector('.js-feedback-form');
const input = document.querySelector('.js-input');
const textarea = document.querySelector('.js-textarea');

// навішування прослуховувачів
// form.addEventListener('input', throttle(onLocalStorageSet, 500));
form.addEventListener('input', onLocalStorageSet);
form.addEventListener('submit', onFormSubmit);

// код
lastFormInput();
const formData = {};

// сет функцій
function onLocalStorageSet(evt) {
  formData[evt.target.name] = evt.target.value; //зберігаємо введені дані як властивість у об'єкт
  localStorage.setItem('feedback-form-state', JSON.stringify(formData)); //записуємо отримані дані в локал Сторедж
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);

  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function lastFormInput() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const obj = JSON.parse(savedData);
    if (obj.email) {
      input.value = obj.email;
    }
    if (obj.message) {
      textarea.value = obj.message;
    }
  }
}
