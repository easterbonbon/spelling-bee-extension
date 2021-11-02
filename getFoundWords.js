found_words = document.querySelector('ul.sb-wordlist-items-pag').innerText.split('\n').map(x => x.toLowerCase());
// found_words.join('\n');
console.log(this.window.isSecureContext)
// Currently cannot get the gameData since it is a custom property. We may need to inject a script to 
// extract the values out and place them in a hidden element in the main DOM to read
console.log(this.window.gameData)
this.window.gameData.today.answers.filter(x => !found_words.includes(x)).join('\n')
