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

// 1. Smooth Scroll (Lenis)
const lenis = new Lenis({
    lerp: 0.1, // Adjust for smoothness (0.1 is very smooth)
    wheelMultiplier: 1,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".s-card");

cards.forEach((card, i) => {
    // Only animate cards that have another card coming AFTER them
    if (i < cards.length - 1) {
        gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top 10%",    // When card hits the sticky point
                end: "bottom 10%",   // Until next card reaches it
                scrub: true,         // Links animation to scroll speed
            }
        });
    }
});

// 3. Final CTA Reveal
gsap.to(".cta-reveal-bg", {
    y: "0%",
    scrollTrigger: {
        trigger: ".final-cta",
        start: "top bottom",
        end: "top top",
        scrub: true,
    }
});