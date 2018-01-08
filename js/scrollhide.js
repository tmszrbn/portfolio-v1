const scrollhide = (element, lastScroll, currentScroll, className, isHidden) => {
  if (lastScroll != currentScroll) {
    if (isHidden) {
      lastScroll > currentScroll ? element.classList.remove(className) : null;
    }
    else {
      lastScroll < currentScroll ? element.classList.add(className) : null;
    }
  }
};
