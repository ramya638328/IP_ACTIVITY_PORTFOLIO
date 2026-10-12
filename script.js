
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const typingText = document.getElementById("typingText");
const backToTop = document.getElementById("backToTop");

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Animated job titles
const roles = [
    "Web Developer",
    "Programmer",
    "Creative Thinker",
    "Tech Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function animateRole() {
    const currentRole = roles[roleIndex];

    typingText.textContent = currentRole.substring(0, charIndex);

    if (!deleting) {
        charIndex++;

        if (charIndex > currentRole.length) {
            deleting = true;
            setTimeout(animateRole, 1300);
            return;
        }
    } else {
        charIndex--;

        if (charIndex < 0) {
            charIndex = 0;
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(animateRole, deleting ? 45 : 90);
}

animateRole();

// Highlight the current section in navigation
const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
        }
    });

    navItems.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentSection}`;
        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    backToTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("load", updateActiveLink);

// Back-to-top button
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Contact form: open the visitor's default email application
document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !message) {
        formMessage.textContent = "Please complete all fields.";
        return;
    }

    // Replace this with your actual email address.
    const recipient = "your.email@example.com";
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formMessage.textContent = "Opening your email application...";

    window.location.href =
        `mailto:${recipient}?subject=${subject}&body=${body}`;
});
