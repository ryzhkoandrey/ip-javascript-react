function modal() {

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

}

module.exports = modal;