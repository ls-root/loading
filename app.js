document.addEventListener("DOMContentLoaded", () => {
    const allCats = new Set()

    async function renderArticles() {
        const res = await fetch("articles.json");
        const articlesData = await res.json();
        const container = document.getElementById("articles-container");

        // Render articles
        for (const name of articlesData) {
            // Create article element
            const article = document.createElement("p");
            article.textContent = name;
            article.setAttribute("tabindex", "-1");
            container.appendChild(article);
            // Get content
            const res = await fetch("articles/" + name)
            const articlesContent = await res.text()
            let lines = articlesContent.split("\n")
            let frontmatter = lines.slice(1, 3)
                .map(line => line.slice(4))
                .join("\n")
                .split("\n")
            
            const categories = JSON.parse(frontmatter[0])
            const css = frontmatter[1].slice(2, -1)
            
            categories.forEach(cat => allCats.add(cat))
        }

        renderCategories(Array.from(allCats))

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

    async function renderCategories(catList) {
        //--------------
        // Cat Selection
        //--------------

        const container = document.getElementById("categories")
        container.innerHTML = ""

        catList.forEach(cat => {
            const span = document.createElement("span")
            span.setAttribute("is-", "badge")
            span.setAttribute("cap-", "square")
            span.textContent = cat
            container.appendChild(span)
        })

        const categories = container.querySelectorAll("span")
        let catIndex = 0

        function updateCatSelection() {
            categories.forEach((el, i) => {
                el.classList.toggle("selected", i === catIndex)
                el.setAttribute("tabindex", i === catIndex ? "0" : "-1")
            })
            categories[catIndex]?.scrollIntoView({ inline: "nearest", behavior: "smooth" })
        }

        function moveCategory(direction) {
            const maxIndex = categories.length - 1
            if (direction === "right" && catIndex < maxIndex) catIndex++
            if (direction === "left" && catIndex > 0) catIndex--
            updateCatSelection()
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "l" || e.key === "ArrowRight") moveCategory("right")
            else if (e.key === "h" || e.key === "ArrowLeft") moveCategory("left")
        })

        updateCatSelection()
    }
    renderCategories()
    renderArticles();

});
