// Set the height of the wrappers to the height of each word
gsap.set(".stack__wrapper", { height: () => document.querySelector(".stack__wrapper--word").offsetHeight + "px" });
gsap.set(".bottom__wrapper", { height: () => document.querySelector(".first__list").offsetHeight + "px" });

// Get all letters in the stack and list item
const frontendLetter = gsap.utils.toArray(".letter");
const backendLetter = gsap.utils.toArray(".back__letter");
const firstLetter = gsap.utils.toArray(".first__list--letter");
const secondLetter = gsap.utils.toArray(".second__list--letter");

// Timeline containing all transform tween
let transformTl = gsap.timeline({ defaults: { stagger: 0.1, ease: "expo.inOut", duration: 1.3, }})
.to(frontendLetter, { yPercent: () => -120 }, 0)
.to(backendLetter, { yPercent: () => -120 }, 0)
.to(firstLetter, { y: () => -document.querySelector(".first__list").offsetHeight + "px" }, 0)
.to(secondLetter, { y: () => -document.querySelector(".first__list").offsetHeight - 3 + "px" }, 0)

// Scroll trigger animation to play the timeline
ScrollTrigger.create({
    trigger: ".trigger__animation",
    start: "top 20%",
    animation: transformTl,
    onLeaveBack: () => transformTl.reverse(),
})


// Get all accordion buttons and contents
const accordionButtons = document.querySelectorAll('.accordion__button');
const accordionContents = document.querySelectorAll('.accordion__content');

// Add click event listener to each accordion button
accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the corresponding content element
    const content = button.parentNode.nextElementSibling;

    // Toggle the active class for the clicked button and content
    button.classList.toggle('active');
    content.classList.toggle('active');

    // Close other open accordions
    accordionContents.forEach(item => {
      if (item !== content) {
        item.classList.remove('active');
        item.previousElementSibling.querySelector('.accordion__button').classList.remove('active');
      }
    });
  });
});

// initialize and set up Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
