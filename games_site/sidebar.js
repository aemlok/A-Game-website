// sidebar.js - universal game sidebar
(function() {
    const BUTTON_ID = "sidebarButton";
    const SIDEBAR_ID = "gameSidebar";

    function createSidebar(games) {
        // Prevent duplicates
        if (document.getElementById(BUTTON_ID)) return;

        // --- Create Button ---
        const btn = document.createElement("button");
        btn.id = BUTTON_ID;
        btn.innerText = "Games";
        Object.assign(btn.style, {
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "10000",
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
        });
        document.body.appendChild(btn);

        // --- Create Sidebar ---
        const sidebar = document.createElement("div");
        sidebar.id = SIDEBAR_ID;
        Object.assign(sidebar.style, {
            position: "fixed",
            top: "0",
            right: "-260px",
            width: "250px",
            height: "100%",
            background: "#222",
            color: "#fff",
            padding: "20px",
            overflowY: "auto",
            transition: "right 0.3s",
            zIndex: "9999",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
        });

        // Sidebar title
        const title = document.createElement("h2");
        title.innerText = "Games";
        title.style.marginTop = "0";
        title.style.fontSize = "20px";
        sidebar.appendChild(title);

        // Add links
        games.forEach(game => {
            const link = document.createElement("a");
            link.href = game.url;
            link.innerText = game.name;
            Object.assign(link.style, {
                display: "block",
                margin: "10px 0",
                color: "#fff",
                textDecoration: "none"
            });
            link.onmouseover = () => link.style.color = "#00ffff";
            link.onmouseout = () => link.style.color = "#fff";
            sidebar.appendChild(link);
        });

        document.body.appendChild(sidebar);

        // Toggle sidebar
        btn.onclick = () => {
            sidebar.style.right = sidebar.style.right === "0px" ? "-260px" : "0px";
        };
    }

    // --- Load from JSON ---
    function createSidebarFromJSON(jsonPath = "games.json") {
        fetch(jsonPath)
            .then(res => res.json())
            .then(games => createSidebar(games))
            .catch(err => {
                console.error("Failed to load games.json:", err);
                // fallback: empty sidebar
                createSidebar([]);
            });
    }

    // --- Wait for the full page to load ---
    window.addEventListener("load", () => {
        // Determine JSON path from current folder structure
        let jsonPath = "../../games.json"; // from a game like games/antimatter/index.html
        createSidebarFromJSON(jsonPath);
    });
})();