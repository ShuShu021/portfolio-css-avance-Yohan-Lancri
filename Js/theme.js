document.addEventListener("DOMContentLoaded", () => {
  const cartesProjets = document.querySelectorAll(".carte-projet");

  function setupHoverEffect(cartes) {
    cartes.forEach((carte, index) => {
      carte.addEventListener("mouseenter", () => {
        carte.classList.add("carte-hover");

        cartes.forEach((autreCarte, autreIndex) => {
          if (autreIndex !== index) {
            autreCarte.style.transform = "scale(0.98)";
            autreCarte.style.opacity = "0.8";
            autreCarte.style.filter = "blur(1px)";
          }
        });
      });

      carte.addEventListener("mouseleave", () => {
        carte.classList.remove("carte-hover");
        cartes.forEach((autreCarte) => {
          autreCarte.style.transform = "";
          autreCarte.style.opacity = "";
          autreCarte.style.filter = "";
        });
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
