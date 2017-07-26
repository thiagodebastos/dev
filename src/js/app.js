import TimelineLite from "gsap/TimelineLite";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollMagic from "scrollmagic";

//
// ─── SMOOTH SCROLLING ───────────────────────────────────────────────────────────
//

function Scroller(scrollElement, scrollTarget) {
  const TL = new TimelineLite({});
  scrollElement.addEventListener("click", evt => {
    evt.preventDefault();
    TL.to(window, 0.5, { scrollTo: scrollTarget });
  });
}

// Scroller(scrollDownButton, '#content')

//
// ─── NUMBER INCREASE ANIMATION ──────────────────────────────────────────────────
//

function Counter() {
  this.value = 0;
}
// querySelectorAll returns a NodeList, not an array.
// spread over the nodelist into a new array, so we can call map()
function nodeListToArray(nodeList) {
  return [...document.querySelectorAll(nodeList)];
}

function animateNumbers(element, val) {
  /*  we need to keep track of each animation by generating a new counter for
        each, we save ourselves from declaring variables for each.*/
  let counter = new Counter();
  const TL = new TimelineLite();
  TL.to(
    counter,
    1,
    {
      value: val,
      roundProps: "value",
      onUpdate: () => updateHandler(element, counter.value),
      ease: Power1.easeIn
    },
    0
  );
}

function updateHandler(el, counter) {
  el.innerHTML = Math.round(counter * 10) / 10;
}

function animateNumberArray(target, stats) {
  target.map((el, i) => {
    animateNumbers(target[i], stats[i], i);
  });
}

//
// ─── SCROLLMAGIC ────────────────────────────────────────────────────────────────
//

function scrollMagicAnimations(externlAnimation) {
  let targets, controller;

  function animateEverything(thingsToAnimate, externlAnimation) {
    controller = new ScrollMagic.Controller();
    thingsToAnimate.map(target => {
      new ScrollMagic.Scene({
        triggerElement: target.triggerNode,
        reverse: false
      })
        .on("start", function() {
          return externlAnimation(target.animationTarget, target.stats);
        })
        .addTo(controller);
    });
  }

  function init() {
    targets = [
      {
        triggerNode: "#stats_00",
        animationTarget: nodeListToArray("#stats_00 .stat-number"),
        stats: [51.6, 40.2, 43.9]
      },
      {
        triggerNode: "#stats_01",
        animationTarget: nodeListToArray("#stats_01 .stat-number"),
        stats: [48.9, 43.9, 49.9]
      },
      {
        triggerNode: "#stats_02",
        animationTarget: nodeListToArray("#stats_02 .stat-number"),
        stats: [37.3, 24.2, 42.2]
      },
      {
        triggerNode: "#stats_03",
        animationTarget: nodeListToArray("#stats_03 .stat-number"),
        stats: [32.2, 33.5, 41.6]
      }
    ];

    // animateEverything(targets, animateNumberArray);
  }

  return {
    init: init()
  };
}

//
// ─── APP ────────────────────────────────────────────────────────────────────────
//

function App() {
  scrollDownButton = document.querySelector(".scroll-down");
  Scroller(scrollDownButton, "#content");
  scrollMagicAnimations(animateNumberArray).init;
}

let scrollDownButton;

App();
