// From https://github.com/mdn/webextensions-examples/tree/master/annotate-page/sidebar

let myWindowId;
let parentWindow;
const contentBox = document.querySelector("#content");

window.addEventListener("click", () => {
  updateContent();
});

function loadFoundWords(tab) {
  browser.tabs.executeScript(tab.id, { file: "/getFoundWords.js" }).then(result => {
    console.log(result);
    contentBox.textContent = result[0];
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

/*
When the sidebar loads, get the ID of its window.
*/
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  // updateContent();s
});
