const scrollhide = (lastScroll, currentScroll, isHidden, element=document.querySelector(`nav`), className=`navbar--hidden`) => {
  if (lastScroll != currentScroll) {
    if (isHidden) {
      lastScroll > currentScroll ? element.classList.remove(className) : null;
    }
    else {
      lastScroll < currentScroll ? element.classList.add(className) : null;
    }
  }
};
