import { throttle } from 'throttle-debounce';

// виборка елементів
const form = document.querySelector('.js-feedback-form');

// навішування прослуховувачів
form.addEventListener('input', throttle(500, onLocalStorageSet));
form.addEventListener('submit', onFormSubmit);

// код
lastFormInput(); // функція відновлює останні дані, що було до перезавантаження сторінки

// сет функцій
function onLocalStorageSet(evt) {
  let savedData = localStorage.getItem('feedback-form-state');
  savedData = savedData ? JSON.parse(savedData) : {}; //перевіряємо якщо дані в LocalStorafe є, то перезаписуємо їх, якщо немає, створюємо обєкт з такими властивостями
  savedData[evt.target.name] = evt.target.value; //зберігаємо введені дані як властивість у об'єкт
  localStorage.setItem('feedback-form-state', JSON.stringify(savedData)); //записуємо отримані дані в локал Сторедж
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(form);
  formData.forEach((value, name) => console.log(name, value));

  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function lastFormInput() {
  let savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    savedData = JSON.parse(savedData);
    Object.entries(savedData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
