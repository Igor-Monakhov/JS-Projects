"use strict";

(function() {

  // reference to container element holding layout
  const outerBox = document.querySelector('#container');

  // all the form fields
  const inputs = document.querySelectorAll('#form input, #desc');

  // generated element nodes
  const column = document.createElement('div');
  const hdr = document.createElement('h3');
  const adspace = document.createElement('div');
  const title = document.createElement('div');
  const link = document.createElement('a');
  const description = document.createElement('div');
  const visible_url = document.createElement('div');

  function setupEvents() {
 
    for (const input of inputs) {    
      input.addEventListener('input', updateAd, false);
    }
  
  }

  function setupPreview() {
    
    // assign id's for proper styling
    column.id = 'preview';      
    adspace.id = 'adspace';
    title.id = 'title';
    description.id = 'desc_txt';
    visible_url.id = 'vurl_txt';

    // assemble and append the node tree
    column.appendChild(hdr).appendChild(document.createTextNode('Real-time Ad Preview:'));
    adspace.appendChild(title).appendChild(link).appendChild(document.createTextNode(''));
    adspace.appendChild(description).appendChild(document.createTextNode(''));
    adspace.appendChild(visible_url).appendChild(document.createTextNode(''));
    column.appendChild(adspace);
    outerBox.appendChild(column);
        
  }

  function updateAd() {
    
    switch(this.id) {
      
      case 'txt' :
        
        link.firstChild.nodeValue = this.value;
        break;
          
      case 't_url' :
        
        link.href = this.value;
        break;
          
      case 'desc' :
        
        description.firstChild.nodeValue = this.value;
        break;
          
      case 'v_url' :
        
        visible_url.firstChild.nodeValue = this.value;
        break;
      
    }
    
  }

  setupPreview();
  setupEvents();

})();