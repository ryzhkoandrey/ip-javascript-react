'use strict';

const checkbox = document.querySelector('#checkbox');
const form = document.querySelector('form');
const change = document.querySelector('#color');

if (localStorage.getItem('isChecked')) {
   checkbox.checked = true;
}

checkbox.addEventListener('change', () => {
   localStorage.setItem('isChecked', true);
});

change.addEventListener('click', () => {

});