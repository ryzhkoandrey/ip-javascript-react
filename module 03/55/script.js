'use strict';

const boxesQuery = document.querySelectorAll('.box');
const boxesGet = document.getElementsByClassName('box');

boxesQuery.forEach((box) => {
   if (box.matches('.this')) {
      console.log(box);
   }
});

console.log(boxesQuery[0].closest('.wrapper'));

// boxesQuery[0].remove();
// boxesGet[0].remove();

// console.log(boxesQuery);
// console.log(boxesGet);
// console.log(document.body.children);

// console.log(Array.from(boxesGet));
