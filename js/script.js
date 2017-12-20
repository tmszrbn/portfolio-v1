/* global TweenMax */

const $button = document.querySelector(`button`);
const $menu = document.querySelector(`nav`);
const $menuIts = $menu.children;
const $header = document.querySelector(`header`);
const $navbar = document.querySelector(`#navbar`);

const buttonScroll = $button.offsetTop;
let navbarFixed = false;
let navbarHidden = false;
const menuHeight = $menuIts[0].offsetHeight * $menu.childElementCount;
let lastScroll;
let currScroll;

// show/hide nav links
$button.addEventListener(`click`, () => {
  if ($menu.style.height > `0px`) {
    TweenMax.to($menu, 0.5, {height: `0px`});
  }
  else {
    TweenMax.to($menu, 0.5, {height: `${menuHeight}`});
  }
});

// scrolling on click on menu link
for (let i = 0; i < $menuIts.length; i++) {
  $menuIts[i].onclick =  (e) => {
    e.preventDefault();
    const id = $menuIts[i].getAttribute(`href`);
    TweenMax.to($menu, 0.1, {height: `0px`});

    if (navbarFixed) {
      navbarHide();
      TweenMax.to(window, 1, {scrollTo: `${id}`});
    }
    else {
      TweenMax.to(window, 1, {scrollTo: {
        y:`${`${id}`}`,
        offsetY: `${menuHeight}`}}
      );
    }
  };
}


window.onscroll = () => {
  currScroll = window.pageYOffset;

  // hide menu if scrolled bellow toggle button
  currScroll > buttonScroll + $button.offsetHeight ? TweenMax.to($menu, 0.5, {height: `0px`}) : ``;

  // making navbar position fixed, static and its hide-show behavior while static
  if (currScroll > buttonScroll + $navbar.offsetHeight) {
    if (navbarFixed) {
      if (currScroll > lastScroll) {
        navbarHidden ? `` : navbarHideSmooth();
      }
      else {
        navbarHidden ? navbarShowSmooth() : ``;
      }
    }
    else {
      navbarFix();
      navbarHide();
    }
  }
  else if (currScroll <= buttonScroll) {
    if (navbarFixed) {
      navbarUnfix();
      navbarShow();
    }
  }
  lastScroll = currScroll;
};

// fixing and unfixing navbar
const navbarFix = () => {
  $navbar.style.position = `fixed`;
  $header.style.marginTop = `${$navbar.offsetHeight}px`;
  navbarFixed = true;
};
const navbarUnfix = () => {
  $navbar.style.position = ``;
  $header.style.marginTop = ``;
  navbarFixed = false;
};

// Toggle nav links and button while fixed
const navbarShow = () => {
  $navbar.style.marginTop = ``;
  $menu.style.height = `0px`;
  navbarHidden = false;
};
const navbarShowSmooth = () => {
  TweenMax.to($navbar, 0.3, {marginTop: `+=${$navbar.offsetHeight}px`});
  $menu.style.height = `0px`;
  navbarHidden = false;
};
const navbarHide = () => {
  $navbar.style.marginTop = `-${$navbar.offsetHeight}px`;
  navbarHidden = true;
};
const navbarHideSmooth = () => {
  TweenMax.to($navbar, 0.3, {marginTop: `-${$navbar.offsetHeight}px`});
  navbarHidden = true;
};
