// Matikan scroll otomatis dari browser saat di-refresh agar posisi selalu di paling atas
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const musicToggle = document.getElementById("musicToggle");
const birthdaySong = document.getElementById("birthdaySong");
const revealItems = document.querySelectorAll(".reveal");
// --- WELCOME OVERLAY (AUTOPLAY FIX) ---
const welcomeOverlay = document.getElementById("welcomeOverlay");
const openWebsiteBtn = document.getElementById("openWebsiteBtn");

if (openWebsiteBtn && welcomeOverlay) {
  openWebsiteBtn.addEventListener("click", () => {
    // Scroll otomatis ke paling atas saat masuk animasi hero
    window.scrollTo(0, 0);

    if (birthdaySong.paused) {
      birthdaySong
        .play()
        .then(() => updateMusicButton(true))
        .catch(() => { });
    }
    welcomeOverlay.classList.add("hidden");
    // Also trigger initial scroll animation observation just in case
  });
}

// --- INTERACTIVE FUN ZONE ---
const btnSayang = document.getElementById("btnSayang");
const btnGak = document.getElementById("btnGak");
const sayangResponse = document.getElementById("sayangResponse");
const btnBalloons = document.getElementById("btnBalloons");
const btnRandomMsg = document.getElementById("btnRandomMsg");

const customModal = document.getElementById("customModal");
const closeModal = document.getElementById("closeModal");
const modalText = document.getElementById("modalText");
const modalEmoji = document.getElementById("modalEmoji");

const randomMessages = [
  {
    p: "Asal kamu tahu, aku selalu senyum-senyum sendiri kalau baca chat lama kita.",
    e: "🤭",
  },
  {
    p: "Kamu tuh ibarat WiFi, kalau deket sinyal bahagiaku kenceng banget!",
    e: "📶",
  },
  {
    p: "Walaupun kamu sering random, tapi kamu itu random favorit aku.",
    e: "🥰",
  },
  { p: "Pokoknya hari ini kamu dilarang sedih! Titik.", e: "😤💖" },
  { p: "Aku beruntung banget loh bisa kenal dan punya kamu.", e: "🥺" },
];

// Runaway Button Logic
if (btnGak && btnSayang) {
  btnGak.addEventListener("mouseover", () => {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 80 - 40;
    btnGak.style.transform = `translate(${x}px, ${y}px)`;
  });

  btnSayang.addEventListener("click", () => {
    sayangResponse.textContent = "Aaa makin sayang deh jadinya! 🥰💕";
    btnSayang.classList.add("bounce");
    setTimeout(() => btnSayang.classList.remove("bounce"), 350);
  });
}

// Balloon Spawner Logic
if (btnBalloons) {
  btnBalloons.addEventListener("click", (e) => {
    for (let i = 0; i < 12; i++) {
      createFloatingEmoji(e.clientX, e.clientY);
    }
    btnBalloons.classList.add("bounce");
    setTimeout(() => btnBalloons.classList.remove("bounce"), 350);
  });
}

