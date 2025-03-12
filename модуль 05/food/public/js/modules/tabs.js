function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

   const tabs = document.querySelectorAll(tabsSelector);
   const tabsContent = document.querySelectorAll(tabsContentSelector);
   const tabsParent = document.querySelector(tabsParentSelector);

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('fade');
      });

      tabs.forEach(item => {
         item.classList.remove(activeClass);
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (item === target) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

}

export default tabs;