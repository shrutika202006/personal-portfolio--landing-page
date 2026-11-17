/* =========================
   1. SCROLL PROGRESS BAR
========================= */

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

document.body.appendChild(progressBar);


function updateProgressBar() {

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

    progressBar.style.width = progress + "%";
}


/* =========================
   2. BACK TO TOP BUTTON
========================= */

const backToTop = document.createElement("button");

backToTop.className = "back-to-top";
backToTop.innerHTML = "↑";
backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   3. SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".section-title, .section-text, .skill-card, .project-card, .achievement, .highlight, .hero-content, .hero-card"
);

revealElements.forEach(element => {

    element.classList.add("js-reveal");

});


const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================
   4. ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================
   5. DARK / LIGHT MODE
========================= */

const themeButton = document.createElement("button");

themeButton.className = "theme-toggle";

themeButton.setAttribute("aria-label", "Toggle dark mode");

document.querySelector(".navbar").appendChild(themeButton);


function setTheme(theme) {

    document.body.classList.toggle(
        "dark-theme",
        theme === "dark"
    );

    themeButton.innerHTML =
        theme === "dark" ? "☀️" : "🌙";

    localStorage.setItem("portfolio-theme", theme);

}


const savedTheme = localStorage.getItem("portfolio-theme");

setTheme(savedTheme || "light");


themeButton.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains("dark-theme");

    setTheme(isDark ? "light" : "dark");

});


/* =========================
   6. SCROLL EVENTS
========================= */

function handleScroll() {

    updateProgressBar();

    updateActiveNavigation();

    if (window.scrollY > 350) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener("scroll", handleScroll, {
    passive: true
});


/* =========================
   7. CURRENT YEAR IN FOOTER
========================= */

const yearElement = document.querySelector("#current-year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================
   8. PAGE LOAD
========================= */

document.addEventListener("DOMContentLoaded", () => {

    handleScroll();

});
