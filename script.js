function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function startRoleTyping(options) {
  const el = document.getElementById(options.elId);
  if (!el) return;

  const roles = options.roles || [];
  if (!roles.length) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = roles[roleIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, options.pauseAfter || 1400);
        return;
      }

      setTimeout(type, options.typeSpeed || 90);
      return;
    }

    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, options.pauseBetween || 300);
      return;
    }

    setTimeout(type, options.deleteSpeed || 40);
  };

  type();
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, delay);

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupMagneticButtons() {
  const magnets = document.querySelectorAll(".magnetic");

  magnets.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  startRoleTyping({
    elId: "typed-role",
    roles: ["Frontend Developer", "UI/UX Designer", "Interaction Designer"],
    typeSpeed: 90,
    deleteSpeed: 40,
    pauseAfter: 1500,
    pauseBetween: 400
  });

  setupRevealAnimations();
  setupMagneticButtons();

  const toggle = document.getElementById("darkModeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggle.textContent = document.body.classList.contains("light-mode") ? "Dark" : "Light";
  });
});
