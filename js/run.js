const navItems = Array.from(document.querySelectorAll(`[href^="#"]`));
let currentScroll;

window.addEventListener(`scroll`, function (e) {
  currentScroll = e.pageY;
}

navItems.map(item => {
  // add smoothScroll to onclick event to all navigation links
  item.onclick = function (event) {
    event.preventDefault();
    const itemTarget = document.getElementById(item.getAttribute(`href`).slice(1));
    scroll(itemTarget);
  };
});
