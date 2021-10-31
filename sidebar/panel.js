// From https://github.com/mdn/webextensions-examples/tree/master/annotate-page/sidebar

let myWindowId;
let parentWindow;
const contentBox = document.querySelector("#content");

/*
Make the content box editable as soon as the user mouses over the sidebar.
*/
window.addEventListener("mouseover", () => {
  updateContent();
});

/*
When the user mouses out, save the current contents of the box.
*/
// window.addEventListener("mouseout", () => {
//   contentBox.setAttribute("contenteditable", false);
//   browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
//     let contentToStore = {};
//     contentToStore[tabs[0].url] = contentBox.textContent;
//     browser.storage.local.set(contentToStore);
//   });
// });

/*
Update the sidebar's content.
1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
function updateContent() {

  function executeScript(tab) {
    // const script = 'console.log("Bep"); "BeP"'
    const script = "document.querySelector('ul.sb-wordlist-items-pag').innerText;"
    browser.tabs.executeScript(tab.id, { code: script }).then(result => {
      console.log(result);
      contentBox.textContent = result[0];
    });
  }

  function executeScriptFromFile(tab) {
    browser.tabs.executeScript(tab.id, { file: "/getFoundWords.js" }).then(result => {
      console.log(result);
      contentBox.textContent = result[0];
    });
  }

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      console.log("updateTabs");
      
      // executeScript(currentTab);
      executeScriptFromFile(currentTab);
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
  // browser.tabs.query({windowId: myWindowId, active: true})
  //   .then((tabs) => {
  //     return browser.storage.local.get(tabs[0].url);
  //   })
  //   .then((storedInfo) => {
  //     contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
  //   });

  // const backgroundWindow = browser.runtime.getBackgroundPage();
}

/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
browser.tabs.onUpdated.addListener(updateContent);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  console.log(`myWindowId: ${myWindowId}`)
  parentWindow = this.parent
  console.log(`parentId: ${parentWindow.id}`)
  updateContent();
});
