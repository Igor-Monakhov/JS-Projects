class faqSet {

  constructor(btnID, answersHolder, theClass) {

    this.highlightButton = document.querySelector(btnID);
    this.answers = document.querySelectorAll(answersHolder);
    this.theClass = theClass;

  }

  toggleHighlight() {

    this.highlightButton.value = (this.highlightButton.value === 'Highlight Answers') ? 'Remove Highlight' : 'Highlight Answers';

    for (const answer of this.answers) {
      answer.classList.toggle(this.theClass);
    }

  }

}

const faq = new faqSet('#highlight', '#content p', 'visualBox');
faq.highlightButton.addEventListener('click', () => faq.toggleHighlight(), false);