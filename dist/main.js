const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let scrollEvent;
const targets = [];

navItems.map(item => {
  // add smoothScroll to onclick event to all navigation links
  const itemTargetId = item.getAttribute(`href`);
  const itemTarget = document.querySelector(itemTargetId);
  item.onclick = function (event) {
    // console.log('clicked');
    event.preventDefault();
    scroll(itemTarget, document.body.offsetHeight);
  };
  console.log(itemTarget);
  targets.push([itemTarget, item]);
});

window.addEventListener(`scroll`, (e) => {
  scrollEvent = e;
});

/*global scrollEvent*/
let currItem; // must be global so the recursion in smoothScroll will stop when scroll() called while running

function smoothScroll(targetY, pageH, speed=100) {
  const currentScroll = (scrollEvent) ? scrollEvent.pageY : 0;
  const distance = Math.abs(currentScroll-targetY);
  // computing step could be a function,
  // so it could be used with more optional arguments than just speed
  let step = Math.ceil(distance/pageH*speed)+speed*.05;
  // stop recursion if scroll() called again
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
function scroll(toItem) {
  const targetY = toItem.offsetTop - toItem.offsetHeight;
  currItem = targetY; // sets global property to stop the recursion if scroll() called again
  let pageH = document.body.clientHeight;

  smoothScroll(targetY, pageH);
}

/*global scrollEvent navItems targets*/

const scrollspy = () => {
  let scrollY = scrollEvent ? scrollEvent.pageY : 0;
  let active;

  if (scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
    active = navItems[navItems.length - 1];
  }
  else {
    for (let target of targets) {
      if (target[0].parentElement.getBoundingClientRect().top < scrollY && target[0].parentElement.getBoundingClientRect().bottom > scrollY) {
        active = target[1];
      }
    }
  }
  // TODO give active active class and remove it from the old active!!!
  active ? active.style.color = `red` : null;

};

setInterval(() => {
  scrollspy();
  console.log('interval');}, 200)
