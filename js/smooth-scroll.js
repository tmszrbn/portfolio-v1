/*global scrollEvent*/
let currItem; // must be global so the recursion in smoothScroll will stop when scrollToTarget() called while running

const smoothScroll = (targetY, pageH, speed=100) => {
  const currentScroll = (scrollEvent) ? scrollEvent.pageY : 0;
  const distance = Math.abs(currentScroll-targetY);
  // computing step could be a function,
  // so it could be used with more optional arguments than just speed
  let step = Math.ceil(distance/pageH*speed)+speed*.03;
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
