"use strict";

const election = {

  voteButton : document.getElementById('sub'),
  inputFields : document.getElementsByTagName('input'),
  selectMenus : document.getElementsByTagName('select'),
  requiredPara : document.getElementById('required'),

  // counts
  allInputs : 0,
  allSelects : 0,
  
  init : function() {

    this.allInputs = this.inputFields.length;
    this.allSelects = this.selectMenus.length;

    // assign a 'submit' listener to the form
    this.voteButton.addEventListener('click', this.checkData, false);

  },

  checkData : function() {

    const errorsArray = [];
    let counter = 0;

    for (let i=0; i<election.allInputs; i++) {
        
        if (election.inputFields[i].name === 'voter_data' && election.inputFields[i].value === '') {
           errorsArray[counter] = 'Please provide a name.';
           counter++;
           continue;
        }
        
        if (election.inputFields[i].name === 'email_data') {
           const emailPattern = /^([\w\.\-])+\@(([\w\-])+\.)+([\w]{2,4})+$/;
           const emailCheck = emailPattern.test(election.inputFields[i].value);
           if (!emailCheck) {
              errorsArray[counter] = 'Please provide a valid email address.';
              counter++;
              continue;
           }
        }
        
        if (election.inputFields[i].name === 'city_data' && election.inputFields[i].value === '') {
           errorsArray[counter] = 'Please indicate a city.';
           counter++;
           continue;
        }
        
        if (election.inputFields[i].name === 'state_data') {
           const statePattern = /^[a-zA-Z]+$/;
           const stateCheck = statePattern.test(election.inputFields[i].value);
           if (!stateCheck) {
              errorsArray[counter] = 'Please enter a valid state abbreviation.';
              counter++;
              continue;
           }
        }
        
        if (election.inputFields[i].name === 'age_data') {
           const agePattern = /^\d+$/;
           const ageCheck = agePattern.test(election.inputFields[i].value);
           if (!ageCheck) {              
              errorsArray[counter] = 'Please provide a valid age.';
              counter++;
              continue;
           }
        }        
    }

    // interests and specialization select menu validation
    for (let i=0; i<election.allSelects; i++) {
        
        if (election.selectMenus[i].name === 'gender_data' && election.selectMenus[i].selectedIndex <= 0) {
           errorsArray[counter] = 'Please select a gender.';
           counter++;
           continue;
        }
        
        if (election.selectMenus[i].name === 'choice_data' && election.selectMenus[i].selectedIndex <= 0) {
           errorsArray[counter] = 'Please select your candidate.';
           counter++;
           continue;
        }
    }

    // check to see if there are any items in the errors array
    if (errorsArray.length) {
       
       // check to see if there are errors already shown
       // if so, remove them
       election.removeErrors();
       
       // creating and inserting error message content
       let theErrors = '<div id="errors">Your poll results could not be processed due to the following errors: <ul>';
       for (let i=0, allErrors=errorsArray.length; i<allErrors; i++) {
         theErrors += '<li>' + errorsArray[i] + '</li>';
       }
       theErrors += '</ul></div>';

       election.requiredPara.insertAdjacentHTML('beforebegin', theErrors);
 
    }
    
    else {
 
       // remove any existing error messages
       election.removeErrors();

       // save the data
       election.saveData();
       
       window.open('lab7-popup.html', '_blank', 'height=300,width=400,top=25,left=25,scrollbars=1,resizable=1,location=1');
    
    }
      
  },

  saveData : function() {

    localStorage.setItem('name', document.getElementById('vote').value);
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('city', document.getElementById('city').value);
    localStorage.setItem('state', document.getElementById('state').value);
    localStorage.setItem('age', document.getElementById('age').value);    
    localStorage.setItem('gender', document.getElementById('gender').value);
    localStorage.setItem('choice', document.getElementById('choice').value);

  },
  
  removeErrors : function() {

    const errorHolder = document.getElementById('errors');

    if (errorHolder) {
      errorHolder.parentNode.removeChild(errorHolder);
    }
   
  }

}  

election.init();