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

/*global scrollEvent*/
let currItem; // must be global so the recursion in smoothScroll will stop when scrollToTarget() called while running

const smoothScroll = (targetY, pageH, speed=100) => {
  const currentScroll = (scrollEvent) ? scrollEvent.pageY : 0;
  const distance = Math.abs(currentScroll-targetY);
  // computing step could be a function,
  // so it could be used with more optional arguments than just speed
  let step = Math.ceil(distance/pageH*speed)+speed*.04;
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
let active;
const scrollspy = (targets, pageY) => {
  if (pageY + innerHeight >= lastBodyHeight-10) {
    active ? active.classList.remove(`links__item--active`) : null;
    active = targets[targets.length-1][0];
    active.classList.add(`links__item--active`);
  }
  else if (pageY > document.querySelector(`header`).offsetHeight){
    for (let target of targets) {
      if (!target[0].classList.contains(`links__item--active`)) {
        if (target[1] < pageY && target[2] > pageY) {
          active ? active.classList.remove(`links__item--active`) : null;
          active = target[0];
          active.classList.add(`links__item--active`);
          break;
        }
      }
    }
  } else if (active) {
    active.classList.remove(`links__item--active`);
  }
};

const scrollhide = (element, lastScroll, currentScroll, className, isHidden) => {
  if (lastScroll != currentScroll) {
    if (isHidden) {
      lastScroll > currentScroll ? element.classList.remove(className) : null;
    }
    else {
      lastScroll < currentScroll ? element.classList.add(className) : null;
    }
  }
};
