'use strict';

const checkbox = document.querySelector('#checkbox');
const wrapper = document.querySelector('.wrapper');
const change = document.querySelector('#color');

if (localStorage.getItem('isChecked')) {
   checkbox.checked = true;
}

if (localStorage.getItem('bg')) {
   wrapper.style.backgroundColor = 'blue';
} else {
   wrapper.style.backgroundColor = '';
}

checkbox.addEventListener('change', () => {
   localStorage.setItem('isChecked', true);
});

change.addEventListener('click', () => {
   if (localStorage.getItem('bg')) {
      localStorage.removeItem('bg');
      wrapper.style.backgroundColor = '';
   } else {
      localStorage.setItem('bg', 'changed');
      wrapper.style.backgroundColor = 'blue';
   }
});

const persone = {
   name: 'Andrey',
   age: 37,
}

const serializedPerson = JSON.stringify(persone);
localStorage.setItem('andrey', serializedPerson);

console.log(JSON.parse(localStorage.getItem('andrey')));