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
