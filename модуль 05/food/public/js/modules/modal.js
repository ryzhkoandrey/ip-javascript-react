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

export default modal;
export { openModal, closeModal };