function createFloatingEmoji(x, y) {
  const emojis = ["🎈", "💖", "✨", "🥰", "💌"];
  const el = document.createElement("div");
  el.className = "floating-emoji";
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);

  setTimeout(() => {
    const dx = (Math.random() - 0.5) * 250;
    const dy = -(Math.random() * 350 + 100);
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.5) rotate(${Math.random() * 45}deg)`;
    el.style.opacity = "0";
  }, 10);

  setTimeout(() => el.remove(), 2000);
}

// Random Popup Modal
if (btnRandomMsg) {
  btnRandomMsg.addEventListener("click", () => {
    const r = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    modalText.textContent = r.p;
    modalEmoji.textContent = r.e;
    customModal.classList.add("show");
  });

  closeModal.addEventListener("click", () => {
    customModal.classList.remove("show");
  });
}

// --- MUSIC LOGIC ---
// (Dihapus startAudio otomatis di sembarang klik, diganti supaya hanya play lewat openWebsiteBtn atau musicToggle)

// const startAudio = () => {
//   if (birthdaySong.paused) {
//     birthdaySong
//       .play()
//       .then(() => updateMusicButton(true))
//       .catch(() => {});
//   }
//   document.removeEventListener("click", startAudio);
//   document.removeEventListener("touchstart", startAudio);
//   document.removeEventListener("scroll", startAudio);
// };
// 
// document.addEventListener("click", startAudio);
// document.addEventListener("touchstart", startAudio);
// document.addEventListener("scroll", startAudio, { once: true });
function updateMusicButton(isPlaying) {
  musicToggle.classList.toggle("playing", isPlaying);
  musicToggle.querySelector(".music-label").textContent = isPlaying
    ? "Pause Lagu"
    : "Play Lagu";
}

musicToggle.addEventListener("click", () => {
  if (birthdaySong.paused) {
    birthdaySong
      .play()
      .then(() => updateMusicButton(true))
      .catch(() => { });
  } else {
    birthdaySong.pause();
    updateMusicButton(false);
  }
});

// --- SMOOTH TYPEWRITER ANIMATION ---
const textElements = document.querySelectorAll(
  ".reveal h1, .reveal h2, .reveal h3, .reveal p:not(#sayangResponse), .reveal .eyebrow, .reveal .info-label",
);

textElements.forEach((el) => {
  const traverseAndWrap = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text.trim()) return;

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.style.opacity = "0";
        span.style.transition = "opacity 0.2s ease-in-out";
        fragment.appendChild(span);
      }
      node.replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName !== "BUTTON" && node.tagName !== "A") {
        Array.from(node.childNodes).forEach(traverseAndWrap);
      }
    }
  };

  if (
    el.children.length === 0 ||
    Array.from(el.children).every(
      (c) => c.tagName === "BR" || c.tagName === "STRONG" || c.tagName === "EM",
    )
  ) {
    Array.from(el.childNodes).forEach(traverseAndWrap);
    el.classList.add("ready-to-type");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        const typeEls = entry.target.querySelectorAll(".ready-to-type");
        // Also if the target itself is text
        if (entry.target.classList.contains("ready-to-type")) {
          typeEls = [entry.target, ...typeEls];
        }

        let totalChars = 0;
        typeEls.forEach((el) => {
          const spans = el.querySelectorAll("span");
          spans.forEach((span) => {
            setTimeout(
              () => {
                span.style.opacity = "1";
              },
              250 + totalChars * 20,
            );
            totalChars++;
          });
        });

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

// Smooth scroll anchors
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// --- AUTO SCROLL LOGIC ---
const autoScrollBtn = document.getElementById("autoScrollBtn");
let isAutoScrolling = false;
let scrollAnimationId;

const smoothScrollLoop = () => {
  if (!isAutoScrolling) return;

  // Scroll by an ultra-smooth amount every animation frame
  window.scrollBy(0, 0.8);

  // Jika sudah mencapai paling bawah, hentikan scroll
  if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    isAutoScrolling = false;
    autoScrollBtn.textContent = "Mulai Auto Scroll ⬇️";
    cancelAnimationFrame(scrollAnimationId);
    return;
  }

  scrollAnimationId = requestAnimationFrame(smoothScrollLoop);
};

if (autoScrollBtn) {
  autoScrollBtn.addEventListener("click", () => {
    if (isAutoScrolling) {
      isAutoScrolling = false;
      cancelAnimationFrame(scrollAnimationId);
      autoScrollBtn.textContent = "Mulai Auto Scroll ⬇️";
    } else {
      isAutoScrolling = true;
      autoScrollBtn.textContent = "Berhenti Scroll 🛑";
      scrollAnimationId = requestAnimationFrame(smoothScrollLoop);
    }
  });

  // Berhentikan scroll jika user manual scroll menggunakan roda mouse atau touch
  const stopScroll = () => {
    if (isAutoScrolling) {
      isAutoScrolling = false;
      cancelAnimationFrame(scrollAnimationId);
      autoScrollBtn.textContent = "Mulai Auto Scroll ⬇️";
    }
  };
  window.addEventListener('wheel', stopScroll, { passive: true });
  window.addEventListener('touchstart', stopScroll, { passive: true });
}
