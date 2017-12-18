/* global TweenMax */

const $button = document.querySelector(`button`);
const $menu = document.querySelector(`ul`);
const $menuIts = document.querySelectorAll(`li`);

const getDark = (el, time) => {
  TweenMax.to(el, time, {backgroundColor: `#000`, color: `#fff`});
};

const getLight = (el, time) => {
  TweenMax.to(el, time, {backgroundColor: `#fff`, color: `#000`});
};



$button.addEventListener(`mouseenter`, () => getDark($button, 0.3));

$button.addEventListener(`mouseleave`, () => getLight($button, 0.3));

$button.addEventListener(`click`, () => {
  if ($menu.style.maxHeight > `0px`) {
    TweenMax.to($menu, 0.5, {maxHeight: `0`});
  }
  else {
    TweenMax.to($menu, 0.5, {maxHeight: `${window.getComputedStyle($menu.parentElement).height}`});
  }
});
