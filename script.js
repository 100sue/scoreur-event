document.addEventListener("DOMContentLoaded", function () {
  // Preloader Animation
  const preloader = document.getElementById("preloader");
  const progressBar = document.querySelector(".progress-bar");
  const basketballIcon = document.querySelector(".basketball-icon");

  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Final animation before hiding preloader
      gsap.to(basketballIcon, {
        scale: 1.5,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              preloader.style.display = "none";
              initAnimations();
            },
          });
        },
      });
    }
    progressBar.style.width = `${progress}%`;
  }, 200);

  // Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }

      const target = document.querySelector(this.getAttribute("href"));
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Slider functionality
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-arrow.left");
  const nextBtn = document.querySelector(".slider-arrow.right");

  let currentSlide = 0;

  function goToSlide(slideIndex) {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
    });
  }

  prevBtn.addEventListener("click", () => {
    const prevSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevSlide);
  });

  nextBtn.addEventListener("click", () => {
    const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(nextSlide);
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Auto slide
  setInterval(() => {
    const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(nextSlide);
  }, 5000);
  // Slider functionality (Vidéos)
  const videoSlider = document.querySelector(".video-slider");
  const videoSlides = document.querySelectorAll(".video-slide");
  const videoDots = document.querySelectorAll(".video-dot");
  const videoPrevBtn = document.querySelector(".video-arrow.left");
  const videoNextBtn = document.querySelector(".video-arrow.right");

  let currentVideoSlide = 0;

  function goToVideoSlide(slideIndex) {
    videoSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentVideoSlide = slideIndex;

    // Update dots
    videoDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
    });
  }

  videoPrevBtn.addEventListener("click", () => {
    const prevSlide =
      currentVideoSlide === 0 ? videoSlides.length - 1 : currentVideoSlide - 1;
    goToVideoSlide(prevSlide);
  });

  videoNextBtn.addEventListener("click", () => {
    const nextSlide =
      currentVideoSlide === videoSlides.length - 1 ? 0 : currentVideoSlide + 1;
    goToVideoSlide(nextSlide);
  });

  // Dot navigation (Vidéos)
  videoDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToVideoSlide(index);
    });
  });

  // Auto slide (Vidéos)
  setInterval(() => {
    const nextSlide =
      currentVideoSlide === videoSlides.length - 1 ? 0 : currentVideoSlide + 1;
    goToVideoSlide(nextSlide);
  }, 7000);

  // Form submission
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Merci pour votre message! Nous vous répondrons très rapidement.");
    contactForm.reset();
  });

  // Initialize animations after page load
  function initAnimations() {
    // GSAP animations for sections
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray("section").forEach((section, i) => {
      if (i > 0) {
        // Skip the first section
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 1,
        });
      }
    });

    // Animate elements in home section
    gsap.from(".hero-title", {
      duration: 1.2,
      y: 50,
      opacity: 0,
      stagger: 0.2,
    });

    gsap.from(".hero-subtitle", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.5,
    });

    gsap.from(".cta-button", {
      duration: 1,
      y: 30,
      opacity: 1,
      delay: 0.8,
    });

    // Animate basketball background pattern
    gsap.to(".basketball-bg", {
      x: "5%",
      y: "5%",
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    // Animate poules in planning section
    gsap.from(".poule", {
      scrollTrigger: {
        trigger: "#planning",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
    });

    // Animate matches
    gsap.from(".match", {
      scrollTrigger: {
        trigger: "#planning",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      x: -30,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.3,
    });
    // Animate video section
    gsap.from("#videos", {
      scrollTrigger: {
        trigger: "#videos",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 1,
    });
  }

  // Lecteur Musical
  const musicPlayer = document.querySelector(".music-player");
  const playPauseBtn = document.querySelector(".play-pause");
  // const prevBtn = document.querySelector('.prev-btn');
  // const nextBtn = document.querySelector('.next-btn');
  const progressBarMusic = document.querySelector(".progress-bar-music");
  const currentTimeEl = document.querySelector(".current-time");
  const totalTimeEl = document.querySelector(".total-time");
  const volumeSlider = document.querySelector(".volume-slider");
  const playlistItems = document.querySelectorAll(".playlist-item");
  const playerClose = document.querySelector(".player-close");

  // Simuler un lecteur audio (dans une vraie implémentation, utiliser l'API Web Audio)
  let isPlaying = false;
  let currentTrack = 0;

  // Données des pistes
  const tracks = [
    {
      name: "Urban Basketball Beats",
      artist: "DJ Dunk",
      duration: "3:45",
    },
    {
      name: "Streetball Anthem",
      artist: "MC Hoop",
      duration: "4:20",
    },
    {
      name: "Victory Rhythm",
      artist: "Champion Sound",
      duration: "3:30",
    },
    {
      name: "Dribble Groove",
      artist: "Ballers Collective",
      duration: "3:55",
    },
  ];

  // Mettre à jour les informations de la piste
  function updateTrackInfo() {
    const track = tracks[currentTrack];
    document.querySelector(".track-name").textContent = track.name;
    document.querySelector(".artist-name").textContent = track.artist;
    totalTimeEl.textContent = track.duration;
    currentTimeEl.textContent = "0:00";
    progressBarMusic.style.width = "0%";

    // Mettre à jour la playlist
    playlistItems.forEach((item, index) => {
      if (index === currentTrack) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Jouer la musique
  function playMusic() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

    // Simuler la progression
    simulateProgress();
  }

  // Mettre en pause la musique
  function pauseMusic() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }

  // Simuler la progression de la piste
  function simulateProgress() {
    if (!isPlaying) return;

    let progress = 0;
    const duration = 225; // 3:45 en secondes
    const interval = setInterval(() => {
      if (!isPlaying) {
        clearInterval(interval);
        return;
      }

      progress += 0.5;
      const progressPercent = (progress / duration) * 100;
      progressBarMusic.style.width = `${progressPercent}%`;

      // Mettre à jour le temps actuel
      const minutes = Math.floor(progress / 60);
      const seconds = Math.floor(progress % 60);
      currentTimeEl.textContent = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      if (progress >= duration) {
        clearInterval(interval);
        nextTrack();
      }
    }, 500);
  }

  // Piste suivante
  function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    updateTrackInfo();
    playMusic();
  }

  // Piste précédente
  function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    updateTrackInfo();
    playMusic();
  }

  // Événements
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  playerClose.addEventListener("click", () => {
    musicPlayer.style.transform = "translateY(100px)";
    musicPlayer.style.opacity = "0";
    setTimeout(() => {
      musicPlayer.style.display = "none";
    }, 300);
  });

  volumeSlider.addEventListener("input", (e) => {
    // Dans une vraie implémentation, ajuster le volume de l'audio
    console.log("Volume: ", e.target.value);
  });

  // Cliquer sur un élément de playlist
  playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentTrack = index;
      updateTrackInfo();
      playMusic();
    });
  });

  // Démarrer la musique automatiquement après un léger délai
  setTimeout(() => {
    updateTrackInfo();
    playMusic();
  }, 300);
});
