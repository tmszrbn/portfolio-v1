let currItem; // must be global so the recursion in smoothScroll will stop when scroll() called while running

function smoothScroll(targetY, pageH, speed=100) {
  const currY = window.top.pageYOffset;
  const distance = Math.abs(currY-targetY);
  // computing step could be a function,
  // so it could be used with more optional arguments than just speed
  let step = Math.ceil(distance/pageH*speed)+speed*.05;
  // stop recursion if scroll() called again
  if (currItem == targetY && step < distance) {
    if (currY > targetY+step) {
      step = -step;
    }
    const currBottomY = currY + window.innerHeight;
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

const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));

navItems.map(item => {
  // add smoothScroll to onclick event to all navigation links
  item.onclick = function (event) {
    event.preventDefault();
    const itemTarget = document.getElementById(item.getAttribute(`href`).slice(1));
    scroll(itemTarget);
  };
});
