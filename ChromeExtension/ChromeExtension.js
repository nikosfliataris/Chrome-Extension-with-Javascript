const inputBtn = document.getElementById("input-btn");
const deletBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
let ulEL = document.getElementById("ul-list");
let leads = JSON.parse(localStorage.getItem("myLeads"));

////////////////////////////////////////////////

if (leads) {
  myLeads = leads;
  renderLeads(myLeads);
}
function renderLeads(leads) {
  let listItems = [];
  for (let i = 0; i < leads.length; i++) {
    /* listItems +=
      "<li> <a target='_blank' href='" +
      myLeads[i] +
      "'>" +
      myLeads[i] +
      "</li></a>";*/
    listItems += `
      <li> 
      <a target="_blank" href="${leads[i]}"> 
      ${leads[i]}
      </a>
      </li>`;
  }

  ulEL.innerHTML = listItems;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderGame(myLeads);
  });
});

deletBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEl.value = "";
  renderLeads(myLeads);
});

/*for (let i = 0; i < myLeads.length; i++) {
  // ulEL.innerHTML += "<li>" + myLeads[i] + "</li>";
  const li = document.createElement("li");
  li.textContent = myLeads[i];
}
ulEL.append(li);
*/
