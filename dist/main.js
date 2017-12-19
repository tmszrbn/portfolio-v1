/* global TweenMax */

const $button = document.querySelector(`button`);
const $menu = document.querySelector(`nav`);
const $menuIts = document.querySelectorAll(`a`);
const $header = document.querySelector(`header`);

const getDarker = (el, time) => {
  TweenMax.to(el, time, {backgroundColor: `#000`, color: `#fff`});
};

const getLighter = (el, time) => {
  TweenMax.to(el, time, {backgroundColor: `#fff`, color: `#000`});
};

$button.addEventListener(`click`, () => {
  if ($menu.style.height > `0px`) {
    TweenMax.to($menu, 0.5, {height: `0px`});
  }
  else {
    TweenMax.to($menu, 0.5, {height: `${$menuIts[0].offsetHeight * $menu.childElementCount}`});
  }
});
