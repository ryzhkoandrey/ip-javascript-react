'use strict';

const box = document.getElementById('box');
const btns = document.getElementsByTagName('button');
const circles = document.getElementsByClassName('circle');
const wrapper = document.querySelector('.wrapper');
const hearts = wrapper.querySelectorAll('.heart');

box.style.backgroundColor = 'green';
box.style.width = '300px';
box.style.cssText = 'background-color: blue; width: 500px';

btns[1].style.borderRadius = '150px';
btns[1].style.backgroundColor = 'blue';

circles[0].style.backgroundColor = 'orange';

for (let i = 0; i < circles.length; i++) {
   circles[i].style.backgroundColor = 'green';
}

hearts.forEach(heart => {
   heart.style.backgroundColor = 'black';
});

///////////////////////////////////////////////////

// const text = document.createTextNode('Тут был я');

const div = document.createElement('div');
div.classList.add('black');

wrapper.append(div);
// wrapper.appendChild(div);

// wrapper.prepend(div);

// hearts[0].before(div);
// hearts[0].after(div);

// wrapper.insertBefore(div, hearts[0]);

// circles[0].remove();
// wrapper.removeChild(hearts[1]);

// circles[0].replaceWith(div);
// wrapper.replaceChild(div, hearts[0]);

div.innerHTML = '<h1>Hello world!</h1>';

// div.textContent = "Hello";

div.insertAdjacentHTML('beforebegin', '<h2>Hello</h2>');