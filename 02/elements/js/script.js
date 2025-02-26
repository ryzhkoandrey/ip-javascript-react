'use strict';

const hearts = document.querySelectorAll('.heart');

console.log(hearts);

hearts.forEach(item => {
   item.classList.replace('heart', 'circle');
});