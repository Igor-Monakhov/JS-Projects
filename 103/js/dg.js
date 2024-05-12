"use strict";

(function() {

  const dg = {

    // reference to the data table
    dataTable : document.getElementById('data'),
    
    init : function() {

      // assign a click listener to the data table for event delegation
      this.dataTable.addEventListener('click', this.updateCell, false);
          
      // set up the help icon and text
      this.generateHelp();
      
    },

    generateHelp : function() {
    
      // wrapper element for image and help box
      const wrapper = document.getElementById('helpWrapper');
      
      // code string for image and help box
      let str = '<a href="#" id="helpIcon" aria-controls="helpBox" aria-expanded="false">';
      str += '<img src="i/help.png" alt="Help" width="17" height="17" /></a>';
      str += '<ul id="helpBox" class="remove">';
      str += '<li>To lock a cell (prevent edits) SHIFT + click on the cell; to unlock repeat this process.</li>';
      str += '<li>To highlight a cell ALT + click on the cell; to remove the highlight repeat the process.</li>';
      str += '<li>To clear a cell\'s value CTRL + click on the cell.</li>';
      str += '</ul>';
      wrapper.innerHTML = str;

      this.theIcon = document.getElementById('helpIcon');
      this.instructions = document.getElementById('helpBox');

      // assign click event to the Help icon
      this.theIcon.addEventListener('click', this.showHideHelp, false);
      
    },
    
    // toggle show/hide of the help box
    showHideHelp : function(evt) {
    
      dg.instructions.classList.toggle('remove');
      dg.theIcon.getAttribute('aria-expanded') === 'false' ? dg.theIcon.setAttribute('aria-expanded', 'true') : dg.theIcon.setAttribute('aria-expanded', 'false');
      evt.preventDefault();
    
    },
    
    updateCell : function(evt) {
    
      // reference to text input box clicked
      const textBox = dg.findTarget(evt, 'input', this);
    
      // if the click path did not involve a text input stop processing
      if (!textBox) { return; }
    
      // if the SHIFT key was pressed lock down the field or unlock the field
      if (evt.shiftKey) { 
      
        textBox.readOnly = (textBox.readOnly) ? false : true;
        textBox.classList.toggle('readonly');
        textBox.title = (textBox.title) ? '' : 'The cell is locked and cannot be edited; SHIFT + click to unlock it';
             
      }
      
      // if the ALT key was pressed highlight the text input or remove its highlight
      if (evt.altKey) {

        textBox.classList.toggle('marked');
      
      }
      
      // if the CTRL key was pressed wipe the text input value
      if (evt.ctrlKey) {
      
        textBox.value = '';
      
      }
    
    },

    findTarget : function(evt, targetNode, container) {
      let currentNode = evt.target;
      while (currentNode && currentNode !== container) {  
        if (currentNode.nodeName.toLowerCase() === targetNode.toLowerCase()) { return currentNode; }
        else { currentNode = currentNode.parentNode; }
      }
      return false;
    }

  };

  dg.init();

})();