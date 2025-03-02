window.addEventListener('DOMContentLoaded', () => {

   const box = document.querySelector('.box');

   box.addEventListener('touchstart', (e) => {
      e.preventDefault();
      console.log('touchstart');
      console.log(e.touches);
      console.log(e.targetTouches);
      console.log(e.changedTouches);
   });

   // box.addEventListener('touchmove', (e) => {
   //    e.preventDefault();
   //    console.log('touchmove');
   // });

   // box.addEventListener('touchend', (e) => {
   //    e.preventDefault();
   //    console.log('touchend');
   // });

});