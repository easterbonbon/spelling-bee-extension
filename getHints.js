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
foundWords = extractFoundWords();

filteredAnswers = daAnswers.filter(x => !foundWords.includes(x));

// filteredAnswers.join('\n');

// ===================================
//   Create the hints
// ===================================

function transformAnswersToHints(answers) {
  
  function addHint(hints, answer) {
    const firstLetter = answer[0];
    
    
    if(!hints.hasOwnProperty(firstLetter)) {
      hints[firstLetter] = {
        count: 0,
        lengths: {},
        firstTwo: {}
      }
    }
    
    hint = hints[firstLetter];
    hint.count += 1;

    return hint;
  }

  function addLength(hint, answer) {
    const length = answer.length
    if(!hint.lengths.hasOwnProperty(length)) {
      hint.lengths[length] = 1
    } else {
      hint.lengths[length] += 1
    }
  }
  
  function addFirstTwoLetters(hint, answer) {
    const firstTwoLetters = answer.slice(0, 2)
    if(!hint.firstTwo.hasOwnProperty(firstTwoLetters)) {
      hint.firstTwo[firstTwoLetters] = 1
    } else {
      hint.firstTwo[firstTwoLetters] += 1
    }
  }

  hints = {}

  for (answer of answers){
    const hint = addHint(hints, answer);
    
    addLength(hint, answer);
    addFirstTwoLetters(hint, answer);
  }

  return hints;
}

JSON.stringify(transformAnswersToHints(filteredAnswers), null, 2);
