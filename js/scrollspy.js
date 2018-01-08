/*global scrollEvent navItems targets*/
let active;
const scrollspy = (targets, pageY) => {
  if (pageY + innerHeight >= lastBodyHeight-10) {
    active ? active.classList.remove(`links__item--active`) : null;
    active = targets[targets.length-1][0];
    active.classList.add(`links__item--active`);
  }
  else if (pageY > document.querySelector(`header`).offsetHeight){
    for (let target of targets) {
      if (!target[0].classList.contains(`links__item--active`)) {
        if (target[1] < pageY && target[2] > pageY) {
          active ? active.classList.remove(`links__item--active`) : null;
          active = target[0];
          active.classList.add(`links__item--active`);
          break;
        }
      }
    }
  } else if (active) {
    active.classList.remove(`links__item--active`);
  }
};
