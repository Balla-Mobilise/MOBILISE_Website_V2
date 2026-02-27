const steps = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-trigger');
const liquid = document.querySelector('.liquid-layer');
const currentStepUI = document.getElementById('current-step');
let currentIdx = 0;

nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Liquid Transition Up
        gsap.to(liquid, {
            top: 0,
            duration: 0.6,
            ease: "power4.inOut",
            onComplete: () => {
                // Change Step
                steps[currentIdx].classList.remove('active');
                currentIdx++;
                steps[currentIdx].classList.add('active');
                if (currentStepUI) {
                    currentStepUI.innerText = `0${currentIdx + 1}`;
                }

                // Liquid Transition Away
                gsap.to(liquid, {
                    top: "-100%",
                    duration: 0.6,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.set(liquid, { top: "100%" });
                    }
                });
            }
        });
    });
});

function loadComponent(placeholderId, path) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    const src = path || el.getAttribute('data-path');
    fetch(src)
        .then(r => { if (!r.ok) throw new Error('Failed to load ' + src); return r.text(); })
        .then(html => {
            el.innerHTML = html;
            el.querySelectorAll('script').forEach(function (s) {
                var ns = document.createElement('script');
                ns.textContent = s.textContent;
                document.body.appendChild(ns);
            });
        })
        .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar-placeholder');
    loadComponent('footer-placeholder');
});