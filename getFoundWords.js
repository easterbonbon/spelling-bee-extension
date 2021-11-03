found_words = document.querySelector('ul.sb-wordlist-items-pag').innerText.split('\n').map(x => x.toLowerCase());
// found_words.join('\n');


// Currently cannot get the gameData since it is a custom property. We may need to inject a script to 
// extract the values out and place them in a hidden element in the main DOM to read

function injectScript(file, node) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  
  const outerElement = document.getElementsByTagName(node)[0];
  outerElement.appendChild(script);
}

injectScript(browser.runtime.getURL('/injectAnswers.js'), 'body');
// this.window.gameData.today.answers.filter(x => !found_words.includes(x)).join('\n')
