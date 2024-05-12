"use strict";

(function() {

  const dg = {

    // reference to the data table
    dataTable : document.getElementById('data'),

    // node list of inputs in the data table
    dataInputs : document.querySelectorAll('#data input'),

    // buttons for mass unlocks, highlight removal, and value clearing
    clearLocksBtn : document.createElement('input'),
    clearHighlightsBtn : document.createElement('input'),
    clearDataBtn : document.createElement('input'),   
      
    // counter for locked cells
    lockedCellCounter : 0,
    
    // counter for highlighted cells
    highlightedCellCounter : 0,
    
    init : function() {

      // pinpoint the data table and assign listeners to the table for event delegation
      this.dataTable.addEventListener('click', this.updateCell, false);
      this.dataTable.addEventListener('focusout', this.toggleClearAllDataBtn, false);

      // set up the help icon and text
      this.generateHelp();

      // set up the div with the buttons to clear locks / highlights / data
      this.generateClearingControls();
      
      // assign aria-label and title attributes
      this.generateAriaLabelsTitles();

    },

    generateHelp : function() {
    
      // wrapper element for image and help box
      const wrapper = document.getElementById('helpWrapper');
      
      // code string for image and help box
      let str = '<a href="#" id="helpIcon" aria-controls="helpBox" aria-expanded="false">'
      str += '<img src="i/help.png" alt="Help"></a>';
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
    
    // set up the div with the two buttons to clear locks and highlights
    generateClearingControls : function() {

      const container = document.createElement('div');
      container.id = 'clearingControls';
      this.clearLocksBtn.type = this.clearHighlightsBtn.type = this.clearDataBtn.type = 'button';
      this.clearLocksBtn.value = 'Unlock Cells';
      this.clearHighlightsBtn.value = 'Remove Cell Highlights';
      this.clearDataBtn.value = 'Remove All Data';
      this.clearLocksBtn.className = this.clearHighlightsBtn.className = this.clearDataBtn.className = 'hide';
      container.appendChild(this.clearLocksBtn);
      container.appendChild(this.clearHighlightsBtn);
      container.appendChild(this.clearDataBtn);
      container.addEventListener('click', this.massUpdates, false);
      document.querySelector('body').appendChild(container);
    
    },

    // remove all locks / all highlights / all data 
    // as well as the related control button
    massUpdates : function(evt) {
    
      const btn = dg.findTarget(evt, 'input', this);
      
      if (!btn) { return; }

      switch (btn.value) {

        case 'Unlock Cells' :

          for (const input of dg.dataInputs) {
            input.readOnly = false;
            input.classList.remove('readonly');
            input.title = '';
          }
          
          // reset the counter back to zero
          dg.lockedCellCounter = 0;

          break;

        case 'Remove Cell Highlights' :

          for (const input of dg.dataInputs) {
            input.classList.remove('marked');
          }
              
          // reset the counter back to zero
          dg.highlightedCellCounter = 0;

          break;

        case 'Remove All Data' :

          for (const input of dg.dataInputs) {
            input.value = '';
          }

          break;

      }

      // remove the control button
      btn.classList.toggle('hide'); 
    
    },

    generateAriaLabelsTitles : function() {

      for (const input of dg.dataInputs) {

        // locate the subject
        const subject = input.parentNode.parentNode.cells[0].firstChild.nodeValue;

        // locate the measure
        const measure = dg.dataTable.rows[0].cells[input.parentNode.cellIndex].firstChild.nodeValue;

        // build the string
        const str = subject + ', ' + measure;
      
        // assign the aria-label and title
        input.setAttribute('aria-label', str);
        input.parentNode.title = str;

      }

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
        textBox.classList.contains('readonly') ? dg.adjustCounter('lockedCellCounter', 'clearLocksBtn', 'up') : dg.adjustCounter('lockedCellCounter', 'clearLocksBtn', 'down');
      
      }
      
      // if the ALT key was pressed highlight the text input or remove its highlight
      if (evt.altKey) {

        textBox.classList.toggle('marked');
        textBox.classList.contains('marked') ? dg.adjustCounter('highlightedCellCounter', 'clearHighlightsBtn', 'up') : dg.adjustCounter('highlightedCellCounter', 'clearHighlightsBtn', 'down');    
      
      }
      
      // if the CTRL key was pressed wipe the text input value
      if (evt.ctrlKey) {
      
        textBox.value = '';
      
      }
    
    },

    toggleClearAllDataBtn : function() {

      let dataExists = false;

      for (const input of dg.dataInputs) {
        if (input.value.length > 0) {
          dataExists = true;
          break;
        }
      }

      (dataExists) ? dg.clearDataBtn.classList.remove('hide') : dg.clearDataBtn.classList.add('hide');

    },

    // adjusts counters for locks and highlights and shows/hides the relevant control button
    adjustCounter : function(counter, btn, direction) {
    
      direction === 'down' ? this[counter] -= 1 : this[counter] += 1;
      (this[counter] > 0) ? this[btn].classList.remove('hide') : this[btn].classList.add('hide');

    },

    findTarget : function(evt, targetNode, container) {
      let currentNode = evt.target;
      while (currentNode && currentNode !== container) {  
        if (currentNode.nodeName.toLowerCase() === targetNode.toLowerCase()) { return currentNode; }
        else { currentNode = currentNode.parentNode; }
      }
      return false;
    }

  }

  dg.init();

})();