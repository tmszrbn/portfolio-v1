/*global scrollEvent navItems targets*/

const scrollspy = () => {
  let scrollY = scrollEvent ? scrollEvent.pageY : 0;
  let active;

  if (scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
    active = navItems[navItems.length - 1];
  }
  else {
    for (let target of targets) {
      if (target[0].parentElement.getBoundingClientRect().top < scrollY && target[0].parentElement.getBoundingClientRect().bottom > scrollY) {
        active = target[1];
      }
    }
  }
  // TODO give active active class and remove it from the old active!!!
  active ? active.style.color = `red` : null;

};

setInterval(() => {
  scrollspy();
  console.log('interval');}, 200)
