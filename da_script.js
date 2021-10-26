// For Chrome:
console.log(gameData.today.answers.filter(x => !JSON.parse(localStorage['sb-today']).words.includes(x)).join('\n'))
// or for Firefox:
gameData.today.answers.filter(x => !JSON.parse(localStorage['sb-today']).words.includes(x)).join('\n')


// Note that `localStorage['sb-today']` is empty/undefined when no answers have been typed in.

// Window is : https://www.nytimes.com/puzzles/spelling-bee
