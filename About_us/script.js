// 0. Load Shared Components (nav + footer)
function loadComponent(placeholderId, path) {
    var el = document.getElementById(placeholderId);
    if (!el) return;
    fetch(path || el.getAttribute('data-path'))
        .then(function(r) { return r.text(); })
        .then(function(html) {
            el.innerHTML = html;
            el.querySelectorAll('script').forEach(function(s) {
                var ns = document.createElement('script');
                ns.textContent = s.textContent;
                document.body.appendChild(ns);
            });
        })
        .catch(console.error);
}
loadComponent('navbar-placeholder');
loadComponent('footer-placeholder');

// 1. Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// 3. Horizontal Scroll for Capabilities
const track = document.querySelector(".horizontal-track");
const horizontalSec = document.querySelector(".capabilities-horizontal");

gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: horizontalSec,
        start: "top top",
        end: () => "+=" + track.scrollWidth,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
    }
});

// 4. Color Theme Switcher
const sections = document.querySelectorAll("section[data-theme]");
sections.forEach((sec) => {
    const theme = sec.getAttribute("data-theme");
    ScrollTrigger.create({
        trigger: sec,
        start: "top 50%",
        onEnter: () => document.body.className = `theme-${theme}`,
        onEnterBack: () => document.body.className = `theme-${theme}`,
    });
});

// 5. Entrance Animations
gsap.from(".reveal-text", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});

// 6. Sticky Section Text Reveals
const reveals = document.querySelectorAll(".lead-text, .diff-item");
reveals.forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1
    });
});