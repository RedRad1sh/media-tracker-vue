const tabLinks = document.querySelectorAll(".tabs a");
console.log(tabLinks);
const tabPanels = document.querySelectorAll(".tabs-panel");
console.log(tabPanels);
for(let el of tabLinks) {
  el.addEventListener("click", e => {
    e.preventDefault();
    
    const classList = document.querySelector('.tabs li.tabbase-active').classList
    classList.remove("tabbase-active");
    classList.add("tabbase");
    document.querySelector('.tabs-panel.active').classList.remove("active");
    const parentListItem = el.parentElement;
    parentListItem.classList.remove("tabbase");
    parentListItem.classList.add("tabbase-active");
    const index = [...parentListItem.parentElement.children].indexOf(parentListItem);
    
    const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
    panel[0].classList.add("active");
    console.log("Switch tab to " + index);
  });
}
