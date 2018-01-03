/*global navItems*/
const targets = [];
let stickyDif = 0;
let pageY;
let lastY;
let linksTop;
const $links = document.querySelector(`.links`);
let linksH = $links.offsetHeight;
let currActive = navItems[0];
let activeClass =  `links__item--active`;

// get targets
navItems.map(item => {
  const href = item.getAttribute(`href`);
  const target = document.getElementById(href.slice(1));
  const top = target.parentElement.offsetTop;
  const height = target.parentElement.offsetHeight;
  targets.push([target, top, top+height]);
});

const changeClass = (elem) => {
  elem.className += ` ${activeClass}`;
  currActive.classList.remove(`${activeClass}`);
  currActive = elem;
};

const detect = () => {
  pageY = window.pageYOffset;
  // console.log(pageY);
  pageY > 30 && pageY < 60 ? linksTop = $links.offsetTop : null;
  if (pageY > linksTop) {
    // console.log(stickyDif)
    stickyDif = stickyDif + (lastY - pageY);
    if (stickyDif < 0 - linksH) {
      // console.log(`reset to linksH`);
      $links.style.top = `${-linksH}px`;
      stickyDif = 0 - linksH;
    } else if (stickyDif < 0){
      $links.style.top = `${stickyDif}px`;
    } else  {
      console.log(`reset`, stickyDif);
      stickyDif = 0;
      $links.style.top = `0px`
    }
  }
  for (let i in targets) {
    if (pageY > targets[i][1] && pageY < targets[i][2]) {
      // console.log(pageY, targets[i][2]);
      const elem = navItems[i];
      if (elem !== currActive) {
        changeClass(elem);
        // console.log("changed");
        break;
      }
    }
  }
  lastY = pageY;
};

const continous = requestAnimationFrame(window.onscroll = detect);
