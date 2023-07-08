# Scroll Triggered Interaction for a Dev site

This repo is for the development of a scrolltriggered interaction for a Dev site designed by [Gil Huybrecht](https://www.instagram.com/gil.huybrecht/) [here](https://www.instagram.com/p/CuZYNnsM63H/). 

## Table of contents

- [Overview](#overview)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Approach](#approach)
- [Author](#author)
- [Credit](#credit)

## Overview

## My process

### Built with

- HTML5
- CSS3
- JavaScript/GSAP

### Approach

To get the sequencing and timing as close as possible to the design, I downloaded the video and watched it at a playback speed of 0.25. This is an approach I learnt from [Carl](https://twitter.com/snorklTV).

I started by using GSAP to set the total height of the stack(front & back text) wrapper and the bottom wrapper(01 & 02 text) to the height of one of the text (front & 01) respectively:
```js
gsap.set(".stack__wrapper", { height: () => document.querySelector(".stack__wrapper--word").offsetHeight + "px" });
gsap.set(".bottom__wrapper", { height: () => document.querySelector(".first__list").offsetHeight + "px" });
```
The next step was to select all the letters in the words to be animated using the gsap.utils.toArray method.

Then I created the timeliine and tweens for the animation:
```js
// Timeline containing all transform tween
let transformTl = gsap.timeline({ defaults: { stagger: 0.1, ease: "expo.inOut", duration: 1.3, }})
.to(frontendLetter, { yPercent: () => -120 }, 0)
.to(backendLetter, { yPercent: () => -120 }, 0)
.to(firstLetter, { y: () => -document.querySelector(".first__list").offsetHeight + "px" }, 0)
.to(secondLetter, { y: () => -document.querySelector(".first__list").offsetHeight - 3 + "px" }, 0)
```
All tween starts at the same time and I achieved this by using the absolute positioning of "0" on them.

Finally, I created a standalone scrolltrigger and tied the ***transformTl*** timeline to it. 
```js
// Scroll trigger animation to play the timeline
ScrollTrigger.create({
    trigger: ".trigger__animation",
    start: "top 20%",
    animation: transformTl,
    onLeaveBack: () => transformTl.reverse(),
})
```

## Author

- LinkedIn - [Uzochukwu Okafor](https://www.linkedin.com/in/uzochukwuokafor/)
- Twitter - [@uzoway_](https://twitter.com/Uzoway_)

## Credit 

Huge credits goes to [Gil Huybrecht](https://www.instagram.com/gil.huybrecht/)🙌 who created the design which I have coded.
