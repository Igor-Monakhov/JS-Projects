"use strict";

(function() {

  // node list of deletion checkboxes
  const deleteCheckboxes = document.getElementsByName('deleteRow');
  
  // node list of hours text inputs
  const hoursInputs = document.querySelectorAll('input[name ^= "hoursTask"]');

  // indexes for client and description columns
  // updated by mapColumnHeaders()
  let clientColumnIndex = 0;
  let descriptionColumnIndex = 0;

  // centering the deletion checkboxes by adding a class to td
  function centerDeleteCheckboxes() {

    for (const box of deleteCheckboxes) {
      box.parentNode.classList.add('action');
    }

  }

  function mapColumnHeaders() {

    const columnHeaders = document.querySelectorAll('thead th[scope="col"]');
    const headerCount = columnHeaders.length;
    for (let i=0; i<headerCount; i++) {
      if (columnHeaders[i].innerText === 'Client') { 
        clientColumnIndex = i;
      }
      else if (columnHeaders[i].innerText === 'Description') {
        descriptionColumnIndex = i;
      }
    }

  }

  function updateHoursInputsShading() {

    for (const input of hoursInputs) {

      // the tr
      const theRow = input.parentNode.parentNode;

      // the text for Client
      const clientVal = theRow.querySelectorAll('th,td')[clientColumnIndex].innerText;

      // row is Non-Billable
      if (clientVal === 'Non-Billable') {

        // disable the text input
        input.disabled = true;

        // shade the row
        theRow.classList.add('nonBillable');

        // reference to the description cell
        const descriptionCell = theRow.querySelectorAll('th,td')[descriptionColumnIndex];

        // description cell is not empty
        if (descriptionCell.hasChildNodes() && descriptionCell.firstChild.data.length > 0) {
          descriptionCell.appendChild(document.createTextNode(' (Non-Billable)'));
        }

        // description cell is empty
        else {
          descriptionCell.appendChild(document.createTextNode('Non-Billable'));
        }

      }
      
      // row is something other than Non-Billable
      else {
        input.parentNode.appendChild(document.createTextNode(' Hours'));
      }

    } 

  }

  // mapColumnHeaders() must precede updateHoursInputsShading()
  // there is a dependency across the functions
  centerDeleteCheckboxes();
  mapColumnHeaders();
  updateHoursInputsShading();

})();