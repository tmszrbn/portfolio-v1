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

/*global scrollEvent*/
let currItem; // must be global so the recursion in smoothScroll will stop when scrollToTarget() called while running

const smoothScroll = (targetY, pageH, speed=100) => {
  const currentScroll = (scrollEvent) ? scrollEvent.pageY : 0;
  const distance = Math.abs(currentScroll-targetY);
  // computing step could be a function,
  // so it could be used with more optional arguments than just speed
  let step = Math.ceil(distance/pageH*speed)+speed*.05;
  // stop recursion if scrollToTarget() called again
  if (currItem == targetY && step < distance) {
    if (currentScroll > targetY+step) {
      step = -step;
    }
    const currBottomY = currentScroll + window.innerHeight;
    // scrollBy(0, step) if view still in the page
    if ((currBottomY + step) < pageH) {
      requestAnimationFrame (() => {
        scrollBy(0, step);
        smoothScroll(targetY, pageH);
      });
    }
    // scroll to the bottom if page bottom is closer than targetY
    else if (pageH-currBottomY < pageH-targetY) {
      scrollBy(0, pageH-currBottomY);
    }
  }
}

// prepares and runs the scrolling
const scrollToTarget = (targetY, pageH) => {
  currItem = targetY; // sets global property to stop the recursion if scrollToTarget() called again
  smoothScroll(targetY, pageH);
};

/*global scrollEvent navItems targets*/
