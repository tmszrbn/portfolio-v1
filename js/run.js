const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let scrollEvent;
let lastBodyHeight;
let lastScroll;
const targets = [];
let navY;

const mapping = () => {
  targets.length = 0;
  navItems.map(item => {
    // add smoothScroll to onclick event to all navigation links
    const itemTargetId = item.getAttribute(`href`);
    const itemTarget = document.querySelector(itemTargetId); // h4 element
    const targetY = itemTarget.offsetTop;
    const targetBottomY = itemTarget.parentElement.offsetTop + itemTarget.parentElement.offsetHeight;

    item.addEventListener(`click`, (event) => {
      event.preventDefault();
      scrollToTarget(targetY, document.body.offsetHeight);
    });
    // make an array of [navItem, corresponding top and bottom of the element]
    targets.push([item, targetY, targetBottomY]);
  });
  navY = document.querySelector(`header`).offsetHeight;
};

window.addEventListener(`scroll`, (e) => {
  scrollEvent = e; // has to be for smoothScroll
  scrollspy(targets, e.pageY);
});


const widthInterval = setInterval(() => {
  if (lastBodyHeight != document.body.offsetHeight) {
    lastBodyHeight = document.body.offsetHeight;
    mapping();
  }

  const currScroll = scrollEvent ? scrollEvent.pageY : 0;
  const elementToHide = document.querySelector(`nav`);
  const navHideClass = `links--hidden`;
  if (navY < currScroll) {
    const navHidden = elementToHide.classList.contains(navHideClass);
    scrollhide(elementToHide, lastScroll, currScroll, navHideClass, navHidden);
    lastScroll = currScroll;
  } else if (elementToHide.classList.contains(navHideClass)) {
    elementToHide.classList.remove(navHideClass)
  }
}, 500);
