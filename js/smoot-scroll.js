const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let currItem;

function smoothScroll(currY, targetY, interval, step=10) {
  if (currItem == targetY && step < Math.abs(currY-targetY)) {
    if (currY > targetY+step) {
      step = -step;
    }
    setTimeout (() => {
      scrollBy(0, step);
      smoothScroll(window.top.pageYOffset, targetY);
    }, interval);
  }
}

function scroll(toItem, interval=20) {
  let currY = window.top.pageYOffset;
  const targetY = toItem.offsetTop - toItem.offsetHeight;
  // cancel previous smoothScroll
  currItem = targetY;

  smoothScroll(currY, targetY, interval);

}

navItems.map(item => {
  item.onclick = function (event) {
    event.preventDefault();
    const itemTarget = document.getElementById(item.getAttribute(`href`).slice(1));
    scroll(itemTarget, );
  };
});
