class dataTable {

  constructor(theTableRef) {

    this.theTable = document.querySelector(theTableRef);

  }

  setDisplay(evt) {

    const btn = this.findTarget(evt, 'input', evt.currentTarget);

    if (!btn) { return; }
  
    // use button value to determine what to do
    switch(btn.value) {
    
      case 'Hide Low Priority': 
      
        this.theTable.classList.add('hidePriority');
        btn.value = 'Show Low Priority';
        break;
      
      case 'Show Low Priority': 
      
        this.theTable.classList.remove('hidePriority');
        btn.value = 'Hide Low Priority';
        break;
      
      case 'Highlight Current Row': 
      
        this.theTable.classList.add('allowHighlight');
        btn.value = 'Remove Row Highlight';
        break;
    
      case 'Remove Row Highlight': 
      
        this.theTable.classList.remove('allowHighlight');
        btn.value = 'Highlight Current Row';
        break;
      
      case 'Hide Type Column': 
      
        this.theTable.classList.add('hideColumn');
        btn.value = 'Show Type Column';
        break;
      
      case 'Show Type Column':

        this.theTable.classList.remove('hideColumn');
        btn.value = 'Hide Type Column';
        break;     
      
    }
  
  }
  
  rowHighlight(evt) {

    const row = this.findTarget(evt, 'tr', evt.currentTarget);

    if (!row) { return; }

    row.id = (row.id) ? '' : 'currentRow';
  
  }

  findTarget(evt, targetNode, container) {
 
    let currentNode = evt.target;
    while (currentNode && currentNode !== container) {
      if (currentNode.nodeName.toLowerCase() === targetNode.toLowerCase()) {
        return currentNode;
      }
      else {
        currentNode = currentNode.parentNode;
      }
    }
    return false;
  
  }

}

const openItems = new dataTable('#projectsTbl');
const controlsHolder = document.querySelector('#actionForm');
const rowHolder = document.querySelector('#projectsTbl tbody');

// assign control button event listener
controlsHolder.addEventListener('click', (evt) => openItems.setDisplay(evt), false); 

// assign data row event listener
rowHolder.addEventListener('mouseover', (evt) => openItems.rowHighlight(evt), false);
rowHolder.addEventListener('mouseout', (evt) => openItems.rowHighlight(evt), false);