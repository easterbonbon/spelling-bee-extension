function extractFoundWords() {
  return document.querySelector('ul.sb-wordlist-items-pag').innerText.split('\n').map(x => x.toLowerCase());
}

function injectScript(file, node) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  
  const outerElement = document.getElementsByTagName(node)[0];
  outerElement.appendChild(script);
}

function extractAnswersFromList(listNode) {
  var extractedAnswers = [];
  listNode.querySelectorAll('li').forEach(element => {
    extractedAnswers.push(element.textContent.toLowerCase());
  });
  return extractedAnswers;
}

hiddenAnswersElement = document.querySelector('ul.hidden-answers-list');
if (hiddenAnswersElement == null) {
  injectScript(browser.runtime.getURL('/injectAnswers.js'), 'body');
}

daAnswers = extractAnswersFromList(hiddenAnswersElement);
daAnswers.join('\n');

// this.window.gameData.today.answers.filter(x => !found_words.includes(x)).join('\n')
