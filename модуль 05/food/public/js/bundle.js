/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/modules/calc.js":
/*!***********************************!*\
  !*** ./public/js/modules/calc.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

   const result = document.querySelector('.calculating__result span');
   let sex;
   let height;
   let weight;
   let age;
   let ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = +localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }

   calcTotal();

   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

   getStaticInformation('#gender div', 'calculating__choose-item_active');
   getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

   getDynamicInformation('#height');
   getDynamicInformation('#weight');
   getDynamicInformation('#age');

   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.classList.remove(activeClass);

         if (elem.getAttribute('id') === sex) {
            elem.classList.add(activeClass);
         }

         if (elem.getAttribute('data-ratio') == ratio) {
            elem.classList.add(activeClass);
         }
      });
   }

   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____';
         return;
      }

      if (sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }

   function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', ratio);
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', sex);
            }

            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
         });
      });
   }

   function getDynamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {

         if (input.value.match(/\D/g)) {
            input.style.border = '2px solid red';
         } else {
            input.style.border = '';
         }

         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }

         calcTotal();
      });
   }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./public/js/modules/cards.js":
/*!************************************!*\
  !*** ./public/js/modules/cards.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {

   axios.get('http://localhost:3000/menu')
      .then(data => createCard(data.data));

   function createCard(data) {
      data.forEach(({ img, altimg, title, descr, price }) => {
         const element = document.createElement('div');

         element.classList.add('menu__item');
         element.innerHTML = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
         `;

         document.querySelector('.menu .container').append(element);
      });
   }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./public/js/modules/forms.js":
/*!************************************!*\
  !*** ./public/js/modules/forms.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./public/js/modules/modal.js");


function forms() {

   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
   };

   forms.forEach((form) => {
      bindpostData(form);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: { 'Content-type': 'application/json' },
         body: data,
      });
      return await res.json();
   }

   function bindpostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);
         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
            }).finally(() => {
               form.reset();
            });
      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
         </div>
      `;

      document.querySelector('.modal').append(thanksModal);

      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.remove('hide');
         (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
      }, 4000);
   }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./public/js/modules/modal.js":
/*!************************************!*\
  !*** ./public/js/modules/modal.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);

   modal.classList.add('show');
   document.body.style.overflow = 'hidden';

   if (modalTimerId) {
      clearInterval(modalTimerId);
   }
}

function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);

   modal.classList.remove('show');
   document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

   const modalTriggers = document.querySelectorAll(triggerSelector);
   const modal = document.querySelector(modalSelector);

   modalTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => openModal(modalSelector, modalTimerId))
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') === '') {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./public/js/modules/slider.js":
/*!*************************************!*\
  !*** ./public/js/modules/slider.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {

   const slides = document.querySelectorAll('.offer__slide');
   const slider = document.querySelector('.offer__slider');
   const prev = document.querySelector('.offer__slider-prev');
   const next = document.querySelector('.offer__slider-next');
   const total = document.querySelector('#total');
   const current = document.querySelector('#current');
   const slidesWrapper = document.querySelector('.offer__slider-wrapper');
   const slidesField = document.querySelector('.offer__slider-inner');
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./public/js/modules/tabs.js":
/*!***********************************!*\
  !*** ./public/js/modules/tabs.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {

   const tabs = document.querySelectorAll('.tabheader__item');
   const tabsContent = document.querySelectorAll('.tabcontent');
   const tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (item === target) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./public/js/modules/timer.js":
/*!************************************!*\
  !*** ./public/js/modules/timer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

   const deadline = '2025-03-15';

   function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date);

      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24));
         hours = Math.floor((t / (1000 * 60 * 60) % 24));
         minutes = Math.floor((t / 1000 / 60) % 60);
         seconds = Math.floor((t / 1000) % 60);
      }

      return {
         total: t,
         days,
         hours,
         minutes,
         seconds,
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector);
      const days = timer.querySelector('#days');
      const hours = timer.querySelector('#hours');
      const minutes = timer.querySelector('#minutes');
      const seconds = timer.querySelector('#seconds');
      const timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./public/js/script.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./public/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./public/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./public/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./public/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./public/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./public/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./public/js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
   const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 50000);

   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map