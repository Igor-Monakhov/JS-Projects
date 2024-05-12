"use strict";

const election = {

  // reference to form tag
  theForm : document.getElementsByTagName('form')[0],

  // references to form elements
  inputFields : document.getElementsByTagName('input'),
  selectMenus : document.getElementsByTagName('select'),
  errorHolder : document.getElementsByClassName('errorHolder'),

  // counts of form elements
  allInputs : 0,
  allSelects : 0,

  init : function() {

    // store node list totals
    this.allInputs = this.inputFields.length;
    this.allSelects = this.selectMenus.length;

    // assign a 'submit' listener to the form
    this.theForm.addEventListener('submit', this.checkData, false);

  },

  checkData : function(evt) {

    const errorsArray = [];

    for (let i=0; i<election.allInputs; i++) {
        
      if (election.inputFields[i].name === 'voter_data' && 
          election.inputFields[i].value === '') {

        errorsArray.push('Please provide a name.'); 
        continue;
      
      }
      
      if (election.inputFields[i].name === 'email_data') {
      
        const emailPattern = /^([\w\.\-])+\@(([\w\-])+\.)+([\w]{2,4})+$/;
        const emailCheck = emailPattern.test(election.inputFields[i].value);
        if (!emailCheck) {
          errorsArray.push('Please provide a valid email address.');
          continue;
        }
      
      }
      
      if (election.inputFields[i].name === 'city_data' &&
          election.inputFields[i].value === '') {

        errorsArray.push('Please indicate a city.');
        continue;

      }
      
      if (election.inputFields[i].name === 'state_data') {

        const statePattern = /^[a-zA-Z]{2}$/;
        const stateCheck = statePattern.test(election.inputFields[i].value);
        if (!stateCheck) {
          errorsArray.push('Please enter a valid state abbreviation.');
          continue;
        }

      }
      
      if (election.inputFields[i].name === 'age_data') {

        const agePattern = /^\d{1,3}$/;
        const ageCheck = agePattern.test(election.inputFields[i].value);
        if (!ageCheck) {              
          errorsArray.push('Please provide a valid age.');
          continue;
        }

      }        

    }

    for (let i=0; i<election.allSelects; i++) {
        
      if (election.selectMenus[i].name === 'gender_data' && 
          election.selectMenus[i].selectedIndex <= 0) {

        errorsArray.push('Please select a gender.'); 
        continue;

      }

      if (election.selectMenus[i].name === 'choice_data' && 
          election.selectMenus[i].selectedIndex <= 0) {

        errorsArray.push('Please select your candidate.');
        continue;

      }
    
    }

    // check to see if there are any items in the errors array
    if (errorsArray.length) {

      // stopping the default behavior of form submission
      evt.preventDefault();

      // create the error div, if necessary
      if (!election.errorHolder[0]) {
       
        const theErrors = document.createElement('div');
        theErrors.id = 'errors';
        theErrors.className = 'errorHolder';
        theErrors.setAttribute('aria-atomic', 'true');
        theErrors.setAttribute('role', 'alert');
        election.theForm.insertAdjacentElement('beforebegin', theErrors);

      }
       
      let str = 'Your poll results could not be processed due to the following errors:';
      str += '<ul>';
      for (let i=0, allErrors=errorsArray.length; i<allErrors; i++) {
        str += '<li>' + errorsArray[i] + '</li>';
      }
      str += '</ul>';

      election.errorHolder[0].innerHTML = str;
  
    }
      
  }

}  

election.init();