/* global TweenMax */

const $button = document.querySelector(`button`);
const $menu = document.querySelector(`nav`);
const $menuIts = $menu.children;
const $header = document.querySelector(`header`);

const menuItsColors = [];
let menuHeight = $menuIts[0].offsetHeight * $menu.childElementCount;

$button.addEventListener(`click`, () => {
  if ($menu.style.height > `0px`) {
    TweenMax.to($menu, 0.5, {height: `0px`});
  }
  else {
    TweenMax.to($menu, 0.5, {height: `${menuHeight}`});
  }
});

for (let i = 0; i < $menuIts.length; i++) {
  $menuIts[i].addEventListener(`click`, (e) => {
    e.preventDefault();
    TweenMax.to($menu, 0.1, {height: `0px`});
    TweenMax.to(window, 1, {scrollTo: {
      y:`${$menuIts[i].getAttribute(`href`)}`,
      offsetY: `${menuHeight}`}});
  });
}
