/*global scrollEvent navItems targets*/
let active;
const scrollspy = (targets, pageY) => {
  if (pageY + innerHeight >= lastBodyHeight-10) {
    active ? active.classList.remove(`links__item--active`) : null;
    active = targets[targets.length-1][0];
    active.classList.add(`links__item--active`);
  } else {
    for (let target of targets) {
      if (active !== target[0]) {
        if (target[1] < pageY) {
          if (target[2] > pageY) {
            active ? active.classList.remove(`links__item--active`) : null;
            active = target[0];
            active.classList.add(`links__item--active`);
            break;
          }
        }
      }
    }
  }
  // console.log(active);
};
