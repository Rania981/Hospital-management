document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation if it's a stats item
                if (entry.target.classList.contains('impact-container')) {
                    startCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // ─── Journey Steps — Staggered One-By-One Animation ───────────────────
    const journeySteps = document.querySelectorAll('.journey-step-anim');

    if (journeySteps.length > 0) {
        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal steps one by one with 350ms gaps
                    journeySteps.forEach((step, index) => {
                        setTimeout(() => {
                            step.classList.add('step-visible');
                        }, index * 400);
                    });
                    journeyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Observe the parent container
        const journeyContainer = document.getElementById('journeySteps');
        if (journeyContainer) journeyObserver.observe(journeyContainer);
    }

    // Counter Animation function
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^0-9]/g, '');

                // Lower inc to slow and higher to speed up
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    let nextVal = Math.ceil(count + inc);
                    if (nextVal > target) nextVal = target;

                    const suffix = counter.getAttribute('data-suffix') || '';

                    // Format number with commas
                    const formatted = nextVal.toLocaleString();
                    counter.innerText = formatted + suffix;

                    // Call function every ms
                    setTimeout(updateCount, 15);
                } else {
                    const suffix = counter.getAttribute('data-suffix') || '';
                    counter.innerText = target.toLocaleString() + suffix;
                }
            };

            // Set initial state
            counter.innerText = '0' + (counter.getAttribute('data-suffix') || '');
            updateCount();
        });
    }
});

