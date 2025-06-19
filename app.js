document.addEventListener("DOMContentLoaded", () => {
    async function renderArticles() {
        const res = await fetch("articles.json");
        const articlesData = await res.json();
        const container = document.getElementById("articles-container");

        // Render articles
        for (const name of articlesData) {
            const article = document.createElement("p");
            article.textContent = name;
            article.setAttribute("tabindex", "-1");
            container.appendChild(article);
        }

        //--------------
        // Art Selection
        //--------------
        const articles = container.querySelectorAll("p");
        let currentIndex = 0;

        function updateSelection() {
            articles.forEach((el, i) => {
                el.classList.toggle("selected", i === currentIndex);
                el.setAttribute("tabindex", i === currentIndex ? "0" : "-1");
            });
            articles[currentIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }

        function moveSelection(direction) {
            const maxIndex = articles.length - 1;
            if (direction === "down" && currentIndex < maxIndex) currentIndex++;
            if (direction === "up" && currentIndex > 0) currentIndex--;
            updateSelection();
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "j" || e.key === "ArrowDown") moveSelection("down");
            else if (e.key === "k" || e.key === "ArrowUp") moveSelection("up");
        });

        updateSelection(); // Initial selection
    }

    renderArticles();

    //--------------
    // Cat Selection
    //--------------

    const categories = document.querySelectorAll(".categories span");
    let catIndex = 0;

    function updateCatSelection() {
        categories.forEach((el, i) => {
            el.classList.toggle("selected", i === catIndex);
            el.setAttribute("tabindex", i === catIndex ? "0" : "-1");
        });
        categories[catIndex]?.scrollIntoView({ inline: "nearest", behavior: "smooth" });
    }

    function moveCategory(direction) {
        const maxIndex = categories.length - 1;
        if (direction === "right" && catIndex < maxIndex) catIndex++;
        if (direction === "left" && catIndex > 0) catIndex--;
        updateCatSelection();
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "l" || e.key === "ArrowRight") moveCategory("right");
        else if (e.key === "h" || e.key === "ArrowLeft") moveCategory("left");
    });

    updateCatSelection(); // Initial selection
});
