function createListOfAnswers() {
  const list = document.createElement('ul');
  list.className = "hidden-answers-list";
  list.setAttribute('hidden', true);
  
  return list;
}

function populateListWithAnswers(listNode) {
  const answers = window.gameData.yesterday.answers;
  
  answers.forEach(answer => {
    const item = document.createElement('li');
    item.textContent = answer;
  
    listNode.appendChild(item);
  });
}

const hiddenAnswers = createListOfAnswers();
populateListWithAnswers(hiddenAnswers);

const body = document.getElementsByTagName('body')[0];
body.appendChild(hiddenAnswers);
