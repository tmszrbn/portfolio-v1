const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let currItem;
let pageH;

// speed=pageH for linear step
function smoothScroll(currY, targetY, speed=100) {
  let distance = Math.abs(currY-targetY);
  // computing step could be a function,
  // so it could be used with more optional arguments than just speed
  let step = Math.ceil(distance/pageH*speed)+speed*.05;
  if (currItem == targetY && step < distance) {
    if (currY > targetY+step) {
      step = -step;
    }
    let currBottomY = currY + window.innerHeight;
    if ((currBottomY + step) < pageH) {
      requestAnimationFrame (() => {
        scrollBy(0, step);

        smoothScroll(window.top.pageYOffset, targetY);
      });
    }
    else if (pageH-currBottomY < pageH-targetY) {
      scrollBy(0, pageH-currBottomY);
    }
  }
}

function scroll(toItem) {
  let currY = window.top.pageYOffset;
  const targetY = toItem.offsetTop - toItem.offsetHeight;
  currItem = targetY;
  pageH = document.body.clientHeight;


  smoothScroll(currY, targetY);

}

navItems.map(item => {
  item.onclick = function (event) {
    event.preventDefault();
    const itemTarget = document.getElementById(item.getAttribute(`href`).slice(1));
    scroll(itemTarget, );
  };
});
