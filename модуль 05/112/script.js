const btn = document.querySelector('.btn');
const elem = document.querySelector('.box');
let pos = 0;

btn.addEventListener('click', () => requestAnimationFrame(myAnimation));

function myAnimation() {
   pos++;
   elem.style.top = pos + "px";
   elem.style.left = pos + 'px';

   if (pos < 300) {
      requestAnimationFrame(myAnimation);
   }
}