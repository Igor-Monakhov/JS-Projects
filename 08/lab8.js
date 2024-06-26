"use strict";

// create the 'ls' (live search) object
const ls = {
 
  // reference to the text input box
  searchTextBox : document.getElementById('query'),
 
  // reference to the results div
  resultsArea : document.getElementById('results'),
 
  // div that holds the waiting message
  waitingHolder : document.createElement('div'),
 
  // reference to the form element node
  theForm : document.getElementsByTagName('form')[0],
 
  // initially there is no waiting message
  waitMsg : false,
 
  // initially there is no timer set
  timer : null,
 
  // this will hold the XMLHttpRequest data
  searchData : null,
 
  init : function() {
 
    // disable the submit button; will appear if JS is disabled
    document.getElementById('submitButton').style.display = 'none';
 
    // send the request for the XML data
    // data will be sent to the holdSearchResults() method
    // attach a random number to the end so IE sends the file each time
    // otherwise IE caches the file and the updated file would not be sent
    this.sendRequest('lab8-data.xml?' + Math.random(), ls.holdSearchResults);
 
    // on every key stroke call the setTimer function
    this.searchTextBox.addEventListener('keyup', this.setTimer, false);
 
  },
 
  // store the XML data in the searchData property of this object
  holdSearchResults : function(xhr) {
 
    ls.searchData = xhr.responseXML;
 
  },
 
  setTimer : function() {
 
   // if the clock is ticking, clear the clock
   if (ls.timer) { clearTimeout(ls.timer); }
 
   // if there is not currently a waiting message, display one
   if (!ls.waitMsg) {
 
      ls.waitingHolder.id = 'waiting';
      const theMsg = 'Waiting for you to finish entering your search...';
      const waitingTxt = document.createTextNode(theMsg);
      ls.theForm.appendChild(ls.waitingHolder).appendChild(waitingTxt);
      ls.waitMsg = true;
 
   }
 
   // after 1.5 seconds, call the displayResults() function
   // this countdown will be reset if the user keeps typing
   ls.timer = setTimeout(ls.displayResults, 1500);
 
  },
 
  displayResults : function() {
 
    // shorthands
    const data = ls.searchData;
    const results = ls.resultsArea;
    const box = ls.searchTextBox;
 
    results.innerHTML = '';
 
    // if the user has deleted all the text in the query, do not go any further
    // the keypresses involved in deleting the query will trigger the function
    if (!box.value) { return; }
 
    // determine the total number of possible results for subsequent loops
    const totalResults = data.getElementsByTagName('result').length;
 
    // lowercase the query to eliminate mismatches due to case
    const queryValue = box.value.toLowerCase();
 
    // split up the query into an array based on spaces between characters
    const queryArr = box.value.toLowerCase().split(" ");
    const allQuerySegments = queryArr.length;

    // wipe out the waiting message and flip the waitMsg flag back to false
    ls.waitingHolder.removeChild(ls.waitingHolder.firstChild);
    ls.theForm.removeChild(ls.waitingHolder);
    ls.waitMsg = false;
 
    // create and append the Search Results header
    const searchHeader = document.createElement('h1');
    const searchHdrTxt = document.createTextNode('Search Results');
    results.appendChild(searchHeader).appendChild(searchHdrTxt);

    let resultsCounter = 0;
     
    for (let i=0; i<totalResults; i++) {
 
      // match flag
      let isMatch = true;

      // pull out each article title and lowercase it
      const article = data.getElementsByTagName('article_title')[i].firstChild.nodeValue.toLowerCase();

      // inner loop ensures that every part of the query matches that item in the search results
      for (let x=0; x<allQuerySegments; x++) {
           
        if (!article.match(queryArr[x])) { 
          isMatch = false; 
          break; 
        }
        
      }
 
      // only if there is a 'match' do we show results
      if (isMatch) {
          
        const newLink = document.createElement('a');
        newLink.href = data.getElementsByTagName('article_url')[i].firstChild.nodeValue;
        const linkText = document.createTextNode(data.getElementsByTagName('article_title')[i].firstChild.nodeValue);
        results.appendChild(newLink).appendChild(linkText);
        const lineBreak = document.createElement('br');
        results.appendChild(lineBreak);
        resultsCounter++;
        
      }
    
    }
 
    // if no matches were found
    // display the 'No results were found' message
    if (resultsCounter === 0) {
      results.innerHTML = 'No results were found.';
    }
  
  },
 
  sendRequest : function(url, func, postData) {
 
    const xhr = new XMLHttpRequest();
    if (!xhr) { return; }
    const method = (postData) ? "POST" : "GET";
    xhr.open(method, url, true);
    if (postData) {
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) { return; }
      if (xhr.status !== 200 && xhr.status !== 304) {
        alert('HTTP error ' + xhr.status); return;
      }
      func(xhr);
    }
    if (xhr.readyState === 4) { return; }
    xhr.send(postData);
 
  }
 
}
 
ls.init();