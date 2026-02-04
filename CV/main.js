(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Lightbox
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox__img");
  if (!lightbox || !lightboxImg) return;

  let lastFocus = null;

  function openLightbox(src, alt) {
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "照片預覽";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");

    const closeBtn = lightbox.querySelector(".lightbox__close");
    if (closeBtn instanceof HTMLElement) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const btn = target.closest("[data-lightbox]");
    if (btn) {
      const src = btn.getAttribute("data-lightbox");
      const img = btn.querySelector("img");
      const alt = img?.getAttribute("alt") || "";
      if (src) openLightbox(src, alt);
      return;
    }

    if (target.closest("[data-close]")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();

