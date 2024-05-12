"use strict";

const excell = {

  buttons : ["home", "about", "design", "usability", "programming", "clients", "contact"],

  generate_globalnav : function() {

    document.write('<nav><ul id="globalnav">');
    for (const button_txt of this.buttons) {
      document.write(`<li><a href="${button_txt}.html">${button_txt}</a></li>`);
    }
    document.write('</ul></nav>');
  
  }

}