"use strict";

(function() {

  // reference to container element holding layout
  const outerBox = document.querySelector('#container');

  // reference to <form> element node
  const theForm = document.querySelector('#form');

  // reference to submit button
  const theSubmitBtn = document.querySelector('#action input');

  // node list of elements with error class
  const errorList = document.getElementsByClassName('error');

  // reference to paragraph for Ad Details instructions
  const adDetailsMsg = document.querySelector('#form .formList');

  // reference to ordered list for Keyphrases    
  const keyphraseList = document.querySelector('#keyList');

  // number of text inputs shown for keyphrases
  let keyphraseListCounter = 1;

  // will reference the 'Add' button once that is added to DOM
  let addKeyphraseBtn = null;

  // generated element nodes
  const column = document.createElement('div');
  const hdr = document.createElement('h3');
  const adspace = document.createElement('div');
  const title = document.createElement('div');
  const link = document.createElement('a');
  const description = document.createElement('div');
  const visible_url = document.createElement('div');

  function setupEvents() {
 
    theForm.addEventListener('keyup', updateAd, false);
    theForm.addEventListener('click', addKeyphrase, true);

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

  function updateAd(evt) {

    // locate the text input field or textarea
    const fld = findTarget(evt, 'input', this) || findTarget(evt, 'textarea', this);
  
    // stop function if no text input field or textarea found; also skip keyphrase fields
    if (!fld || fld.name === 'keyphrase[]') { return; }

    switch(fld.id) {
      
      case 'txt' :
        
        link.firstChild.nodeValue = fld.value;
        break;
          
      case 't_url' :

        // if the pattern matches add the URL, otherwise remove the href attribute
        /^http(s)?:\/\/(([\w\-])+\.)+([\w]{2,6})+$/.test(fld.value) ? link.href = fld.value : link.removeAttribute('href');
          
        // if the value entered is invalid then show the error appearance
        (link.href) ? showError(fld, 'y') : showError(fld);
        break;
          
      case 'desc' :
        
        description.firstChild.nodeValue = fld.value;
        break;
          
      case 'v_url' :

        // if the pattern matches show the URL, otherwise empty the text node
        visible_url.firstChild.nodeValue = /^(([\w\-])+\.)+([\w]{2,6})+$/.test(fld.value) ? fld.value : '';

        // if the value entered is invalid then show the error appearance          
        (visible_url.firstChild.nodeValue) ? showError(fld, 'y') : showError(fld);
        break;
      
    }
    
  }

  function addInstructionsBtn() {
    
    adDetailsMsg.insertAdjacentHTML('beforebegin', "<p id=\"msg1\">'Title URL' and 'Visible URL' are added to the preview when valid; if invalid their field name is red and boldface.</p>");
    keyphraseList.insertAdjacentHTML('beforebegin','<p id="msg2">Up to 5 keywords / keyphrases can be entered. <input type="button" value="Add Another" id="addAnotherBtn" /></p>');
    addKeyphraseBtn = document.getElementById('addAnotherBtn');
    
  }

  function addKeyphrase(evt) {
  
    // locate the button
    const theBtn = findTarget(evt, 'input', this);

    // stop function if no input found or if the input was a text field
    if (!theBtn || theBtn.type !== 'button') { return; }
  
    // create the new element nodes
    const theInputItem = '<li><input type="text" aria-label="Enter keyphrase" size="30" name="keyphrase[]" /></li>';

    // append the new element nodes
    keyphraseList.insertAdjacentHTML('beforeend', theInputItem);
    
    // increment the counter of keyphrases by 1  
    keyphraseListCounter += 1;
  
    // check to see if the 'Add Another' button needs to be shown or hidden
    checkCounter();
  
  }
  
  function checkCounter() {
  
    addKeyphraseBtn.className = (keyphraseListCounter >= 5) ? 'rem' : '';
  
  }

  function showError(fld, clearError='n') {
    
    // only trigger the error appearance if there is something in the field
    if (fld.value.length > 0) { 
      fld.parentNode.className = (clearError === 'y') ?  '' : 'error';
      (clearError === 'y') ?  fld.setAttribute('aria-invalid','false') : fld.setAttribute('aria-invalid','true');
    }
      
    // if the length of the field value is 0 then it should never show an error appearance
    else { 
      fld.parentNode.className = '';
      fld.setAttribute('aria-invalid','false');
    }

    // disable / enable submit button
    theSubmitBtn.disabled = (errorList.length > 0) ? true : false;
    
  }

  function findTarget(evt, targetNode, container) {
    let currentNode = evt.target;
    while (currentNode && currentNode !== container) {  
      if (currentNode.nodeName.toLowerCase() === targetNode.toLowerCase()) { return currentNode; }
      else { currentNode = currentNode.parentNode; }
    }
    return false;
  }

  setupPreview();
  addInstructionsBtn();
  setupEvents();

})();