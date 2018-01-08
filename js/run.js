const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let scrollEvent;
let lastBodyHeight;
const targets = [];

const mapping = () => {
  targets.length = 0;
  navItems.map(item => {
    // add smoothScroll to onclick event to all navigation links
    const itemTargetId = item.getAttribute(`href`);
    const itemTarget = document.querySelector(itemTargetId); // h4 element
    const targetY = itemTarget.offsetTop;
    const targetBottomY = itemTarget.parentElement.offsetTop + itemTarget.parentElement.offsetHeight;

    item.addEventListener(`click`, (event) => {
      // console.log('clicked');
      event.preventDefault();
      scrollToTarget(targetY, document.body.offsetHeight);
    });
    // make an array of [navItem, corresponding top and bottom of the element]
    targets.push([item, targetY, targetBottomY]);
  });
  console.log(targets);
};


const widthInterval = setInterval(() => {
  if (lastBodyHeight != document.body.offsetHeight) {
    console.log('mapping');
    lastBodyHeight = document.body.offsetHeight;
    mapping();
  }
}, 1500);

window.addEventListener(`scroll`, (e) => {
  scrollEvent = e; // has to be for smoothScroll
  scrollspy(targets, e.pageY);
});
