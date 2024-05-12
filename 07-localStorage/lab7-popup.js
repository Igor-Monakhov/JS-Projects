"use strict";

const popup = {
	
  init : function() {

    const theListItems = document.querySelectorAll('li');
    const storageArr = ['name', 'email', 'city', 'state', 'age', 'gender', 'choice'];
    const allItems = storageArr.length;

    for (let i=0, theVal; i<allItems; i++) {

      theVal = localStorage.getItem(storageArr[i]);
      if (theVal) {
        theListItems[i].insertAdjacentHTML('beforeend', theVal);
      }

    }

    const closeBtn = document.querySelector('input[type="button"]');
    closeBtn.addEventListener('click', function() { window.close(); }, false);

  }

}

popup.init();