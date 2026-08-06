const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const preview = document.querySelector(".exp-preview");
const previewImg = preview.querySelector("img");
let raf = null;
let mouse = { x: 0, y: 0 };

document.querySelectorAll(".exp").forEach((exp) => {
  exp.addEventListener("mouseenter", () => {
    previewImg.src = exp.dataset.img;
    preview.classList.add("on");
  });
  exp.addEventListener("mouseleave", () => preview.classList.remove("on"));
});

window.addEventListener("mousemove", (e) => {
  mouse = { x: e.clientX, y: e.clientY };
  if (!raf) {
    raf = requestAnimationFrame(() => {
      preview.style.left = mouse.x + 24 + "px";
      preview.style.top = mouse.y - 100 + "px";
      raf = null;
    });
  }
});

const vidObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    }
  },
  { threshold: 0.15 }
);
document.querySelectorAll("video").forEach((v) => vidObserver.observe(v));

document.querySelectorAll(".faq details").forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) {
      document.querySelectorAll(".faq details[open]").forEach((other) => {
        if (other !== d) other.open = false;
      });
    }
  });
});
