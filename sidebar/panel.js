// From https://github.com/mdn/webextensions-examples/tree/master/annotate-page/sidebar

const contentBox = document.querySelector("#content");
const viewToggleButton = document.querySelector("#toggle_button");

let areWordsHidden = true;

// Set event handlers
// window.addEventListener("click", updateContent);
viewToggleButton.addEventListener("click", () => {
  areWordsHidden = !areWordsHidden;
  updateContent();
});



function drawHints(jsonHints) {
  function listOfLengths(lengths) {
    const node = document.createElement('ul');
    for (const length in lengths) {
      const item = document.createElement('li');
      item.textContent = `${length}: ${lengths[length]}`
      node.appendChild(item);
    }
    return node;
  }

  function listOfFirstTwoLetters(firstTwoLetters) {
    const node = document.createElement('ul');
    for (const firstTwo in firstTwoLetters) {
      const item = document.createElement('li');
      item.textContent = `${firstTwo}: ${firstTwoLetters[firstTwo]}`
      node.appendChild(item);
    }
    return node;
  }
  
  const hints = JSON.parse(jsonHints);

  const letterNodes = [];
  
  for (const letter in hints) {
    const letterHeader = document.createElement('h2');
    letterHeader.textContent = letter;

    const lengths = hints[letter].lengths;
    const lengthsNode = listOfLengths(lengths);

    const firstTwoLetters = hints[letter].firstTwo;
    const firstTwoNode = listOfFirstTwoLetters(firstTwoLetters);

    letterNodes.push(letterHeader);
    letterNodes.push(lengthsNode);
    letterNodes.push(firstTwoNode);
  }

  return letterNodes;
}

function loadFoundWords(tab) {
  browser.tabs.executeScript(tab.id, { file: "/getHints.js" }).then(result => {
    console.log("Loaded found words on Spelling Bee tab");
    console.log(result);
    if(areWordsHidden) {
      contentBox.textContent = "Words are now hidden."
    } else {
      contentBox.replaceChildren(...drawHints(result));
    }
  });
}

/*
 * Update the sidebar box
 * with the missed words
 */
function updateContent() {
  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      console.log("updateTabs");
      
      // executeScript(currentTab);
      loadFoundWords(currentTab);
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

/*
Update content when a new tab becomes active.
*/
// browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
// browser.tabs.onUpdated.addListener(updateContent);
