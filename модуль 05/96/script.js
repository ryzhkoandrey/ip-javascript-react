'use strict';

// new RegExp('pattern', 'flags');
// /pattern/f

// const ans = prompt('Введите ваше число');

// const reg = /\d/g;
// console.log(ans.match(reg));

const str = 'My name is R2D2';

console.log(str.match(/\w\d\w\d/i));

// \D
// \W
// \S

// \d
// \w
// \s

// i
// g
// m

// console.log(ans.search(reg));
// console.log(ans.match(reg));

// const pass = prompt('Password');

// console.log(pass.replace(/./g, '*'));

// console.log('12-24-36'.replace(/-/g, ':'));