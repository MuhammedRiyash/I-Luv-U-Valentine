/* 
   ANTI-GRAVITY LOVE EXPERIENCE
   Created by: MD.Riyash
   Email: thisismdriyash@gmail.com
   Instagram: @riyash.x.x

   Copyright © 2026 MD.Riyash
   All Rights Reserved.

   Unauthorized copying, modification, redistribution,
   resale, or public usage without explicit written permission
   is strictly prohibited.
*/

// --- GSAP Config ---
const masterTL = gsap.timeline();

// --- DOM Elements ---
const inputCard = document.getElementById('input-card');
const mainCard = document.getElementById('main-card');
const nameInput = document.getElementById('name-input');
const btnNext = document.getElementById('btn-next');
const mainVideo = document.getElementById('main-video');
const questionText = document.getElementById('question-text');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const btnShare = document.getElementById('btn-share');
const bgLayer = document.getElementById('bg-layer');
const cursorGlow = document.getElementById('cursor-glow');

// --- State ---
let crushName = "My Love";

// --- Initialization ---
function init() {
    setupIntro();
    setupAntiGravity();
    setupInteraction();
    setupCursorGlow();
    setupHeartParticles();
}

// 1. Intro Sequence (Card 1)
function setupIntro() {
    gsap.set([inputCard, ".btn", ".question"], { opacity: 0 }); // Pre-set for safety

    masterTL
        .from(bgLayer, { opacity: 0, duration: 1.5 })
        .to(inputCard, { 
            display: "flex",
            opacity: 1,
            scale: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "expo.out",
            startAt: { scale: 0.9, y: 50 }
        }, "-=1")
        .to(".question", { 
            opacity: 1,
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            startAt: { y: 20 }
        }, "-=0.5")
        .fromTo("#btn-next", 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" },
            "-=0.4"
        );
}

// 2. Anti-Gravity Effect (Float)
function setupAntiGravity() {
    gsap.to(".glass-card", {
        y: "-=15",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 3D Tilt Effect for active card
    document.addEventListener('mousemove', (e) => {
        const activeCard = document.querySelector('.glass-card.active');
        if (!activeCard) return;

        const rect = activeCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(activeCard, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

// 3. Heart Particles System
function setupHeartParticles() {
    const heartCount = 15;
    for (let i = 0; i < heartCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.opacity = Math.random() * 0.5 + 0.2;
    bgLayer.appendChild(heart);

    gsap.to(heart, {
        y: "-=100",
        x: "+=" + (Math.random() * 40 - 20),
        rotation: Math.random() * 360,
        opacity: 0,
        duration: Math.random() * 5 + 5,
        ease: "none",
        onComplete: () => {
            heart.remove();
            createParticle();
        }
    });
}

// 4. Custom Cursor Glow
function setupCursorGlow() {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            left: e.clientX,
            top: e.clientY,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}

// 5. Scene Transition (Input -> Main)
function startExperience() {
    const name = nameInput.value.trim();
    if (name) crushName = name;
    
    questionText.innerText = `${crushName}, do you love me?`;

    const tl = gsap.timeline();
    tl.to(inputCard, { 
        opacity: 0, 
        scale: 0.9, 
        y: -20, 
        duration: 0.5, 
        ease: "power2.in",
        onComplete: () => {
            inputCard.classList.remove('active');
            inputCard.style.display = 'none';
            mainCard.style.display = 'flex';
            mainCard.classList.add('active');
        }
    })
    .fromTo(mainCard, 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "expo.out" }
    )
    .fromTo([btnYes, btnNo], 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: "elastic.out(1, 0.75)" },
        "-=0.4"
    );
}

// 6. "NO" Button Logic (Evasion)
let noClickCount = 0;
function moveNoButton() {
    noClickCount++;
    
    // Bounds calculation
    const margin = 50;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnRect = btnNo.getBoundingClientRect();
    
    // Random target within viewport
    let newX = Math.random() * (vw - btnRect.width - margin * 2) + margin;
    let newY = Math.random() * (vh - btnRect.height - margin * 2) + margin;

    // Relative to parent conversion for GSAP
    const parentRect = btnNo.parentElement.getBoundingClientRect();
    const targetX = newX - parentRect.left;
    const targetY = newY - parentRect.top;

    gsap.to(btnNo, {
        x: targetX,
        y: targetY,
        rotation: (Math.random() - 0.5) * 40,
        duration: 0.4,
        ease: "back.out(1.7)",
        overwrite: true
    });

    if (noClickCount < 10) {
        gsap.to(btnNo, { scale: 1 - noClickCount * 0.05, duration: 0.3 });
    }
}

// 7. "YES" Button Reaction
function triggerYes() {
    gsap.killTweensOf(mainCard);
    
    // Completely remove No button from layout
    gsap.to(btnNo, { 
        opacity: 0, 
        scale: 0, 
        duration: 0.3, 
        pointerEvents: "none",
        onComplete: () => {
            btnNo.style.display = "none";
        }
    });

    const tl = gsap.timeline();
    tl.to(mainCard, { scale: 1.05, duration: 0.5, ease: "power2.out" })
      .to(".video-wrapper", { opacity: 0, scale: 0.95, duration: 0.4 }, "-=0.2")
      .add(() => {
          mainVideo.src = "assets/videos/love.mp4";
          mainVideo.load();
          mainVideo.play();
          questionText.innerHTML = `I knew it, ${crushName}! 😍`;
          questionText.classList.add("shimmer");
          btnYes.style.display = "none";
          btnShare.style.display = "flex";
      })
      .to(".video-wrapper", { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" })
      .fromTo(btnShare, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }, 
          "-=0.3"
      );

    heartBurst();
}

function heartBurst() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = 1000;
        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + 100;
        
        gsap.to(heart, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotation: Math.random() * 720,
            opacity: 0,
            scale: 0.5,
            duration: 1.5 + Math.random(),
            ease: "power2.out",
            onComplete: () => heart.remove()
        });
    }
}

// 8. Event Listeners
function setupInteraction() {
    btnNext.addEventListener('click', startExperience);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startExperience();
    });

    btnNo.addEventListener('mouseenter', moveNoButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    
    btnYes.addEventListener('click', triggerYes);
    
    btnShare.addEventListener('click', () => {
        window.open('https://www.instagram.com/riyash.x.x/', '_blank');
    });
}

// Run on load
window.addEventListener('DOMContentLoaded', init);
