const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let scrollEvent, lastBodyHeight, lastScroll, navY;
const targets = [];
const navH = document.querySelector(`nav`).offsetHeight;

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
    });
    // make an array of [navItem, corresponding top and bottom of the element]
    targets.push([item, targetY, targetBottomY]);
  });
  navY = document.querySelector(`header`).offsetHeight;
};

window.addEventListener(`scroll`, (e) => {
  scrollEvent = e; // for smoothScroll
  scrollspy(targets, e.pageY, navH);
});

const widthInterval = setInterval(() => {
  // check if the width has changed
  if (lastBodyHeight != document.body.offsetHeight) {
    lastBodyHeight = document.body.offsetHeight;
    mapping();
  }

  // hide navbar if user scrolls down
  const currScroll = scrollEvent ? scrollEvent.pageY : 0;
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

/*global scrollEvent*/
let currItem; // must be global so the recursion in smoothScroll will stop when scrollToTarget() called while running

const smoothScroll = (targetY, pageH, speed=3) => {
  const currentScroll = (scrollEvent) ? scrollEvent.pageY : 0;
  const distance = Math.abs(currentScroll-targetY);
  // computing step could be a function,
  // so it could be used with more optional arguments than just speed
  let step = Math.ceil(distance/pageH*speed)+speed;
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
const scrollspy = (targets, pageY, navH=0, activeClass=`navbar__item--active`) => {
  if (pageY + innerHeight >= lastBodyHeight) {
    active ? active.classList.remove(activeClass) : null;
    active = targets[targets.length-1][0];
    active.classList.add(activeClass);
  }
  else if (pageY > document.querySelector(`header`).offsetHeight){
    for (let target of targets) {
      if (!target[0].classList.contains(activeClass)) {
        if (target[1] < pageY && target[2] > pageY + navH) {
          active ? active.classList.remove(activeClass) : null;
          active = target[0];
          active.classList.add(activeClass);
          break;
        }
      }
    }
  } else if (active) {
    active.classList.remove(activeClass);
  }
};

const scrollhide = (lastScroll, currentScroll, isHidden, element=document.querySelector(`nav`), className=`navbar--hidden`) => {
  if (lastScroll != currentScroll) {
    if (isHidden) {
      lastScroll > currentScroll ? element.classList.remove(className) : null;
    }
    else {
      lastScroll < currentScroll ? element.classList.add(className) : null;
    }
  }
};
