const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let scrollEvent;
let lastWidth;
const targets = [];

const mapping = () => {
  navItems.map(item => {
    // add smoothScroll to onclick event to all navigation links
    const itemTargetId = item.getAttribute(`href`);
    const itemTarget = document.querySelector(itemTargetId); // h4 element
    const targetY = itemTarget.offsetTop - itemTarget.offsetHeight;
    const targetBottomY = itemTarget.offsetTop + itemTarget.parentElement.offsetHeight;

    item.onclick = function (event) {
      // console.log('clicked');
      event.preventDefault();
      scrollToTarget(targetY, document.body.offsetHeight);
    };
    // make an array of [correspondig navItem, top and bottom of the element]
    targets.push([itemTarget, targetY, targetBottomY]);
    console.log(targets);
  });
};

window.addEventListener(`scroll`, (e) => {
  scrollEvent = e;
});

const widthInterval = setInterval(() => {
  if (lastWidth != document.body.offsetWidth) {
    console.log('mapping');
    lastWidth = document.body.offsetWidth;
    mapping();
  }
}, 1500);
