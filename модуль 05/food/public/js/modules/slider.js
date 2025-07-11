function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

   const slider = document.querySelector(container);
   const slides = document.querySelectorAll(slide);
   const next = document.querySelector(nextArrow);
   const prev = document.querySelector(prevArrow);
   const total = document.querySelector(totalCounter);
   const current = document.querySelector(currentCounter);
   const slidesWrapper = document.querySelector(wrapper);
   const slidesField = document.querySelector(field);
   const width = window.getComputedStyle(slidesWrapper).width;

   let slideIndex = 1;
   let offset = 0;

   if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
   } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
   }

   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';

   slidesWrapper.style.overflow = 'hidden';

   slides.forEach(slide => {
      slide.style.width = width;
   });

   slider.style.position = 'relative';

   const indicators = document.createElement('ol');
   const dots = [];

   indicators.classList.add('carousel-indicators');
   slider.append(indicators);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');

      if (i === 0) {
         dot.classList.add('dot--active');
      }

      indicators.append(dot);
      dots.push(dot);
   }

   next.addEventListener('click', () => {
      if (offset === deleteNotDigits(width) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex === slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      changeCurrent();
      changeActiveDot();
   });

   prev.addEventListener('click', () => {
      if (offset === 0) {
         offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
         offset -= deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex === 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      changeCurrent();
      changeActiveDot();
   });

   dots.forEach(dot => dot.addEventListener('click', (e) => {
      const slideTo = +e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      changeCurrent();
      changeActiveDot();
   }));

   function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
   }

   function changeCurrent() {
      if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }
   }

   function changeActiveDot() {
      dots.forEach(dot => dot.classList.remove('dot--active'));
      dots[slideIndex - 1].classList.add('dot--active');
   }

}

export default slider;