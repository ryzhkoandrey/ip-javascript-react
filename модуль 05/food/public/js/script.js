'use strict';

window.addEventListener('DOMContentLoaded', () => {

   // =============== TABS ===============

   const tabs = document.querySelectorAll('.tabheader__item');
   const tabsContent = document.querySelectorAll('.tabcontent');
   const tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('fade');
         // item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
      // tabsContent[i].classList.add('show', 'fade');
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

   // =============== TIMER ===============

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

   // =============== MODAL ===============

   const modalTriggers = document.querySelectorAll('[data-modal]');
   const modal = document.querySelector('.modal');

   function openModal() {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   }

   function closeModal() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   modalTriggers.forEach((trigger) => {
      trigger.addEventListener('click', openModal)
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') === '') {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal, 50000);

   // =============== CARDS IN MENU ===============

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

   // =============== FORMS ===============

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
      openModal();

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
         closeModal();
      }, 4000);
   }

});