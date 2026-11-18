
console.log("script.js top-level executing");
//games list for main page
const games = [
    {
        title: "Antimatter Dimensions",
        image: "images/antimatter_thumbnail.jpg",
        link: "games/antimatter/index.html"
    },
    {
        title: "Dodeca Dragons",
        image: "images/dodecadragons_thumbnail.png",
        link: "games/dodeca_dragons/index.html"
    },
    {
        title: "Celestial Incremental",
        image: "images/celestialincremental_thumbnail.webp",
        link: "games/celestial_incremental/index.html"
    },
    {
        title: "Calculator Evolution",
        image: "images/calculatorevolution_thumbnail.jpg",
        link: "games/calculator_evolution/index.html"
    },
    {
        title: "Fundamental",
        image: "images/fundamental.webp",
        link: "games/fundamental/index.html"
    },
    {
        title: "One Trillion Free Draws",
        image: "images/trillion_draws_thumbnail.png",
        link: "games/trillion_draws/index.html"
    },
    {
        title: "Incremental Mass Rewritten",
        image: "images/incremental_mass.jpg",
        link: "games/incremental_mass_rewritten/index.html"
    },
    {
        title: "Kittens Game",
        image: "images/kittensgame.webp",
        link: "games/kittensgame/index.html"
    },
    {
        title: "The Prestige Tree",
        image: "images/the_prestige_tree.png",
        link: "games/the_prestige_tree/index.html"
    },
    {
        title: "Cookie Clicker",
        image: "images/Cookie_Clicker_logo.png",
        link: "games/cookieclicker/index.html"
    },
    {
        title: "Trimps",
        image: "images/trimps.jpg",
        link: "games/trimps/index.html"
    },
    {
        title: "Alkahistorian series",
        image: "images/Alkahistorian_series.png",
        link: "games/alkahistorian_series/index.html"
    },
    {
        title: "Bitburner",
        image: "images/bitburner.webp",
        link: "games/bitburner/index.html"
    },
    {
        title: "Distance Incremental",
        image: "images/distance_incremental.png",
        link: "games/distance_incremental/index.html"
    },
    {
        title: "Omega Layers",
        image: "images/omega_layers.webp",
        link: "games/omega_layers/index.html"
    },
];

const ADmods = [
    {
        title: "AD Endgame",
        image: "/ADimages/ADendgame.webp",
        link: "ADmods/ADendgame/index.html"
    },
    {
        title: "AD Redemption",
        image: "/ADimages/ADredemption.webp",
        link: "ADmods/ADredemption/index.html"
    }
];


//checks if password is needed 
window.onload = function () {
        
    console.log("window.onload fired");
    const toggle = document.getElementById("popupToggle");

        const saved = localStorage.getItem("popupEnabled") === "true";

        if (toggle) {
          toggle.checked = saved;

          toggle.addEventListener("change", function () {
            localStorage.setItem("popupEnabled", this.checked);
          });
        }

        loadGames("games-container", games);
        loadGames("ADmod-container", ADmods);
        initTiltEffect(); //card tilt effect
        setupTiltSettingsUI(); //tilt settings


        showTab("gamesTab");
      };




//show website if password is correct
function showTab(tabId) {
        const tabs = document.querySelectorAll(".tab");

        tabs.forEach(tab => {
        tab.style.display = "none";
        });

        const target = document.getElementById(tabId);
        if (target) {
        target.style.display = "block";
        }
      }

window.addEventListener("beforeunload", ev => {
    const enabled = localStorage.getItem("popupEnabled") === "true";


    if (enabled) {
        ev.preventDefault();
        ev.returnValue = "";
    }
    

});

//test popup
function showPopup() {
    alert("This is a test related to goguardian");
  }


const container = document.getElementById("games-container");


//make a button for a game
function createGame(container, title, image, link, description = "") {
    const game = document.createElement("div");
    game.className = "game";

    game.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <img class="game-image" src="${image}" alt="${title}">
        <button class="game-button" data-link="${link}" data-title="${title}">
            Play ${title}
        </button>
    `;

    container.appendChild(game);
}

function loadGames(containerId, gamesArray) {
    const container = document.getElementById(containerId);
    console.log("loadGames running for", containerId, container);

    gamesArray.forEach(game => {
        createGame(container, game.title, game.image, game.link);
    });

    container.addEventListener('click', (e) => {
        console.log("container click detected", e.target);
        const btn = e.target.closest('.game-button');
        if (btn) {
            openGame(btn.dataset.link, btn.dataset.title);
        }
    });
}
function openGame(link, title) {
    console.log("openGame called", link);

    document.getElementById('game-overlay-frame').src = link;
    document.getElementById('game-overlay-title').textContent = title;
    document.getElementById('game-overlay').classList.remove('hidden');
}

document.getElementById('game-overlay-close').addEventListener('click', () => {
    document.getElementById('game-overlay-frame').src = ''; // stop the game
    document.getElementById('game-overlay').classList.add('hidden');
});
//background stuff
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const NUM_DOTS = 800;
const dots = [];

for (let i = 0; i < NUM_DOTS; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.3
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // wrap around edges
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();



//end background stuff
//game card stuff
const tiltSettings = {
    enabled: localStorage.getItem("tiltEnabled") !== "false", // default true
    strength: parseFloat(localStorage.getItem("tiltStrength")) || 5,
    lift: parseFloat(localStorage.getItem("tiltLift")) || 5
};

function setupTiltSettingsUI() {
    console.log("setupTiltSettingsUI running");

    const enabledToggle = document.getElementById("tiltEnabledToggle");
    const strengthInput = document.getElementById("tiltStrengthInput");
    const liftInput = document.getElementById("tiltLiftInput");

    // set initial UI state from saved settings
    enabledToggle.checked = tiltSettings.enabled;
    strengthInput.value = tiltSettings.strength;
    liftInput.value = tiltSettings.lift;

    enabledToggle.addEventListener("change", () => {
        tiltSettings.enabled = enabledToggle.checked;
        localStorage.setItem("tiltEnabled", enabledToggle.checked);
    });

    strengthInput.addEventListener("input", () => {
        tiltSettings.strength = parseFloat(strengthInput.value);
        localStorage.setItem("tiltStrength", strengthInput.value);
    });

    liftInput.addEventListener("input", () => {
        tiltSettings.lift = parseFloat(liftInput.value);
        localStorage.setItem("tiltLift", liftInput.value);
    });
}

function initTiltEffect() {
    const cards = document.querySelectorAll('.game');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (!tiltSettings.enabled) return; // bail out if disabled

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const strength = tiltSettings.strength;
            const rotateX = ((y - centerY) / centerY) * -strength;
            const rotateY = ((x - centerX) / centerX) * strength;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-${tiltSettings.lift}px)
                scale(1.03)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0px)
                scale(1)
            `;
        });
    });
}
//end game card stuff
