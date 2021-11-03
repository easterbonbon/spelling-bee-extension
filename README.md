# Spelling Bee Browser Extension
For those who love to play the New York Times (NYT) Spelling Bee and want to uncover all the words and **bee**come the Queen Bee!
Link to NYT's Spelling Bee: (https://www.nytimes.com/puzzles/spelling-bee).

## Development
Use `web-ext` to quickly load the extension into the browser.
```
npm install --global web-ext
```

To load the extension, just run:
```
web-ext run
```
in the root of this repository.

To debug and see the console, go to `about:debugging` in the browser and inspect the extension.

----
## Logic
### How the answers are retrieved
A content script is run within the Spelling Bee page. That content script injects a script element into the
DOM which can access the custom properties (e.g. `gameData`) of the window. The script element script will read the
answers from `gameData.today.answers` and place them in within a hidden element on the DOM.

The content script will then be able to read the hidden element's content and return the answers to the extension.
  