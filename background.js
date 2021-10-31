// Based off of https://github.com/mdn/webextensions-examples/blob/master/bookmark-it/background.js

function executeScript(tab) {
  const script = 'console.log("Bep")'
  browser.tabs.executeScript(tab.id, { code: script });
}

function updateActiveTab() {
  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      console.log("updateTabs");
      
      executeScript(currentTab);
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

browser.browserAction.onClicked.addListener(updateActiveTab);

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

updateActiveTab();
