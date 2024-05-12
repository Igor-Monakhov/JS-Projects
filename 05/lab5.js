"use strict";

(function() {

  const tbl = {

    // reference to the data table
    theTable : document.getElementsByTagName('table')[0],

    // reference to the first row of the table (holding header cells)
    headerRow : document.getElementsByTagName('table')[0].rows[0],

    init : function() {

      // assign mouse events to table    
      this.theTable.addEventListener('mouseover', this.addRemoveHighlight, false);
      this.theTable.addEventListener('mouseout', this.addRemoveHighlight, false);    
    
    },

    addRemoveHighlight : function(evt) {

      const targetCell = tbl.findTarget(evt, 'td', this);
   
      if (targetCell) {
      
        tbl.findCellsRow(targetCell);

        // highlight cell moused over
        targetCell.classList.toggle('highlight');
         
        // highlight row header cell
        targetCell.parentNode.cells[0].classList.toggle('highlight');

        // highlight column header cell
        tbl.headerRow.cells[tbl.currentCellNumber].classList.toggle('highlight');

        // highlight the td's to the left of the current td
        for (let i=1; i<tbl.currentCellNumber; i++) {
          tbl.currentRowParent.cells[i].classList.toggle('path');   
        }
         
        // highlight the td's in the same column, above the current td
        for (let i=1; i<tbl.currentRowNumber; i++) {
          tbl.theTable.rows[i].cells[tbl.currentCellNumber].classList.toggle('path');   
        }   
      
      }

    },
    
    // method to track down cells and rows involved in highlights
    findCellsRow : function(theCell) {
    
      // store the cell number for the td moused over or moused away from
      this.currentCellNumber = theCell.cellIndex;
      
      // pinpoint the row holding the cell moused over or moused away from
      this.currentRowParent = theCell.parentNode;

      // store the row number for the row moused over or moused away from
      this.currentRowNumber = this.currentRowParent.rowIndex;
    
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

  tbl.init();

})();