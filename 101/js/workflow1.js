class dataTable {

  constructor(theTableRef) {

    this.theTable = document.querySelector(theTableRef);

  }

  setDisplay(evt) {

    const btn = evt.currentTarget;
  
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

    const row = evt.currentTarget;
    row.id = (row.id) ? '' : 'currentRow';
  
  }

}

const openItems = new dataTable('#projectsTbl');

// [0] is a node list of input buttons
// [1] is a node list of rows inside tbody
const elementRefs = [
  document.querySelectorAll('#actionForm input'),
  document.querySelectorAll('#projectsTbl tbody tr')
]

// assign control button event handlers
for (const button of elementRefs[0]) {
  button.addEventListener('click', (evt) => openItems.setDisplay(evt), false);
}  

// assign data row event handlers
for (const row of elementRefs[1]) {
  row.addEventListener('mouseenter', (evt) => openItems.rowHighlight(evt), false);
  row.addEventListener('mouseleave', (evt) => openItems.rowHighlight(evt), false);
}