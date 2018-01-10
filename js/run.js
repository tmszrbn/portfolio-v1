const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let scrollEvent, lastBodyHeight, lastScroll, navY;
const targets = [];
const navH = document.querySelector(`nav`).offsetHeight;
const classDefocused = `navbar__item--defocused`;

const mapping = () => {
  targets.length = 0;
  navItems.map(item => {
    // add smoothScroll to onclick event to all navigation links
    const itemTargetId = item.getAttribute(`href`);
    const itemTarget = document.querySelector(itemTargetId); // h4 element
    const targetY = itemTarget.offsetTop - itemTarget.offsetHeight;
    const targetBottomY = itemTarget.parentElement.offsetTop + itemTarget.parentElement.offsetHeight - 20;

    item.addEventListener(`click`, (event) => {
      event.preventDefault();
      scrollToTarget(targetY + 20, document.body.offsetHeight); // + 20 in order to prevent scrollspy from making selecting as active element above
      document.querySelector(`.${classDefocused}`).classList.remove(classDefocused);
    });
    // make an array of [navItem, corresponding top and bottom of the element]
    targets.push([item, targetY, targetBottomY]);
  });
  navY = document.querySelector(`header`).offsetHeight;
};

window.addEventListener(`scroll`, (e) => {
  document.querySelector(`:focus`).classList.add(classDefocused);
  scrollspy(targets, pageYOffset, navH);
});

const widthInterval = setInterval(() => {
  // check if the width has changed
  if (lastBodyHeight != document.body.offsetHeight) {
    lastBodyHeight = document.body.offsetHeight;
    mapping();
  }

  // hide navbar if user scrolls down
  const currScroll = pageYOffset;
  const $nav = document.querySelector(`nav`);
  const navHideClass = `navbar--hidden`;
  if (navY < currScroll) {
    const navHidden = $nav.classList.contains(navHideClass);
    scrollhide(lastScroll, currScroll, navHidden);
    lastScroll = currScroll;
  } else if ($nav.classList.contains(navHideClass)) {
    $nav.classList.remove(navHideClass);
  }
}, 500);
