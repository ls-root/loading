document.addEventListener("DOMContentLoaded", () => {
    const articles = document.querySelectorAll(".articles-container p");
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
        if (e.key === "j" || e.key === "ArrowDown") {
            moveSelection("down");
        } else if (e.key === "k" || e.key === "ArrowUp") {
            moveSelection("up");
        }
    });

    // Initial selection
    updateSelection();
});
