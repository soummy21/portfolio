if (document.body.className.includes("light")) {
        document.body.classList.add('dark');
        localStorage.setItem("pref-theme", 'dark');
    }

    // Safety check: Only add the listener if the button exists in the HTML
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (document.body.className.includes("dark")) {
                document.body.classList.remove('dark');
                localStorage.setItem("pref-theme", 'light');
            } else {
                document.body.classList.add('dark');
                localStorage.setItem("pref-theme", 'dark');
            }
        });
    }

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

    let loadingIcons;

    function loading() {
        myVar = setTimeout(showPage, 100);
    }

    function showPage() {
        try{
            document.getElementById("loading-icons").style.display = "block";
        } catch(err) {}
    }


document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. YouTube Iframe Control (Mythbound, etc.)
    // ----------------------------------------------------
    function controlYouTube(iframe, action) {
        if (iframe && iframe.contentWindow) {
            // Send the play/pause command directly to YouTube's hidden player
            iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: action, args: [] }), "*");
        }
    }

    const projectCards = document.querySelectorAll(".cinematic-card-wide, .project-strip, .cinematic-card");

    projectCards.forEach((card) => {
        const iframe = card.querySelector(".portfolio-yt-video");
        if (!iframe) return;

        let isPlaying = false;

        // Desktop: Play on hover
        card.addEventListener("mouseenter", () => {
            controlYouTube(iframe, "playVideo");
            isPlaying = true;
        });

        // Desktop: Pause when mouse leaves
        card.addEventListener("mouseleave", () => {
            controlYouTube(iframe, "pauseVideo");
            isPlaying = false;
        });

        // Mobile/Universal: Click the card to toggle play/pause
        card.addEventListener("click", (e) => {
            // Don't pause the video if clicking a button/link inside the card
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            if (isPlaying) {
                controlYouTube(iframe, "pauseVideo");
                isPlaying = false;
            } else {
                controlYouTube(iframe, "playVideo");
                isPlaying = true;
            }
        });
    });

    // ----------------------------------------------------
    // 2. Native Local Video Control (Custom Engine & PvZ)
    // ----------------------------------------------------
    const localVideoCards = document.querySelectorAll(".cinematic-card-wide, .project-strip, .cinematic-card");

    localVideoCards.forEach((card) => {
        const video = card.querySelector(".portfolio-local-video");
        if (!video) return;

        // Desktop: Play on hover
        card.addEventListener("mouseenter", () => {
            video.play().catch(() => {});
        });

        // Desktop: Pause when mouse leaves
        card.addEventListener("mouseleave", () => {
            video.pause();
        });

        // Mobile/Universal: Click the card to toggle play/pause
        card.addEventListener("click", (e) => {
            // Don't toggle video if clicking an anchor/button
            if (e.target.tagName === 'A' || e.target.closest('a')) return;

            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    });
});


