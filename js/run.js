const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let scrollEvent;
let lastBodyHeight;

const mapping = () => {
  const targets = [];
  navItems.map(item => {
    // add smoothScroll to onclick event to all navigation links
    const itemTargetId = item.getAttribute(`href`);
    const itemTarget = document.querySelector(itemTargetId); // h4 element
    const targetY = itemTarget.offsetTop;
    const targetBottomY = itemTarget.parentElement.offsetTop + itemTarget.parentElement.offsetHeight;

    item.onclick = function (event) {
      // console.log('clicked');
      event.preventDefault();
      scrollToTarget(targetY, document.body.offsetHeight);
    };
    // make an array of [correspondig navItem, top and bottom of the element]
    targets.push([itemTarget, targetY, targetBottomY]);
  });
  console.log(targets);
};

window.addEventListener(`scroll`, (e) => {
  scrollEvent = e;
});

const widthInterval = setInterval(() => {
  if (lastBodyHeight != document.body.offsetHeight) {
    console.log('mapping');
    lastBodyHeight = document.body.offsetHeight;
    mapping();
  }
}, 1500);
