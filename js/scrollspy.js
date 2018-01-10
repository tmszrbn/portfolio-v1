/*global scrollEvent navItems targets*/
let active;
const scrollspy = (targets, pageY, navH=0, activeClass=`navbar__item--active`) => {
  if (pageY + innerHeight >= lastBodyHeight) {
    active ? active.classList.remove(activeClass) : null;
    active = targets[targets.length-1][0];
    active.classList.add(activeClass);
  }
  else if (pageY > document.querySelector(`header`).offsetHeight){
    for (let target of targets) {
      if (!target[0].classList.contains(activeClass)) {
        if (target[1] < pageY && target[2] > pageY + navH) {
          active ? active.classList.remove(activeClass) : null;
          active = target[0];
          active.classList.add(activeClass);
          break;
        }
      }
    }
  } else if (active) {
    active.classList.remove(activeClass);
  }
};
